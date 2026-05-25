'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
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
            Nossa História
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
          <div className="img-inner" style={{ position: 'absolute', inset: 0 }}>
            <Image src="/images/bar-cheio.jpeg" alt="Bar do Luiz Fernandes lotado" fill style={{ objectFit: 'cover' }} />
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
              Bar do Luiz Fernandes — Mandaqui, SP
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
            Mais de 50 Anos
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
              Nascido de uma<br />família e uma paixão
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
              &ldquo;Seu Luiz transformou uma mercearia num boteco e criou o petisco mais premiado da Zona Norte.&rdquo;
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
              Fundado em 1970 no Mandaqui, o Bar do Luiz Fernandes é aberto ao público de terça a domingo. Venha provar diretamente os petiscos premiados e entender por que tradição tem sabor.
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
              { num: '1970', label: 'Ano de fundação' },
              { num: '50+',  label: 'Anos de tradição' },
              { num: '4',    label: 'Gerações da família' },
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
              BAR DO LUIZ FERNANDES &nbsp;·&nbsp; BOTECO COM ALMA &nbsp;·&nbsp; EST. 1970 &nbsp;·
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
