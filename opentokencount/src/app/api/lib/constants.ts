import { EncodingType, TokenCosts } from '@/types'

export const AVAILABLE_ENCODINGS: EncodingType[] = [
  'cl100k_base',
  'p50k_base',
  'r50k_base',
  'o200k_base'
]

export const MODEL_TO_ENCODING: Record<string, EncodingType> = {
  'gpt-4': 'cl100k_base',
  'gpt-3.5-turbo': 'cl100k_base',
  'gpt-4-32k': 'cl100k_base',
  'text-davinci-003': 'p50k_base',
  'text-embedding-ada-002': 'cl100k_base'
}

export const TOKEN_COSTS: TokenCosts = {
  'gpt-4': 0.03,
  'gpt-3.5-turbo': 0.002,
  'gpt-4-32k': 0.06,
  'text-embedding-ada-002': 0.0001
} 