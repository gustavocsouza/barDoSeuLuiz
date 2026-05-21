'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

export function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const imageRef    = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const textRef     = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const tagRef      = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let split: SplitType | null = null

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        split = new SplitType(headlineRef.current, { types: 'lines,words' })
        gsap.set(split.words, { y: '105%', opacity: 0 })

        ScrollTrigger.create({
          trigger: headlineRef.current,
          start: 'top 72%',
          onEnter: () => {
            gsap.to(split!.words, {
              y: '0%',
              opacity: 1,
              stagger: 0.07,
              duration: 1.0,
              ease: 'expo.out',
            })
          },
        })
      }

      // Image clip-path reveal
      gsap.set(imageRef.current, { clipPath: 'inset(0 100% 0 0)' })
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.to(imageRef.current, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.4,
            ease: 'expo.inOut',
          })
        },
      })

      // Image parallax
      const imgInner = imageRef.current?.querySelector('.img-inner')
      if (imgInner) {
        gsap.to(imgInner, {
          y: '-12%',
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

      // Text block stagger
      gsap.set([textRef.current, tagRef.current, statsRef.current], { opacity: 0, y: 30 })
      ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 72%',
        onEnter: () => {
          gsap.to([tagRef.current, textRef.current, statsRef.current], {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.85,
            ease: 'power3.out',
          })
        },
      })

    }, section)

    return () => {
      ctx.revert()
      split?.revert()
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ backgroundColor: '#F4EFE4', position: 'relative' }}
    >
      {/* ── Section header ──────────────────────────────────── */}
      <div className="section-rule">
        <div
          className="section-container"
          style={{ padding: '2.5rem 3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <span style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', color: '#6B6B6B', textTransform: 'uppercase' }}>
            Our Story
          </span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(10,10,10,0.15)' }} />
        </div>
      </div>

      {/* ── Main grid ────────────────────────────────────────── */}
      <div className="about-grid" style={{ gap: 0 }}>
        {/* ── Left: Image ──────────────────────────────────── */}
        <div
          ref={imageRef}
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '60vh',
            backgroundColor: '#1A0E00',
          }}
        >
          {/* Stylized brewery image placeholder */}
          <div
            className="img-inner"
            style={{
              position: 'absolute',
              inset: '-15% 0',
              background: `
                radial-gradient(ellipse at 30% 40%, rgba(200, 100, 0, 0.25) 0%, transparent 60%),
                radial-gradient(ellipse at 70% 70%, rgba(180, 60, 0, 0.18) 0%, transparent 50%),
                linear-gradient(165deg, #1A0900 0%, #2D1200 35%, #1A0900 60%, #0D0600 100%)
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Decorative brew vessel illustration */}
            <svg viewBox="0 0 300 400" style={{ width: '55%', opacity: 0.18 }} aria-hidden="true">
              <circle cx="150" cy="180" r="90" fill="none" stroke="#C9920D" strokeWidth="1.5" />
              <circle cx="150" cy="180" r="70" fill="none" stroke="#C9920D" strokeWidth="0.8" strokeDasharray="4 6" />
              <rect x="110" y="270" width="80" height="100" rx="4" fill="none" stroke="#C9920D" strokeWidth="1.5" />
              <rect x="130" y="90" width="40" height="90" rx="20" fill="none" stroke="#C9920D" strokeWidth="1.5" />
              <line x1="60" y1="180" x2="240" y2="180" stroke="#C9920D" strokeWidth="0.5" strokeDasharray="3 5" />
              <text x="150" y="186" textAnchor="middle" fontFamily="serif" fontSize="14" fill="#C9920D" opacity="0.7" letterSpacing="3">BREW</text>
            </svg>
          </div>

          {/* Image overlay text */}
          <div
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              left: '2.5rem',
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-grotesk), sans-serif",
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                color: 'rgba(244,239,228,0.5)',
                textTransform: 'uppercase',
                display: 'block',
              }}
            >
              Iron Crow Brewery — Downtown
            </span>
          </div>
        </div>

        {/* ── Right: Text ──────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(3rem, 7vw, 6rem)',
          }}
        >
          {/* Tag */}
          <p
            ref={tagRef}
            style={{
              fontFamily: "var(--font-grotesk), sans-serif",
              fontSize: '0.62rem',
              letterSpacing: '0.3em',
              color: '#C41E3A',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            The Art of Craft
          </p>

          {/* Headline */}
          <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
            <h2
              ref={headlineRef}
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(52px, 8.5vw, 110px)',
                lineHeight: 0.9,
                letterSpacing: '0.01em',
                color: '#0A0A0A',
              }}
            >
              Born from a<br />single obsession
            </h2>
          </div>

          {/* Body text */}
          <div ref={textRef}>
            <p
              style={{
                fontFamily: "var(--font-libre), Georgia, serif",
                fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                fontStyle: 'italic',
                color: '#0A0A0A',
                lineHeight: 1.7,
                marginBottom: '1.2rem',
              }}
            >
              &ldquo;We started with one question: what would the perfect beer taste like? Three years and 200 batches later, Iron Crow was born.&rdquo;
            </p>
            <p
              style={{
                fontFamily: "var(--font-grotesk), sans-serif",
                fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
                color: '#6B6B6B',
                lineHeight: 1.75,
                maxWidth: '46ch',
              }}
            >
              Founded in 2024, our downtown brewery is open to the public every afternoon. Watch our brewers at work, taste directly from the tank, and understand why small-batch means everything.
            </p>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(10,10,10,0.1)',
            }}
          >
            {[
              { num: '200L', label: 'Max batch size' },
              { num: '28',   label: 'Days fermented' },
              { num: '4',    label: 'Core recipes' },
            ].map(({ num, label }) => (
              <div key={num}>
                <div
                  style={{
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    lineHeight: 1,
                    color: '#0A0A0A',
                    letterSpacing: '0.02em',
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-grotesk), sans-serif",
                    fontSize: '0.62rem',
                    letterSpacing: '0.18em',
                    color: '#6B6B6B',
                    textTransform: 'uppercase',
                    marginTop: '0.3rem',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-width editorial banner ──────────────────────── */}
      <div
        style={{
          borderTop: '1px solid rgba(10,10,10,0.08)',
          padding: '3rem 3.5rem',
          overflow: 'hidden',
          backgroundColor: '#ECE6D6',
        }}
      >
        <div className="marquee-track" style={{ gap: '4rem' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                letterSpacing: '0.08em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(10,10,10,0.25)',
                paddingRight: '4rem',
                whiteSpace: 'nowrap',
              }}
            >
              IRON CROW BREWERY &nbsp;·&nbsp; CRAFT BEER &nbsp;·&nbsp; EST. 2024 &nbsp;·
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
