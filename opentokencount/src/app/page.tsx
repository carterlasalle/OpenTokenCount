import { TokenizeForm } from '@/components/forms/tokenize-form'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              OpenTokenCount
            </h1>
            <p className="text-xl text-muted-foreground">
              A simple tool to count tokens for OpenAI models using Tiktoken
            </p>
          </div>
          <div className="grid w-full gap-8">
            <TokenizeForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
