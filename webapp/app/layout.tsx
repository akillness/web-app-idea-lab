import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SidebarNav, MobileNav } from './components/NavLinks'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VOC 리포지토리',
  description: '고객의 목소리 신호를 추적하고 우선순위를 정리하는 의사결정 데모',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="h-full bg-slate-900 text-slate-100 antialiased">
        <div className="flex h-full min-h-screen">
          {/* Sidebar */}
          <aside className="hidden md:flex w-56 flex-col bg-slate-950 border-r border-slate-800 shrink-0">
            {/* App title */}
            <div className="px-5 py-5 border-b border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                제품 인텔리전스
              </span>
              <h1 className="mt-1 text-lg font-bold text-white leading-tight">
                VOC 리포지토리
              </h1>
            </div>

            <SidebarNav />

            <div className="px-5 py-4 border-t border-slate-800">
              <span className="text-xs text-slate-600">2026년 4월 4일 주간 기준</span>
            </div>
          </aside>

          {/* Mobile top bar */}
          <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center gap-3">
            <h1 className="text-sm font-bold text-white">VOC 리포지토리</h1>
            <MobileNav />
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
