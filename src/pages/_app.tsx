import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MyDhikrProvider } from '@/modules/my-dhikr/context'
import { SettingsProvider } from '@/modules/settings/context'
import { ThemeProvider } from 'next-themes'
import { Lora, Playfair_Display } from 'next/font/google'
import { FontProvider, useFont } from '@/modules/settings/font-context'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
})

const AppWrapper = ({ children }: { children: ReactNode }) => {
  const { font } = useFont()
  return (
    <div
      className={`${lora.variable} ${playfairDisplay.variable} ${
        font === 'lora' ? 'font-sans' : 'font-serif'
      }`}
    >
      {children}
    </div>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FontProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AppWrapper>
          <SettingsProvider>
            <MyDhikrProvider>
              <Toaster richColors position="top-center" />
              <Component {...pageProps} />
            </MyDhikrProvider>
          </SettingsProvider>
        </AppWrapper>
      </ThemeProvider>
    </FontProvider>
  )
}
