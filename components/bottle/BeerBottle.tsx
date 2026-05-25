import Image from 'next/image'

interface BeerBottleProps {
  className?: string
}

export function BeerBottle({ className = '' }: BeerBottleProps) {
  return (
    /*
     * The parent BottleScene wrapper controls all GSAP transforms
     * (position, scale, rotation, opacity). This component only
     * renders the visual bottle asset.
     *
     * NOTE: The public file is named "bottle.png.png" (double extension).
     * Rename it to "bottle.png" in /public and update src below if needed.
     */
    <Image
      src="/bottle.png"
      alt="Iron Crow craft beer bottle"
      width={400}
      height={1100}
      priority
      draggable={false}
      className={`w-full h-auto select-none pointer-events-none ${className}`}
      style={{ objectFit: 'contain' }}
    />
  )
}
