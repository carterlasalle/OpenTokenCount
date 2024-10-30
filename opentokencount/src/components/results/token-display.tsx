"use client"

import { useState } from 'react'
import { TokenizationResult } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

interface TokenDisplayProps {
  result: TokenizationResult
}

export function TokenDisplay({ result }: TokenDisplayProps) {
  const [copiedToken, setCopiedToken] = useState<number | null>(null)

  const copyToken = async (token: number) => {
    await navigator.clipboard.writeText(token.toString())
    setCopiedToken(token)
    toast.success('Token copied to clipboard')
    setTimeout(() => setCopiedToken(null), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tokenization Result</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Token Count</h4>
              <p className="text-2xl font-bold">{result.count}</p>
            </div>
            {result.costEstimate && (
              <div>
                <h4 className="font-medium mb-2">Estimated Cost</h4>
                <p className="text-2xl font-bold">
                  ${result.costEstimate.cost.toFixed(6)}
                </p>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-4">Tokens</h4>
            <div className="flex flex-wrap gap-2">
              {result.tokens.map((token, index) => (
                <div
                  key={`${token}-${index}`}
                  className="group relative"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => copyToken(token)}
                  >
                    <span>{token}</span>
                    {copiedToken === token ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                    )}
                  </Button>
                  <div className="absolute bottom-full mb-2 hidden group-hover:block">
                    <div className="bg-secondary text-secondary-foreground text-sm rounded-md px-2 py-1">
                      {result.text.slice(index, index + 1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Character Count</h4>
            <p className="text-lg">{result.characterCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 