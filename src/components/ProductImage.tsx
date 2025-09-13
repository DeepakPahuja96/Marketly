'use client'

import { useState } from 'react'

interface ProductImageProps {
  src?: string | null
  alt: string
  className?: string
}

export function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  if (!src || imageError) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-2">📦</div>
          <div className="text-sm">Product Image</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full bg-gray-200 ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  )
}
