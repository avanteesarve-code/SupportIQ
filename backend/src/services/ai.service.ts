import { z } from 'zod';

import { assertGeminiApiKey } from '../config/env.js';
import { retrieveRelevantKnowledge } from './kb-retrieval.service.js';

import type {
  TicketAnalysisInput,
  TicketAnalysisResult,
  TicketClassificationInput,
  TicketClassificationResult,
  TicketReplySuggestionResult,
} from '../types/ai.types.js';

import {
  supportedTicketCategories,
  supportedTicketPriorities,
} from '../types/ai.types.js';

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const classificationSchema = z.object({
  category: z.enum(supportedTicketCategories),
  priority: z.enum(supportedTicketPriorities),
  confidenceCategory: z.number().min(0).max(1),
  confidencePriority: z.number().min(0).max(1),
  reason: z.string().trim().min(1),
});

const analysisSchema = z.object({
  summary: z.string().trim().min(1),
  recommendedAction: z.string().trim().min(1),
});

const fallbackClassification: Pick<
  TicketClassificationResult,
  'category' | 'priority'
> = {
  category: 'General Inquiry',
  priority: 'MEDIUM',
};

function buildClassificationPrompt(input: TicketClassificationInput) {
  return [
    'You are a support ticket triage assistant.',
    'Classify the ticket and return ONLY valid JSON with no markdown and no extra text.',
    'Allowed category values: Technical Support, Billing, Feature Request, Bug Report, General Inquiry.',
    'Allowed priority values: LOW, MEDIUM, HIGH, URGENT.',
    'JSON format:',
    '{',
    '  "category": "Technical Support",',
    '  "priority": "HIGH",',
    '  "confidenceCategory": 0.92,',
    '  "confidencePriority": 0.88,',
    '  "reason": "Customer cannot access account and issue blocks usage."',
    '}',
    '',
    `Subject: ${input.subject}`,
    `Body: ${input.body}`,
  ].join('\n');
}

function buildAnalysisPrompt(input: TicketAnalysisInput) {
  return [
    'You are a senior support triage assistant.',
    'Return ONLY valid JSON with no markdown and no extra text.',
    'Generate a concise support-agent summary and a practical next action.',
    'JSON format:',
    '{',
    '  "summary": "Customer unable to access account.",',
    '  "recommendedAction": "Reset password and verify credentials."',
    '}',
    '',
    `Subject: ${input.subject}`,
    `Body: ${input.body}`,
  ].join('\n');
}

function buildReplySuggestionPrompt(
  subject: string,
  body: string,
  knowledgeContext: string,
) {
  return [
    'You are an expert customer support agent.',
    'Generate a professional support response.',
    'Use the provided knowledge base information whenever relevant.',
    'Do not mention the knowledge base.',
    'Be concise, helpful, and actionable.',
    '',
    'KNOWLEDGE BASE CONTEXT:',
    knowledgeContext,
    '',
    `Subject: ${subject}`,
    `Customer Message: ${body}`,
    '',
    'Generate only the reply text.',
  ].join('\n');
}

async function callGemini(prompt: string) {
  const apiKey = assertGeminiApiKey();

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    }),
  });

  const rawResponse = await response.text();

  if (!response.ok) {
    throw new Error(`Gemini API failed (${response.status}): ${rawResponse}`);
  }

  const json = JSON.parse(rawResponse) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          text?: string;
        }>;
      };
    }>;
  };

  const outputText = json.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!outputText) {
    throw new Error('Gemini API returned an empty response');
  }

  return outputText;
}

export async function classifyTicket(
  input: TicketClassificationInput,
): Promise<TicketClassificationResult> {
  const prompt = buildClassificationPrompt(input);

  try {
    const responseText = await callGemini(prompt);
    const parsed = classificationSchema.parse(JSON.parse(responseText));

    return {
      category: parsed.category,
      priority: parsed.priority,
      confidenceCategory: parsed.confidenceCategory,
      confidencePriority: parsed.confidencePriority,
      reason: parsed.reason,
      prompt,
      response: responseText,
      usedFallback: false,
    };
  } catch (error) {
    console.error('Ticket classification failed:', error);

    return {
      ...fallbackClassification,
      prompt,
      response: JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : 'Unknown AI classification error',
      }),
      usedFallback: true,
    };
  }
}

export async function generateTicketAnalysis(
  input: TicketAnalysisInput,
): Promise<TicketAnalysisResult> {
  const prompt = buildAnalysisPrompt(input);

  try {
    const responseText = await callGemini(prompt);
    const parsed = analysisSchema.parse(JSON.parse(responseText));

    return {
      summary: parsed.summary,
      recommendedAction: parsed.recommendedAction,
    };
  } catch (error) {
    console.error('Ticket analysis failed:', error);

    return {
      summary: `${input.subject.trim()}. ${input.body
        .trim()
        .slice(0, 120)}`.trim(),
      recommendedAction:
        'Review ticket details, contact the customer for clarification, and proceed with standard troubleshooting.',
    };
  }
}

export async function generateSuggestedReply(
  subject: string,
  body: string,
): Promise<TicketReplySuggestionResult> {
  try {
    const retrievedChunks = await retrieveRelevantKnowledge(
      `${subject} ${body}`,
      3,
    );

    const knowledgeContext = retrievedChunks
      .map(
        (chunk) =>
          `[${chunk.documentTitle}]\n${chunk.chunkText}`,
      )
      .join('\n\n');

    const prompt = buildReplySuggestionPrompt(
      subject,
      body,
      knowledgeContext,
    );

    const suggestedReply = await callGemini(prompt);

    return {
      suggestedReply,
      knowledgeSources: [
        ...new Set(
          retrievedChunks.map(
            (chunk) => chunk.documentTitle,
          ),
        ),
      ],
    };
  } catch (error) {
    console.error(
      'Suggested reply generation failed:',
      error,
    );

    return {
      suggestedReply:
        'Thank you for contacting support. We have received your request and our team will review it shortly.',
      knowledgeSources: [],
    };
  }
}