import { TokenizationResult } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TokenDisplayProps {
  result: TokenizationResult
}

export function TokenDisplay({ result }: TokenDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tokenization Result</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Token Count</h4>
            <p className="text-2xl font-bold">{result.count}</p>
          </div>
          <div>
            <h4 className="font-medium">Tokens</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {result.tokens.map((token, index) => (
                <span
                  key={`${token}-${index}`}
                  className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-sm"
                >
                  {token}
                </span>
              ))}
            </div>
          </div>
          {result.costEstimate && (
            <div>
              <h4 className="font-medium">Estimated Cost</h4>
              <p className="text-xl">
                ${result.costEstimate.cost.toFixed(6)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 