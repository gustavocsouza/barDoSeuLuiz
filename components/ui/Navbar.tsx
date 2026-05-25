'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Menu',  href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Visit', href: '#visit' },
]

export function Navbar() {
  const navRef     = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Intro reveal — matches original HeroSection header timing
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    gsap.fromTo(nav,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 },
    )
  }, [])

  // Glass effect on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body scroll lock while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Animate overlay in after it mounts
  useEffect(() => {
    if (!menuOpen || !overlayRef.current) return
    gsap.fromTo(overlayRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
    )
  }, [menuOpen])

  const closeMenu = useCallback(() => {
    const overlay = overlayRef.current
    if (!overlay) { setMenuOpen(false); return }
    gsap.to(overlay, {
      opacity: 0,
      y: -12,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setMenuOpen(false),
    })
  }, [])

  const handleNavClick = useCallback((href: string) => {
    closeMenu()
    const id = href.replace('#', '')
    setTimeout(() => {
      const target = document.getElementById(id)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }, 320)
  }, [closeMenu])

  return (
    <>
      <header
        ref={navRef}
        className={`site-navbar${scrolled ? ' scrolled' : ''}`}
        style={{ opacity: 0 }}
      >
        <div className="section-container flex items-center justify-between px-8 py-4 md:px-14 md:py-5">
          {/* Logo */}
          <Image
            src="/images/logo-bdl.png"
            alt="Bar do Luiz Fernandes"
            width={120}
            height={60}
            className="w-14 md:w-20"
            style={{ objectFit: 'contain', height: 'auto' }}
          />

          {/* Center tagline — desktop only */}
          <div
            className="hidden md:flex items-center gap-2 overflow-hidden"
            style={{ maxWidth: '320px' }}
          >
            <div className="h-px w-8 bg-black/20" />
            <span
              style={{
                fontFamily: "var(--font-grotesk), sans-serif",
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                color: '#6B6B6B',
                textTransform: 'uppercase',
              }}
            >
              Boteco Tradicional · Mandaqui · Est. 1970
            </span>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
                data-cursor="hover"
                style={{
                  fontFamily: "var(--font-grotesk), sans-serif",
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  color: '#0A0A0A',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Hamburger button — mobile only */}
          {!menuOpen && <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.4rem',
              alignItems: 'center',
              color: '#0A0A0A',
            }}
          >
            <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden="true">
              <rect y="0"  width="26" height="2" fill="currentColor" />
              <rect y="8"  width="26" height="2" fill="currentColor" />
              <rect y="16" width="26" height="2" fill="currentColor" />
            </svg>
          </button>}
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: '#F4EFE4',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
          }}
        >
          {/* Close button */}
          <button
            onClick={closeMenu}
            aria-label="Close navigation menu"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '2rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: '#0A0A0A',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Nav links */}
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
                style={{
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2.8rem, 12vw, 5rem)',
                  letterSpacing: '0.06em',
                  color: '#0A0A0A',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Footer detail */}
          <p
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              fontFamily: "var(--font-grotesk), sans-serif",
              fontSize: '0.58rem',
              letterSpacing: '0.25em',
              color: '#6B6B6B',
              textTransform: 'uppercase',
            }}
          >
            Bar do Luiz Fernandes · Est. 1970
          </p>
        </div>
      )}
    </>
  )
}
