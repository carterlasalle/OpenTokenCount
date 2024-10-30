import { get_encoding, encoding_for_model } from '@dqbd/tiktoken'
import { TokenizationResult, TokenizerOptions } from '@/types'
import { MODEL_CONFIGS, SUPPORTED_ENCODINGS } from './constants'

export class Tokenizer {
  private encoding: any

  constructor(options: TokenizerOptions) {
    if (options.model && MODEL_CONFIGS[options.model as keyof typeof MODEL_CONFIGS]) {
      this.encoding = encoding_for_model(options.model)
    } else {
      this.encoding = get_encoding(options.encoding)
    }
  }

  encode(text: string): TokenizationResult {
    const tokens = this.encoding.encode(text)
    
    return {
      tokens,
      count: tokens.length,
      text,
      encoding: this.encoding.name
    }
  }

  decode(tokens: number[]): string {
    return this.encoding.decode(tokens)
  }

  estimateCost(tokenCount: number, model: string): number {
    const config = MODEL_CONFIGS[model as keyof typeof MODEL_CONFIGS]
    if (!config) throw new Error(`Unsupported model: ${model}`)
    
    return (tokenCount / 1000) * config.inputCostPer1k
  }
}

export const createTokenizer = (options: TokenizerOptions) => {
  return new Tokenizer(options)
} 