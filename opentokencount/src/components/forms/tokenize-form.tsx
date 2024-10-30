import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { EncodingSelect } from './encoding-select'
import { TokenizationResult } from '@/types'
import { Card, CardContent } from '@/components/ui/card'

export function TokenizeForm() {
  const [text, setText] = useState('')
  const [encoding, setEncoding] = useState('cl100k_base')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TokenizationResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/tokenize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, encoding }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error tokenizing text:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <EncodingSelect value={encoding} onValueChange={setEncoding} />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Enter text to tokenize..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Tokenize'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 