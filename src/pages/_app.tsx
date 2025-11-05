import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MyDhikrProvider } from '@/modules/my-dhikr/context'
import { SettingsProvider } from '@/modules/settings/context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <MyDhikrProvider>
        <Component {...pageProps} />
      </MyDhikrProvider>
    </SettingsProvider>
  )
}
