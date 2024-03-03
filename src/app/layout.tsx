import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Background from '@/components/Background'
import HorizontalHeader from '@/components/HorizontalHeader'
import { DropZone } from '@/components/upload';

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
        <Background>
          <HorizontalHeader documentCount={32} />
          <DropZone>
            {children}
          </DropZone>
        </Background>
      </body>
    </html>
  )
}
