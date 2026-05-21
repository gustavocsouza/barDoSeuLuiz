'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAV_ITEMS = [
  { label: 'Home',       href: '#hero',         icon: HomeIcon },
  { label: 'Story',      href: '#storytelling', icon: StoryIcon },
  { label: 'Menu',       href: '#menu',          icon: MenuIcon },
  { label: 'Experience', href: '#experience',    icon: StarIcon },
  { label: 'Visit',      href: '#visit',         icon: PinIcon },
] as const

// ── Minimal inline SVG icons ──────────────────────────────────────
function HomeIcon()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function StoryIcon()   { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> }
function MenuIcon()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> }
function StarIcon()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> }
function PinIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> }

export function MobileNav() {
  const navRef     = useRef<HTMLElement>(null)
  const itemRefs   = useRef<(HTMLAnchorElement | null)[]>([])
  const [active, setActive]   = useState('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // ── Slide in after a brief delay ────────────────────────────
    gsap.fromTo(nav,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: 1.8 }
    )
    setVisible(true)

    // ── Highlight active section on scroll ──────────────────────
    const sections = NAV_ITEMS.map(({ href }) => {
      const id = href.replace('#', '')
      return document.getElementById(id)
    })

    const onScroll = () => {
      const scrollY = window.scrollY
      const winH    = window.innerHeight

      let current = 'hero'
      sections.forEach((sec) => {
        if (!sec) return
        if (sec.getBoundingClientRect().top <= winH * 0.5) {
          current = sec.id
        }
      })
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    const id = href.replace('#', '')
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      aria-label="Mobile navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        backgroundColor: '#F4EFE4',
        borderTop: '1px solid rgba(10,10,10,0.1)',
        display: 'flex',
        alignItems: 'stretch',
        /* Only show on mobile — hidden on md+ via Tailwind */
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      className="md:hidden"
    >
      {NAV_ITEMS.map(({ label, href, icon: Icon }, i) => {
        const sectionId = href.replace('#', '')
        const isActive  = active === sectionId

        return (
          <a
            key={href}
            ref={(el) => { itemRefs.current[i] = el }}
            href={href}
            aria-label={label}
            onClick={(e) => {
              e.preventDefault()
              handleNav(href)
            }}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '0.7rem 0.25rem',
              textDecoration: 'none',
              color: isActive ? '#C41E3A' : 'rgba(10,10,10,0.45)',
              transition: 'color 0.25s ease',
              position: 'relative',
            }}
          >
            {/* Active indicator */}
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '20px',
                  height: '2px',
                  backgroundColor: '#C41E3A',
                  borderRadius: '0 0 2px 2px',
                }}
              />
            )}

            <Icon />

            <span
              style={{
                fontFamily: "var(--font-grotesk), sans-serif",
                fontSize: '0.55rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: isActive ? 600 : 400,
                lineHeight: 1,
              }}
            >
              {label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
