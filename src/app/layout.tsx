import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Main from '@/components/Main'
import HorizontalHeader from '@/components/HorizontalHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HTBX',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Main>
          <HorizontalHeader documentCount={32} />
          {children}
        </Main>
      </body>
    </html>
  )
}
