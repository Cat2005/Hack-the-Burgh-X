import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Background from '@/components/Background'
import HorizontalHeader from '@/components/HorizontalHeader'
import { DropZone } from '@/components/upload';

import { Toaster } from '@/components/ui/sonner'

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
<<<<<<< HEAD
          <DropZone>
            {children}
          </DropZone>
        </Background>
=======
          {children}
          <Toaster position="bottom-left" richColors />
        </Main>
>>>>>>> e3e3698 (add Document view page)
      </body>
    </html>
  )
}
