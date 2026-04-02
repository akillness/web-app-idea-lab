import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VOC Repository',
  description: 'Voice-of-Customer signal tracking and decision intelligence',
}

const navLinks = [
  { href: '/', label: 'Dashboard', icon: '▣' },
  { href: '/records', label: 'Records', icon: '◧' },
  { href: '/accounts', label: 'Accounts', icon: '◉' },
  { href: '/themes', label: 'Themes', icon: '◈' },
  { href: '/briefs', label: 'Briefs', icon: '◫' },
  { href: '/queue', label: 'Build Queue', icon: '◆' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="h-full bg-slate-900 text-slate-100 antialiased">
        <div className="flex h-full min-h-screen">
          {/* Sidebar */}
          <aside className="hidden md:flex w-56 flex-col bg-slate-950 border-r border-slate-800 shrink-0">
            {/* App title */}
            <div className="px-5 py-5 border-b border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Product Intelligence
              </span>
              <h1 className="mt-1 text-lg font-bold text-white leading-tight">
                VOC Repository
              </h1>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <span className="text-base leading-none">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="px-5 py-4 border-t border-slate-800">
              <span className="text-xs text-slate-600">Week of Apr 4, 2026</span>
            </div>
          </aside>

          {/* Mobile top bar */}
          <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center gap-3">
            <h1 className="text-sm font-bold text-white">VOC Repository</h1>
            <nav className="flex gap-2 overflow-x-auto ml-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto md:pt-0 pt-14">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
