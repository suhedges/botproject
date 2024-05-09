// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { Roboto } from 'next/font/google'
import './styles.css'

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        {children}
      </body>
    </html>
  )
}