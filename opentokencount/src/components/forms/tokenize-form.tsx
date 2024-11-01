"use client"

import { useState, useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { EncodingSelect } from './encoding-select'
import { TokenDisplay } from '../results/token-display'
import { TokenizationResult, TokenizerError } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function TokenizeForm() {
  const [text, setText] = useState('')
  const [debouncedText] = useDebounce(text, 500)
  const [encoding, setEncoding] = useState('cl100k_base')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TokenizationResult | null>(null)

  const tokenize = useCallback(async (textToTokenize: string) => {
    if (!textToTokenize.trim()) {
      setResult(null)
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/tokenize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToTokenize, encoding }),
      })

      if (!response.ok) {
        const error: TokenizerError = await response.json()
        throw new Error(error.message)
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to tokenize text')
    } finally {
      setLoading(false)
    }
  }, [encoding])

  useEffect(() => {
    tokenize(debouncedText)
  }, [debouncedText, tokenize])

  return (
    <div className="grid gap-6">
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="flex items-center gap-4">
              <EncodingSelect value={encoding} onValueChange={setEncoding} />
            </div>
            <div className="grid gap-2">
              <Textarea
                placeholder="Enter text to tokenize..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px] resize-none rounded-md border-2 p-4 font-mono text-sm"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Characters: {text.length}</span>
                {result && <span>Tokens: {result.count}</span>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-[100px] w-full" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </CardContent>
        </Card>
      ) : result ? (
        <TokenDisplay result={result} />
      ) : null}
    </div>
  )
} 