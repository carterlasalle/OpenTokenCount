import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <p className="text-sm leading-loose text-center text-muted-foreground md:text-left">
          Built with{' '}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Next.js
          </a>{' '}
          and{' '}
          <a
            href="https://github.com/openai/tiktoken"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Tiktoken
          </a>
          . Open source on{' '}
          <a
            href="https://github.com/yourusername/opentokencount"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
} 