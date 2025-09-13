import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavbarClient } from '@/components/NavbarClient'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marketly - Token-Based Marketplace',
  description: 'A modern token-based product marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarClient />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}