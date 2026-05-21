'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

const PANELS = [
  {
    num: '01',
    word: 'CRAFTED',
    accent: 'Every grain selected.',
    body: 'We source rare malts from independent farms. Small batches — never more than 200 litres — so every keg that leaves our tank carries a name.',
    align: 'left' as const,
  },
  {
    num: '02',
    word: 'FERMENTED',
    accent: 'Time does the heavy lifting.',
    body: 'Cold fermentation. Wild yeast strains. Zero shortcuts. Our IPA rests for 28 days before it earns the label.',
    align: 'center' as const,
  },
  {
    num: '03',
    word: 'OBSESSED',
    accent: 'This is what we live for.',
    body: 'Iron Crow was built by people who couldn\'t stop thinking about beer. That obsession goes into every pour.',
    align: 'right' as const,
  },
]

export function StorytellingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRefs  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const splits: SplitType[] = []

    const ctx = gsap.context(() => {
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return

        const wordEl    = panel.querySelector('.story-word')
        const accentEl  = panel.querySelector('.story-accent')
        const bodyEl    = panel.querySelector('.story-body')
        const numEl     = panel.querySelector('.story-num')
        const ruleEl    = panel.querySelector('.story-rule')

        if (wordEl) {
          const split = new SplitType(wordEl as HTMLElement, { types: 'chars' })
          splits.push(split)

          // Each panel's chars are hidden initially
          gsap.set(split.chars, { y: 100, opacity: 0, rotateX: 30 })

          ScrollTrigger.create({
            trigger: panel,
            start: 'top 65%',
            onEnter: () => {
              gsap.to(split.chars, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: { amount: 0.5, from: i === 1 ? 'center' : 'start' },
                duration: 0.9,
                ease: 'expo.out',
              })
            },
          })
        }

        gsap.set([accentEl, bodyEl, numEl, ruleEl], { opacity: 0, y: 24 })

        ScrollTrigger.create({
          trigger: panel,
          start: 'top 60%',
          onEnter: () => {
            gsap.to([numEl, ruleEl, accentEl, bodyEl], {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.75,
              ease: 'power3.out',
            })
          },
        })

        // Clip-path reveal for panels
        gsap.set(panel, { clipPath: 'inset(0 0 100% 0)' })
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(panel, {
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.1,
              ease: 'expo.out',
            })
          },
        })
      })
    }, section)

    return () => {
      ctx.revert()
      splits.forEach((s) => s.revert())
    }
  }, [])

  return (
    <section
      id="storytelling"
      ref={sectionRef}
      style={{ backgroundColor: '#F4EFE4' }}
    >
      {/* ── Section header ──────────────────────────────────── */}
      <div className="section-rule">
        <div
          className="section-container"
          style={{
            padding: '2.5rem 3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', color: '#6B6B6B', textTransform: 'uppercase' }}>
            The Process
          </span>
          <span style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', color: '#6B6B6B', textTransform: 'uppercase' }}>
            Iron Crow Brewery
          </span>
        </div>
      </div>

      {/* ── Story panels ─────────────────────────────────────── */}
      {PANELS.map((panel, i) => (
        <div
          key={panel.word}
          ref={(el) => { panelRefs.current[i] = el }}
          style={{
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: panel.align === 'center' ? 'center' : 'flex-end',
            alignItems: panel.align === 'right' ? 'flex-end' : panel.align === 'center' ? 'center' : 'flex-start',
            padding: 'clamp(2rem, 6vw, 6rem)',
            paddingBottom: 'clamp(4rem, 10vh, 8rem)',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(10,10,10,0.08)',
            textAlign: panel.align,
          }}
        >
          {/* Background number */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '-0.1em',
              [panel.align === 'right' ? 'right' : panel.align === 'center' ? 'left' : 'left']: panel.align === 'center' ? '50%' : '-0.05em',
              transform: panel.align === 'center' ? 'translateX(-50%)' : 'none',
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: 'clamp(200px, 38vw, 520px)',
              lineHeight: 0.8,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(10,10,10,0.04)',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {panel.num}
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '720px' }}>
            {/* Number tag */}
            <div className="story-num" style={{ marginBottom: '1.5rem' }}>
              <span
                style={{
                  fontFamily: "var(--font-grotesk), sans-serif",
                  fontSize: '0.62rem',
                  letterSpacing: '0.28em',
                  color: '#C41E3A',
                  textTransform: 'uppercase',
                }}
              >
                — {panel.num}
              </span>
            </div>

            {/* Giant word */}
            <div style={{ overflow: 'hidden' }}>
              <h2
                className="story-word"
                style={{
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: 'clamp(70px, 13vw, 180px)',
                  lineHeight: 0.88,
                  letterSpacing: '0.01em',
                  color: '#0A0A0A',
                  transformOrigin: 'bottom',
                  perspective: '400px',
                }}
              >
                {panel.word}
              </h2>
            </div>

            {/* Rule */}
            <div
              className="story-rule"
              style={{
                width: '48px',
                height: '2px',
                background: '#C41E3A',
                margin: panel.align === 'center' ? '1.5rem auto' : '1.5rem 0',
              }}
            />

            {/* Accent text */}
            <p
              className="story-accent"
              style={{
                fontFamily: "var(--font-libre), Georgia, serif",
                fontSize: 'clamp(1rem, 1.6vw, 1.35rem)',
                fontStyle: 'italic',
                color: '#0A0A0A',
                marginBottom: '1rem',
                lineHeight: 1.4,
              }}
            >
              {panel.accent}
            </p>

            {/* Body text */}
            <p
              className="story-body"
              style={{
                fontFamily: "var(--font-grotesk), sans-serif",
                fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                color: '#6B6B6B',
                lineHeight: 1.75,
                maxWidth: '44ch',
                marginLeft: panel.align === 'center' ? 'auto' : 0,
                marginRight: panel.align === 'center' ? 'auto' : 0,
              }}
            >
              {panel.body}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
