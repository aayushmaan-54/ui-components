"use client"
import { useEffect, useRef } from 'react'
import "./style.css"

interface GlitchTextProps {
  text: string
  className?: string
}


export default function GlitchText({ text, className = '' }: GlitchTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textElement = textRef.current
    if (textElement) {
      textElement.setAttribute('data-text', text)
    }
  }, [text])

  return (
    <div className={`relative inline-block ${className}`} aria-label={text}>
      <div ref={textRef} className="glitch-text text-accent-green-light">
        {text}
      </div>
    </div>
  )
}

