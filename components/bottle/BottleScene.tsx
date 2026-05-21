'use client'

import { useRef } from 'react'
import { BeerBottle } from './BeerBottle'
import { useBottleMasterTimeline } from '@/hooks/useBottleMasterTimeline'

export function BottleScene() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const floatRef   = useRef<HTMLDivElement>(null)

  useBottleMasterTimeline(wrapperRef, floatRef)

  return (
    /*
     * Fixed overlay — bottle lives here and scrolls across sections
     * via GSAP transforms (no natural scroll participation).
     * pointer-events:none lets clicks pass through to page content.
     */
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        /* Pre-center before GSAP hydrates; GSAP overwrites with xPercent/yPercent */
        transform: 'translate(-50%, -50%) scale(1.35) rotate(-3deg)',
        opacity: 0,              /* hidden until GSAP intro runs */
        zIndex: 100,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
        width: 'clamp(100px, 16vw, 240px)',
      }}
      ref={wrapperRef}
    >
      {/* Inner wrapper receives the looping float + mouse parallax */}
      <div ref={floatRef} style={{ willChange: 'transform' }}>
        <BeerBottle />
      </div>
    </div>
  )
}
