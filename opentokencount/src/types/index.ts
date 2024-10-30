export type EncodingType = 'cl100k_base' | 'p50k_base' | 'r50k_base' | 'o200k_base'

export interface TokenizationResult {
  tokens: number[]
  count: number
  text: string
  encoding: EncodingType
  costEstimate?: {
    model: string
    cost: number
  }
}

export interface TokenizerOptions {
  encoding: EncodingType
  model?: string
} 