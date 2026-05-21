'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const BEERS = [
  {
    id: 'ipa',
    num: '01',
    name: 'Iron Crow IPA',
    style: 'India Pale Ale',
    abv: '7.2%',
    ibu: '65 IBU',
    color: '#C9920D',
    desc: 'A relentless hop assault balanced by a clean malt backbone. Citrus, pine, and a long bitter finish that demands another sip.',
    notes: ['Citrus', 'Pine', 'Tropical fruit'],
    tagline: 'Hops that hit like a freight train.',
  },
  {
    id: 'stout',
    num: '02',
    name: 'Dark Crow Stout',
    style: 'Imperial Stout',
    abv: '6.8%',
    ibu: '42 IBU',
    color: '#1A0900',
    desc: 'Darkness you can taste. Rich chocolate and roasted espresso with a silky body and warm finish.',
    notes: ['Dark chocolate', 'Espresso', 'Molasses'],
    tagline: 'Darkness has a flavor.',
  },
  {
    id: 'wheat',
    num: '03',
    name: 'Crow Wheat',
    style: 'American Wheat',
    abv: '4.5%',
    ibu: '18 IBU',
    color: '#E8B840',
    desc: 'Light as an afternoon. Hazy, crisp, with a subtle spice from our Belgian yeast strain.',
    notes: ['Lemon zest', 'Clove', 'Biscuit'],
    tagline: 'Light as a feather, complex as silence.',
  },
  {
    id: 'amber',
    num: '04',
    name: 'Red Crow Amber',
    style: 'American Amber',
    abv: '5.8%',
    ibu: '30 IBU',
    color: '#A03010',
    desc: 'The color of a perfect sunset. Caramel malt sweetness, a touch of earthy hops, and a clean, dry finish.',
    notes: ['Caramel', 'Toasted bread', 'Dried fruit'],
    tagline: 'The color of a perfect sunset.',
  },
]

export function MenuSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.set(headerRef.current, { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        },
      })

      // Cards stagger in
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.set(card, { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' })

        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.9,
              delay: i * 0.1,
              ease: 'expo.out',
            })
          },
        })

        // Hover animations
        const abvEl      = card.querySelector('.card-abv')
        const notesEl    = card.querySelector('.card-notes')
        const taglineEl  = card.querySelector('.card-tagline')
        const ruleEl     = card.querySelector('.card-rule')
        const colorBar   = card.querySelector('.card-colorbar')

        const onEnter = () => {
          gsap.to(card, { y: -6, duration: 0.45, ease: 'power2.out' })
          gsap.to(colorBar, { scaleX: 1, duration: 0.5, ease: 'expo.out' })
          gsap.to([taglineEl, notesEl], { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' })
          gsap.to(ruleEl, { scaleX: 1, duration: 0.5, ease: 'expo.out', transformOrigin: 'left' })
        }
        const onLeave = () => {
          gsap.to(card, { y: 0, duration: 0.45, ease: 'power2.out' })
          gsap.to([taglineEl, notesEl], { opacity: 0, y: 8, duration: 0.3 })
          gsap.to(ruleEl, { scaleX: 0, duration: 0.3, transformOrigin: 'left' })
        }

        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mouseleave', onLeave)
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="menu"
      ref={sectionRef}
      style={{ backgroundColor: '#F4EFE4', paddingBottom: 'clamp(4rem, 10vh, 8rem)' }}
    >
      {/* ── Header ────────────────────────────────────────────── */}
      <div
        ref={headerRef}
        style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 3.5rem)', borderTop: '1px solid rgba(10,10,10,0.08)' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.62rem', letterSpacing: '0.3em', color: '#C41E3A', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              On Tap
            </p>
            <h2
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(52px, 10vw, 130px)',
                lineHeight: 0.88,
                letterSpacing: '0.01em',
                color: '#0A0A0A',
              }}
            >
              WHAT&apos;S<br />ON TAP
            </h2>
          </div>
          <p style={{ fontFamily: "var(--font-libre), Georgia, serif", fontSize: '0.95rem', fontStyle: 'italic', color: '#6B6B6B', maxWidth: '28ch', lineHeight: 1.6 }}>
            Four rotating recipes. Brewed on-site. Always fresh.
          </p>
        </div>
      </div>

      {/* ── Cards grid ───────────────────────────────────────── */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '1px',
          backgroundColor: 'rgba(10,10,10,0.08)',
          border: '1px solid rgba(10,10,10,0.08)',
          margin: '0 clamp(1.5rem, 5vw, 3.5rem)',
        }}
      >
        {BEERS.map((beer, i) => (
          <div
            key={beer.id}
            ref={(el) => { cardRefs.current[i] = el }}
            data-cursor="hover"
            style={{
              backgroundColor: '#F4EFE4',
              padding: '2.5rem 2rem',
              cursor: 'none',
              position: 'relative',
              overflow: 'hidden',
              transition: 'background-color 0.3s ease',
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Color accent bar (hidden until hover) */}
            <div
              className="card-colorbar"
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '3px',
                backgroundColor: beer.color,
                transform: 'scaleX(0)',
                transformOrigin: 'left',
              }}
            />

            {/* Top section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.58rem', letterSpacing: '0.22em', color: '#C41E3A', textTransform: 'uppercase' }}>
                  {beer.num}
                </span>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: beer.color,
                    opacity: 0.85,
                  }}
                />
              </div>

              {/* Beer name */}
              <h3
                style={{
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: 'clamp(28px, 3.5vw, 38px)',
                  lineHeight: 0.92,
                  letterSpacing: '0.02em',
                  color: '#0A0A0A',
                  marginBottom: '0.4rem',
                }}
              >
                {beer.name}
              </h3>

              {/* Style tag */}
              <p style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', color: '#6B6B6B', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {beer.style}
              </p>

              {/* Description */}
              <p style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.84rem', color: '#6B6B6B', lineHeight: 1.65 }}>
                {beer.desc}
              </p>
            </div>

            {/* Bottom section */}
            <div>
              {/* Rule (expands on hover) */}
              <div
                className="card-rule"
                style={{
                  height: '1px',
                  backgroundColor: beer.color,
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  margin: '1.5rem 0 1rem',
                }}
              />

              {/* Tagline (hidden, reveals on hover) */}
              <p
                className="card-tagline"
                style={{
                  fontFamily: "var(--font-libre), Georgia, serif",
                  fontSize: '0.82rem',
                  fontStyle: 'italic',
                  color: '#0A0A0A',
                  opacity: 0,
                  transform: 'translateY(8px)',
                  marginBottom: '1rem',
                }}
              >
                &ldquo;{beer.tagline}&rdquo;
              </p>

              {/* Notes + ABV row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Tasting notes (hover reveal) */}
                <div
                  className="card-notes"
                  style={{
                    display: 'flex',
                    gap: '0.4rem',
                    flexWrap: 'wrap',
                    opacity: 0,
                    transform: 'translateY(8px)',
                  }}
                >
                  {beer.notes.map((note) => (
                    <span
                      key={note}
                      style={{
                        fontFamily: "var(--font-grotesk), sans-serif",
                        fontSize: '0.58rem',
                        letterSpacing: '0.15em',
                        color: '#6B6B6B',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(10,10,10,0.12)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '2px',
                      }}
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* ABV / IBU always visible */}
                <div className="card-abv" style={{ textAlign: 'right', flexShrink: 0, marginLeft: '1rem' }}>
                  <div style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: '1.4rem', lineHeight: 1, letterSpacing: '0.04em', color: '#0A0A0A' }}>
                    {beer.abv}
                  </div>
                  <div style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.56rem', letterSpacing: '0.18em', color: '#6B6B6B', textTransform: 'uppercase' }}>
                    {beer.ibu}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
