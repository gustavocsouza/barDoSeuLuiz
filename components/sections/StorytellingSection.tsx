'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

const PANELS = [
  {
    num: '01',
    word: 'HISTÓRIA',
    accent: 'Tudo começou num empório.',
    body: 'Em 1942, Eduardo e Idalina Fernandes tocavam um pequeno armazém na Rua Augusto Tolle com o lema: "Produtos nacionais e estrangeiros. Não tememos concorrência."',
    align: 'left' as const,
  },
  {
    num: '02',
    word: 'TRADIÇÃO',
    accent: 'O boteco nasceu em 1970.',
    body: 'Seu Luiz transformou a mercearia num bar no Mandaqui. Ali já reinava o famoso bolinho de carne — consumido no local ou levado para casa, acompanhado de batidas artesanais.',
    align: 'center' as const,
  },
  {
    num: '03',
    word: 'FAMÍLIA',
    accent: 'Quatro gerações no balcão.',
    body: 'De Eduardo aos 12 anos atendendo mesas, a Catarina idealizando os congelados e Clara cuidando do novo rótulo das batidas — o Bar do Luiz é feito por quem ama.',
    align: 'right' as const,
  },
]

const EQUIPE = [
  { name: 'Eduardo',      img: '/images/equipe-eduardo.png' },
  { name: 'Idalina',      img: '/images/equipe-idalina.png' },
  { name: 'Seu Luiz',     img: '/images/equipe-seu-luiz.png' },
  { name: 'Dona Idalina', img: '/images/equipe-dona-idalina.png' },
  { name: 'Luiz Eduardo', img: '/images/equipe-luiz-eduardo.png' },
  { name: 'Catarina',     img: '/images/equipe-catarina.png' },
  { name: 'Carol',        img: '/images/equipe-carol.png' },
  { name: 'Clara',        img: '/images/equipe-clara.png' },
  { name: 'Rita',         img: '/images/equipe-rita.png' },
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
            A História
          </span>
          <span style={{ fontFamily: "var(--font-grotesk), sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', color: '#6B6B6B', textTransform: 'uppercase' }}>
            Bar do Luiz Fernandes
          </span>
        </div>
      </div>

      {/* ── Story panels ─────────────────────────────────────── */}
      {PANELS.map((panel, i) => (
        <div
          key={panel.word}
          ref={(el) => { panelRefs.current[i] = el }}
          className={`story-panel${i === 2 ? ' familia-panel' : ''}`}
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
          {/* Panel background images */}
          {i === 0 && (
            <Image src="/images/bar-parede-azul.jpg" alt="" fill style={{ objectFit: 'cover', opacity: 0.07 }} aria-hidden />
          )}
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

          {/* Foto grid — desktop only, painel FAMÍLIA */}
          {i === 2 && (
            <div
              className="hidden md:flex"
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                position: 'relative',
                zIndex: 10,
                flexShrink: 0,
              }}
            >
              <p style={{
                fontFamily: "var(--font-grotesk), sans-serif",
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                color: '#C41E3A',
                textTransform: 'uppercase',
              }}>
                — A Equipe
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.75rem',
              }}>
                {EQUIPE.map(({ name, img }) => (
                  <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid #C9920D',
                      position: 'relative',
                      flexShrink: 0,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    }}>
                      <Image src={img} alt={name} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <span style={{
                      fontFamily: "var(--font-grotesk), sans-serif",
                      fontSize: '0.56rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#6B6B6B',
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}>
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

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
