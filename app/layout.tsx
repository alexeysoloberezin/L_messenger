import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'L_messenger',
  description: 'Leonid Ivanov messenger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + 'bg-gray-50 dark:bg-gray-900'} >
        <AuthContext >
          {children}
          
          <ToasterContext />
        </AuthContext>
      </body>
    </html>
  )
}
