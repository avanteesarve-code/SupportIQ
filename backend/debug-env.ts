import 'dotenv/config';

console.log('DATABASE_URL:', !!process.env.DATABASE_URL);
console.log('GEMINI_API_KEY:', !!process.env.GEMINI_API_KEY);
console.log('PORT:', process.env.PORT);