"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react'

type Font = 'lora' | 'playfair'

interface FontContextType {
  font: Font
  setFont: (font: Font) => void
}

const FontContext = createContext<FontContextType | undefined>(undefined)

export const FontProvider = ({ children }: { children: ReactNode }) => {
  const [font, setFont] = useState<Font>('lora')

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  )
}

export const useFont = () => {
  const context = useContext(FontContext)
  if (!context) {
    throw new Error('useFont must be used within a FontProvider')
  }
  return context
}
