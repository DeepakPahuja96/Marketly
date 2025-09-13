'use client'

import { useState, useEffect } from 'react'
import { getDemoUser, type DemoUser } from '@/lib/demo-auth'

export function useAuth() {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initial load
    const currentUser = getDemoUser()
    setUser(currentUser)
    setIsLoading(false)

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedUser = getDemoUser()
      setUser(updatedUser)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return {
    user,
    isLoading,
    isLoggedIn: !!user,
    isAdmin: user?.role === 'admin'
  }
}
