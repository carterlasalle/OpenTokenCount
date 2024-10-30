export const SUPPORTED_ENCODINGS = [
  'cl100k_base',
  'p50k_base',
  'r50k_base',
  'o200k_base'
] as const

export const MODEL_CONFIGS = {
  'gpt-4': {
    encoding: 'cl100k_base',
    inputCostPer1k: 0.03,
    outputCostPer1k: 0.06,
    maxTokens: 8192
  },
  'gpt-3.5-turbo': {
    encoding: 'cl100k_base',
    inputCostPer1k: 0.0015,
    outputCostPer1k: 0.002,
    maxTokens: 4096
  }
} as const 