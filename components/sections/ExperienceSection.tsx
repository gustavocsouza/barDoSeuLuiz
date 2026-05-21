'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

export function ExperienceSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const pinRef      = useRef<HTMLDivElement>(null)
  const line1Ref    = useRef<HTMLDivElement>(null)
  const line2Ref    = useRef<HTMLDivElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const counterRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const pin     = pinRef.current
    if (!section || !pin) return

    let splits: SplitType[] = []

    const ctx = gsap.context(() => {
      // ── Split both headline lines ────────────────────────────
      const split1 = line1Ref.current ? new SplitType(line1Ref.current, { types: 'chars' }) : null
      const split2 = line2Ref.current ? new SplitType(line2Ref.current, { types: 'chars' }) : null
      if (split1) splits.push(split1)
      if (split2) splits.push(split2)

      gsap.set(split1?.chars ?? [], { opacity: 0, y: '100%', rotateX: 45 })
      gsap.set(split2?.chars ?? [], { opacity: 0, y: '100%', rotateX: 45 })
      gsap.set(subRef.current, { opacity: 0, y: 20 })
      gsap.set(counterRef.current, { opacity: 0 })

      // ── Pinned scroll timeline ───────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      })

      tl
        // 0 → 0.25 — line 1 chars fly in from bottom
        .to(split1?.chars ?? [], {
          opacity: 1,
          y: '0%',
          rotateX: 0,
          stagger: { amount: 0.4, from: 'start' },
          duration: 0.3,
          ease: 'expo.out',
        }, 0)

        // 0.25 → 0.5 — line 2 chars fly in
        .to(split2?.chars ?? [], {
          opacity: 1,
          y: '0%',
          rotateX: 0,
          stagger: { amount: 0.4, from: 'start' },
          duration: 0.3,
          ease: 'expo.out',
        }, 0.25)

        // 0.5 → 0.65 — subtitle fades in
        .to(subRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: 'power2.out',
        }, 0.5)

        // 0.55 → 0.7 — counter appears
        .to(counterRef.current, {
          opacity: 1,
          duration: 0.15,
          ease: 'power2.out',
        }, 0.55)

        // 0.7 → 1.0 — both lines spread apart + text stretches (cinematic hold)
        .to([line1Ref.current, line2Ref.current], {
          letterSpacing: '0.08em',
          duration: 0.3,
          ease: 'power2.inOut',
        }, 0.7)

        // Chars slight spread for drama
        .to(split2?.chars ?? [], {
          x: (i, el, arr) => (i - arr.length / 2) * 1.8,
          duration: 0.3,
          ease: 'power2.inOut',
        }, 0.75)
    }, section)

    return () => {
      ctx.revert()
      splits.forEach((s) => s.revert())
    }
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        backgroundColor: '#0A0A0A',
        overflow: 'hidden',
      }}
    >
      <div
        ref={pinRef}
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(2rem, 6vw, 5rem)',
          position: 'relative',
        }}
      >
        {/* Corner tags */}
        <div
          style={{
            position: 'absolute',
            top: '2.5rem',
            left: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#C41E3A' }} />
          <span style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.58rem', letterSpacing: '0.28em', color: 'rgba(244,239,228,0.35)', textTransform: 'uppercase' }}>
            The Experience
          </span>
        </div>

        <div
          ref={counterRef}
          style={{
            position: 'absolute',
            top: '2.5rem',
            right: '3.5rem',
            fontFamily: "var(--font-grotesk), sans-serif",
            fontSize: '0.58rem',
            letterSpacing: '0.22em',
            color: 'rgba(244,239,228,0.3)',
            textTransform: 'uppercase',
          }}
        >
          04 / 06
        </div>

        {/* Main headline */}
        <div
          style={{
            textAlign: 'center',
            perspective: '600px',
          }}
        >
          {/* Line 1 */}
          <div style={{ overflow: 'hidden', lineHeight: 0.88, marginBottom: '0.05em' }}>
            <h2
              ref={line1Ref}
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(80px, 17vw, 220px)',
                lineHeight: 0.88,
                letterSpacing: '0.03em',
                color: '#F4EFE4',
                display: 'block',
              }}
            >
              DRINK
            </h2>
          </div>

          {/* Line 2 with red outline */}
          <div style={{ overflow: 'hidden', lineHeight: 0.88 }}>
            <h2
              ref={line2Ref}
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(80px, 17vw, 220px)',
                lineHeight: 0.88,
                letterSpacing: '0.03em',
                color: 'transparent',
                WebkitTextStroke: '2px #C41E3A',
                display: 'block',
              }}
            >
              DIFFERENT
            </h2>
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subRef}
          style={{
            fontFamily: "var(--font-libre), Georgia, serif",
            fontSize: 'clamp(0.9rem, 1.3vw, 1.2rem)',
            fontStyle: 'italic',
            color: 'rgba(244,239,228,0.45)',
            maxWidth: '36ch',
            textAlign: 'center',
            lineHeight: 1.65,
            marginTop: '3rem',
          }}
        >
          Every glass is a declaration of intent.
          We don&apos;t brew for the masses — we brew for the moment.
        </p>

        {/* Bottom decorative rule */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <div style={{ width: '40px', height: '1px', background: 'rgba(244,239,228,0.15)' }} />
          <span style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.58rem', letterSpacing: '0.25em', color: 'rgba(244,239,228,0.25)', textTransform: 'uppercase' }}>
            Iron Crow · Downtown
          </span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(244,239,228,0.15)' }} />
        </div>
      </div>
    </section>
  )
}
