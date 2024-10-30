import { NextRequest, NextResponse } from 'next/server'
import { createTokenizer } from '@/lib/tokenizer'
import { EncodingType } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const { text, encoding, model } = await req.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    const tokenizer = createTokenizer({
      encoding: encoding as EncodingType,
      model
    })

    const result = tokenizer.encode(text)

    if (model) {
      result.costEstimate = {
        model,
        cost: tokenizer.estimateCost(result.count, model)
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Tokenization error:', error)
    return NextResponse.json(
      { error: 'Failed to process tokenization' },
      { status: 500 }
    )
  }
} 