import type { Metadata } from 'next'
import { Bebas_Neue, Libre_Baskerville, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Navbar } from '@/components/ui/Navbar'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-libre',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Iron Crow Brewery — Craft Beer & Bar',
  description: 'Small-batch craft beer brewed with obsession. Downtown bar experience since 2024.',
  openGraph: {
    title: 'Iron Crow Brewery',
    description: 'Brewed with obsession.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${libreBaskerville.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          <GrainOverlay />
          <ScrollProgress />
<Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
