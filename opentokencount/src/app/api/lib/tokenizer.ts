import { get_encoding, encoding_for_model } from 'tiktoken'
import type { EncodingType, TokenizeResponse } from '@/types'
import { MODEL_TO_ENCODING } from './constants'

export class Tokenizer {
  private encoding
  
  constructor(encodingType: EncodingType) {
    this.encoding = get_encoding(encodingType)
  }

  tokenize(text: string): TokenizeResponse {
    const tokens = this.encoding.encode(text)
    const tokenBytes = tokens.map(token => 
      this.encoding.decode_single_token_bytes(token)
    )

    return {
      tokens,
      count: tokens.length,
      text,
      encoding: this.encoding.name as EncodingType,
      tokenBytes
    }
  }

  static forModel(model: string) {
    const encodingType = MODEL_TO_ENCODING[model]
    if (!encodingType) {
      throw new Error(`No encoding found for model: ${model}`)
    }
    return new Tokenizer(encodingType)
  }

  free() {
    this.encoding.free()
  }
} 