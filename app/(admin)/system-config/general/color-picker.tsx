"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  id?: string
}

export function ColorPicker({ color, onChange, id }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(color)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputValue(color)
  }, [color])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value)
    }
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    onChange(value)
  }

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-10 h-10 rounded-md border border-input"
            style={{ backgroundColor: inputValue }}
            aria-label="Pick a color"
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <div className="flex flex-col gap-2">
            <input type="color" value={inputValue} onChange={handleColorChange} className="w-32 h-32 cursor-pointer" />
          </div>
        </PopoverContent>
      </Popover>
      <Input
        ref={inputRef}
        id={id}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="w-28 font-mono"
        placeholder="#000000"
      />
    </div>
  )
}

