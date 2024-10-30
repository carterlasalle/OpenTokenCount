import { TokenizeForm } from '@/components/forms/tokenize-form'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">OpenTokenCount</h1>
            <p className="text-muted-foreground">
              A simple tool to count tokens for OpenAI models using Tiktoken
            </p>
          </div>
          <TokenizeForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
