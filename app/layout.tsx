import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { site } from "@/lib/site"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: `${site.name} · Portfólio`,
  description: site.tagline,
  authors: [{ name: site.name, url: site.socials.github }],
  openGraph: {
    title: `${site.name} · Portfólio`,
    description: site.tagline,
    locale: "pt_BR",
    type: "website",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
