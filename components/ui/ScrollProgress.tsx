'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    gsap.set(bar, { scaleX: 0, width: '100vw' })

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress })
      },
    })
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ width: '100vw' }}
      aria-hidden="true"
    />
  )
}
