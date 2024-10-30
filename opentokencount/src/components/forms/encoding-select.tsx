"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SUPPORTED_ENCODINGS } from "@/lib/constants"

interface EncodingSelectProps {
  value: string
  onValueChange: (value: string) => void
}

export function EncodingSelect({ value, onValueChange }: EncodingSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select encoding" />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_ENCODINGS.map((encoding) => (
          <SelectItem key={encoding} value={encoding}>
            {encoding}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 