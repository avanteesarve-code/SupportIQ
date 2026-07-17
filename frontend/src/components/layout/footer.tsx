import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[#2a9d8f]/20 bg-background text-foreground">
      <div className="container mx-auto px-6 py-16">
        {/* CTA */}
        <div
          className="
            mb-20
            rounded-3xl
            border
            border-[#2a9d8f]/20
            bg-gradient-to-r
            from-[#2a9d8f]/10
            to-transparent
            p-8
          "
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-2xl font-bold">
                Ready to streamline support operations?
              </h2>

              <p className="mt-2 text-muted-foreground">
                Automate ticket classification,
                prioritization, assignment, and
                resolution with AI.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/tickets"
                className="
                  rounded-xl
                  bg-[#2a9d8f]
                  px-5
                  py-3
                  font-medium
                  text-foreground
                  transition
                  hover:bg-[#23867a]
                "
              >
                View Tickets
              </Link>

              <Link
                href="/dashboard"
                className="
                  rounded-xl
                  border
                  border-[#2a9d8f]
                  px-5
                  py-3
                  font-medium
                  text-[#2a9d8f]
                  transition
                  hover:bg-[#2a9d8f]/10
                "
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold text-[#2a9d8f]">
              PRIORO
            </h3>

            <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-400">
              AI-powered customer support ticket
              management platform designed to
              automate workflows and improve
              support efficiency.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-foreground">
              Product
            </h4>

            <ul className="space-y-3 text-zinc-400">
              <li>
                <Link
                  href="/dashboard"
                  className="transition hover:text-[#2a9d8f]"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/tickets"
                  className="transition hover:text-[#2a9d8f]"
                >
                  Tickets
                </Link>
              </li>

              <li>
                <Link
                  href="/analytics"
                  className="transition hover:text-[#2a9d8f]"
                >
                  Analytics
                </Link>
              </li>

              <li>
                <Link
                  href="/workload"
                  className="transition hover:text-[#2a9d8f]"
                >
                  Workload
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-foreground">
              Features
            </h4>

            <ul className="space-y-3 text-zinc-400">
              <li>AI Classification</li>
              <li>Priority Detection</li>
              <li>Auto Assignment</li>
              <li>Knowledge Base</li>
              <li>AI Suggested Replies</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-foreground">
              Company
            </h4>

            <ul className="space-y-3 text-zinc-400">
              <li>
                <Link
                  href="/about"
                  className="transition hover:text-[#2a9d8f]"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/how-it-works"
                  className="transition hover:text-[#2a9d8f]"
                >
                  How It Works
                </Link>
              </li>

              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-[#2a9d8f]"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Huge Brand Text */}
        <h1
  className="
    text-center
    text-[7rem]
    font-black
    leading-none
    tracking-tight
    md:text-[12rem]
    lg:text-[18rem]
    bg-gradient-to-b
    from-black/[0.10]
    via-black/[0.05]
    to-transparent
    dark:from-white/[0.12]
    dark:via-white/[0.06]
    dark:to-transparent
    bg-clip-text
    text-transparent
    select-none
  "
>
  PRIORO
</h1>

        {/* Copyright */}
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2026 Prioro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}