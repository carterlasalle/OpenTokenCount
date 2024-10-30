"use client"

import { useState } from 'react'
import { TokenizationResult } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
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
    <Card className="border-2">
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Token Count</h4>
              <p className="text-2xl font-bold">{result.count}</p>
            </div>
            {result.costEstimate && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Estimated Cost</h4>
                <p className="text-2xl font-bold">
                  ${result.costEstimate.cost.toFixed(6)}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm">Tokens</h4>
            <div className="flex flex-wrap gap-2">
              {result.tokens.map((token, index) => (
                <div
                  key={`${token}-${index}`}
                  className="group relative"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-2 font-mono"
                    onClick={() => copyToken(token)}
                  >
                    {token}
                    {copiedToken === token ? (
                      <Check className="ml-2 h-3 w-3" />
                    ) : (
                      <Copy className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100" />
                    )}
                  </Button>
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block">
                    <div className="rounded-md border bg-popover px-2 py-1 text-sm">
                      {result.text.slice(index, index + 1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 