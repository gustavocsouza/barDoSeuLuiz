'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SplitType from 'split-type'

export function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const bgTextRef    = useRef<HTMLDivElement>(null)
  const taglineRef   = useRef<HTMLHeadingElement>(null)
  const subtitleRef  = useRef<HTMLParagraphElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Split the tagline into characters for staggered reveal
    const splitTagline  = taglineRef.current
      ? new SplitType(taglineRef.current, { types: 'chars' })
      : null
    const splitBgText   = bgTextRef.current
      ? new SplitType(bgTextRef.current, { types: 'chars' })
      : null

    const ctx = gsap.context(() => {
      // ── Set initial hidden states ────────────────────────────
      gsap.set([subtitleRef.current, scrollHintRef.current, lineRef.current], {
        opacity: 0, y: 20,
      })

      if (splitTagline?.chars) {
        gsap.set(splitTagline.chars, { y: 140, opacity: 0, rotateX: 40 })
      }

      if (splitBgText?.chars) {
        gsap.set(splitBgText.chars, { opacity: 0 })
      }

      // ── Intro timeline ───────────────────────────────────────
      const tl = gsap.timeline({ delay: 0.3 })

      // Background giant text fades in subtly
      if (splitBgText?.chars) {
        tl.to(splitBgText.chars, {
          opacity: 1,
          stagger: { amount: 0.8, from: 'random' },
          duration: 1.2,
          ease: 'power3.out',
        }, 0.2)
      }

      // Main headline chars — each flies in with clip
      if (splitTagline?.chars) {
        tl.to(splitTagline.chars, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.035,
          duration: 0.85,
          ease: 'expo.out',
        }, 0.7)
      }

      // Subtitle + decorative line
      tl.to([subtitleRef.current, lineRef.current], {
        opacity: 1, y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
      }, 1.3)

      // Scroll hint
      tl.to(scrollHintRef.current, {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, 1.6)

      // ── Continuous scroll hint bounce ────────────────────────
      const arrowEl = scrollHintRef.current?.querySelector('.scroll-arrow') ?? null
      gsap.to(arrowEl, {
        y: 8,
        duration: 1.1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2.2,
      })

      // ── Parallax on scroll – section BG ─────────────────────
      gsap.to(bgTextRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

    }, section)

    return () => {
      ctx.revert()
      splitTagline?.revert()
      splitBgText?.revert()
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex flex-col justify-between overflow-hidden"
      style={{
        height: '100svh',
        minHeight: '600px',
        backgroundColor: '#F4EFE4',
      }}
    >
      {/* ── Giant background typography ───────────────────────── */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -52%)',
          fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
          fontSize: 'clamp(120px, 25vw, 360px)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(10,10,10,0.07)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        CROW
      </div>

      {/* Spacer — matches fixed Navbar height so hero flex layout is preserved */}
      <div aria-hidden="true" style={{ height: '5rem' }} />

      {/* ── Hero body – typography ──────────────────────────────*/}
      <div className="section-container relative z-20 flex flex-col px-8 md:px-14" >

        {/* Subheading above big title */}
        <p
          style={{
            fontFamily: "var(--font-grotesk), sans-serif",
            fontSize: '0.68rem',
            letterSpacing: '0.3em',
            color: '#C41E3A',
            textTransform: 'uppercase',
            marginBottom: '0.6rem',
          }}
        >
          Small-batch · Handcrafted
        </p>

        {/* Giant headline */}
        <div style={{ overflow: 'hidden' }}>
          <h1
            ref={taglineRef}
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 'clamp(72px, 14vw, 200px)',
              lineHeight: 0.9,
              letterSpacing: '0.01em',
              color: '#0A0A0A',
              transformOrigin: 'bottom left',
            }}
          >
            BREWED<br />WITH<br />OBSESSION
          </h1>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div
        className="section-container relative z-20 flex items-end justify-between px-8 pb-8 md:px-14"
        style={{ paddingBottom: '2.5rem' }}
      >
        {/* Subtitle left */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: "var(--font-libre), Georgia, serif",
            fontSize: 'clamp(0.8rem, 1.1vw, 1rem)',
            color: '#6B6B6B',
            fontStyle: 'italic',
            maxWidth: '26ch',
            lineHeight: 1.55,
          }}
        >
          A bar that takes its beer as seriously as its art.
          Downtown, every night.
        </p>

        {/* Decorative rule */}
        <div ref={lineRef} className="hidden md:flex items-center gap-4">
          <div style={{ width: '60px', height: '1px', background: 'rgba(10,10,10,0.2)' }} />
          <span style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: '#6B6B6B', textTransform: 'uppercase' }}>
            6.5% ABV · 355ml
          </span>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="flex flex-col items-center gap-2"
          style={{ color: '#0A0A0A' }}
        >
          <span style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6B6B' }}>
            Scroll
          </span>
          <div
            className="scroll-arrow"
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(10,10,10,0.4), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
