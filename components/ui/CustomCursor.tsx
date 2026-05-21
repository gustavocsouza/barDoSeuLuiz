'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot follows instantly
      gsap.to(dot, {
        x: mouseX, y: mouseY,
        duration: 0.08,
        ease: 'none',
        overwrite: true,
      })

      // Ring lags behind for organic feel
      gsap.to(ring, {
        x: mouseX, y: mouseY,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    const onMouseEnterLink = () => {
      gsap.to(dot,  { scale: 0.4, duration: 0.3, ease: 'power2.out' })
      gsap.to(ring, { scale: 1.6, borderColor: '#C41E3A', backgroundColor: 'rgba(196,30,58,0.06)', duration: 0.3, ease: 'power2.out' })
    }

    const onMouseLeaveLink = () => {
      gsap.to(dot,  { scale: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(ring, { scale: 1, borderColor: '#0A0A0A', backgroundColor: 'transparent', duration: 0.3, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMouseMove)

    // Attach hover listeners to all interactive elements
    const hookInteractive = () => {
      const els = document.querySelectorAll('a, button, [data-cursor="hover"]')
      els.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }

    hookInteractive()
    // Re-hook after page updates
    const observer = new MutationObserver(hookInteractive)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
