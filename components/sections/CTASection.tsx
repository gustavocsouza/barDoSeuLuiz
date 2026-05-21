'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

export function CTASection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const infoRef     = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const bgCircleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let split: SplitType | null = null

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        split = new SplitType(headlineRef.current, { types: 'lines,words' })
        gsap.set(split.words, { y: '110%', opacity: 0 })

        ScrollTrigger.create({
          trigger: headlineRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(split!.words, {
              y: '0%',
              opacity: 1,
              stagger: 0.08,
              duration: 1.1,
              ease: 'expo.out',
            })
          },
        })
      }

      // Pulsing background circle
      gsap.to(bgCircleRef.current, {
        scale: 1.08,
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.set([subRef.current, infoRef.current, ctaRef.current], { opacity: 0, y: 24 })
      ScrollTrigger.create({
        trigger: subRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to([subRef.current, infoRef.current, ctaRef.current], {
            opacity: 1,
            y: 0,
            stagger: 0.14,
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
      id="visit"
      ref={sectionRef}
      style={{
        backgroundColor: '#F4EFE4',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 6vw, 5rem)',
      }}
    >
      {/* ── Ambient background circle ─────────────────────────── */}
      <div
        ref={bgCircleRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(500px, 80vw, 900px)',
          height: 'clamp(500px, 80vw, 900px)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(196,30,58,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Corner number ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-0.08em',
          right: '-0.02em',
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
        06
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {/* Tag */}
        <p
          style={{
            fontFamily: "var(--font-grotesk), sans-serif",
            fontSize: '0.62rem',
            letterSpacing: '0.3em',
            color: '#C41E3A',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          Come find us
        </p>

        {/* Main headline — bottle returns here as hero visual */}
        {/* (BottleScene handles position via master timeline) */}
        <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
          <h2
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 'clamp(58px, 11vw, 140px)',
              lineHeight: 0.88,
              letterSpacing: '0.01em',
              color: '#0A0A0A',
            }}
          >
            VISIT US<br />TONIGHT
          </h2>
        </div>

        {/* Subtitle */}
        <p
          ref={subRef}
          style={{
            fontFamily: "var(--font-libre), Georgia, serif",
            fontSize: 'clamp(0.88rem, 1.2vw, 1.1rem)',
            fontStyle: 'italic',
            color: '#6B6B6B',
            lineHeight: 1.65,
            maxWidth: '38ch',
            margin: '0 auto 3rem',
          }}
        >
          The bar is open. The tank is full. The only thing missing is you.
        </p>

        {/* Info grid */}
        <div
          ref={infoRef}
          className="info-grid"
        >
          {[
            { label: 'Address', value: '123 Crow Street\nDowntown District' },
            { label: 'Hours',   value: 'Mon – Thu  4pm – 12am\nFri – Sun  12pm – 2am' },
            { label: 'Contact', value: '(555) 123-4567\nhello@ironcrow.co' },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{ backgroundColor: '#F4EFE4', padding: '1.75rem 2rem' }}
            >
              <p style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: '#C41E3A', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                {label}
              </p>
              {value.split('\n').map((line, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--font-grotesk), sans-serif",
                    fontSize: '0.88rem',
                    color: '#0A0A0A',
                    lineHeight: 1.6,
                    letterSpacing: '0.02em',
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-premium" data-cursor="hover" type="button">
            <span>Reserve a Table</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            type="button"
            data-cursor="hover"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.1rem 2.4rem',
              background: 'transparent',
              color: '#0A0A0A',
              fontFamily: "var(--font-grotesk), sans-serif",
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              border: '1px solid rgba(10,10,10,0.25)',
              cursor: 'none',
              transition: 'border-color 0.3s ease, color 0.3s ease',
            }}
          >
            <span>See Our Menu</span>
          </button>
        </div>

        {/* Footer signature */}
        <div
          style={{
            marginTop: '5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(10,10,10,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: '1rem', letterSpacing: '0.14em', color: '#0A0A0A' }}>
            IRON CROW BREWERY
          </span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Instagram', 'Facebook', 'Untappd'].map((s) => (
              <a
                key={s}
                href="#"
                data-cursor="hover"
                style={{
                  fontFamily: "var(--font-grotesk), sans-serif",
                  fontSize: '0.62rem',
                  letterSpacing: '0.18em',
                  color: '#6B6B6B',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
              >
                {s}
              </a>
            ))}
          </div>
          <span style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#6B6B6B', textTransform: 'uppercase' }}>
            © 2024 Iron Crow
          </span>
        </div>
      </div>
    </section>
  )
}
