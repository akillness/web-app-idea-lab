'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Dashboard', icon: '▣' },
  { href: '/records', label: 'Records', icon: '◧' },
  { href: '/accounts', label: 'Accounts', icon: '◉' },
  { href: '/themes', label: 'Themes', icon: '◈' },
  { href: '/briefs', label: 'Briefs', icon: '◫' },
  { href: '/queue', label: 'Build Queue', icon: '◆' },
]

export function SidebarNav() {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
      {navLinks.map((link) => {
        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors
              ${isActive
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span className="text-base leading-none">{link.icon}</span>
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="flex gap-2 overflow-x-auto ml-2">
      {navLinks.map((link) => {
        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap text-xs px-2 py-1 rounded transition-colors
              ${isActive ? 'bg-slate-600 text-white font-medium' : 'text-slate-400 hover:text-white bg-slate-800'}`}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
