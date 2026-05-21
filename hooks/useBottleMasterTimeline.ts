'use client'

import { useEffect, RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useBottleMasterTimeline(
  wrapperRef: RefObject<HTMLDivElement | null>,
  floatRef:   RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const wrapper = wrapperRef.current
    const float   = floatRef.current
    if (!wrapper || !float) return

    const vw = () => window.innerWidth  / 100
    const vh = () => window.innerHeight / 100

    // ── Initial state ──────────────────────────────────────────
    gsap.set(wrapper, {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      scale: 1.35,
      rotation: -3,
      opacity: 0,
    })

    // ── Mouse parallax (outside context so listener is tracked) ─
    let mouseX = 0, mouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      gsap.to(float, {
        x: mouseX * 8,
        y: mouseY * 5,
        duration: 1.2,
        ease: 'power1.out',
        overwrite: 'auto',
      })
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Wrap all GSAP in a context so cleanup is isolated ──────
    const ctx = gsap.context(() => {
      // ── Intro reveal ────────────────────────────────────────
      gsap.to(wrapper, {
        opacity: 1,
        duration: 1.6,
        delay: 0.6,
        ease: 'expo.out',
      })

      // ── Continuous floating loop on the inner wrapper ────────
      gsap.to(float, {
        y: '+=18',
        rotation: '+=2.5',
        duration: 2.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      // ── Master scroll-driven timeline ────────────────────────
      const masterTL = gsap.timeline({ paused: true })

      masterTL
        // Phase 0→1 : Hero idle ─ bottle settles very slightly
        .to(wrapper, {
          scale: 1.25,
          rotation: 2,
          duration: 1,
          ease: 'none',
        }, 0)

        // Phase 1→3 : Storytelling — travels right & up
        .to(wrapper, {
          x: () => vw() * 28,
          y: () => -vh() * 8,
          scale: 0.88,
          rotation: 14,
          duration: 2,
          ease: 'power2.inOut',
        }, 1)

        // Phase 3→5 : Storytelling mid — swings left
        .to(wrapper, {
          x: () => -vw() * 30,
          y: () =>  vh() * 6,
          scale: 0.72,
          rotation: -12,
          duration: 2,
          ease: 'power2.inOut',
        }, 3)

        // Phase 5→7 : About section — settles right, smaller
        .to(wrapper, {
          x: () => vw() * 33,
          y: () => vh() * 10,
          scale: 0.62,
          rotation: 7,
          duration: 2,
          ease: 'power2.inOut',
        }, 5)

        // Phase 7→9 : Menu section — drifts through center
        .to(wrapper, {
          x: () => -vw() * 8,
          y: () => -vh() * 5,
          scale: 0.58,
          rotation: -4,
          duration: 2,
          ease: 'power2.inOut',
        }, 7)

        // Phase 9→11 : Experience — ghost giant
        .to(wrapper, {
          x: 0,
          y: 0,
          scale: 3.2,
          rotation: 0,
          opacity: 0.07,
          duration: 2,
          ease: 'power2.inOut',
        }, 9)

        // Phase 11→14 : CTA — triumphant return
        .to(wrapper, {
          x: 0,
          y: 0,
          scale: 1.3,
          rotation: -2,
          opacity: 1,
          duration: 3,
          ease: 'expo.out',
        }, 11)

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'max',
        scrub: 2,
        onUpdate: (self) => {
          masterTL.progress(self.progress)
        },
      })

      // ── CTA z-index fix ──────────────────────────────────────
      // Drop bottle behind CTA content (z:10) when section enters
      ScrollTrigger.create({
        trigger: '#visit',
        start: 'top 65%',
        onEnter: () => {
          gsap.set(wrapper, { zIndex: 5 })
        },
        onLeaveBack: () => {
          gsap.set(wrapper, { zIndex: 100 })
        },
      })
    })

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', onMouseMove)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
