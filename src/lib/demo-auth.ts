'use client'

// Demo authentication for testing without Supabase
// This simulates login/logout functionality using localStorage

const DEMO_USERS = [
  {
    email: 'demo@marketly.com',
    password: 'demo123',
    role: 'user',
    tokens: 500
  },
  {
    email: 'admin@marketly.com', 
    password: 'admin123',
    role: 'admin',
    tokens: 1000
  },
  {
    email: 'test@example.com',
    password: 'test123',
    role: 'user',
    tokens: 750
  }
]

export interface DemoUser {
  email: string
  role: 'user' | 'admin'
  tokens: number
}

export function demoLogin(email: string, password: string): DemoUser | null {
  const user = DEMO_USERS.find(u => u.email === email && u.password === password)
  if (user) {
    const demoUser: DemoUser = {
      email: user.email,
      role: user.role as 'user' | 'admin',
      tokens: user.tokens
    }
    localStorage.setItem('demo-user', JSON.stringify(demoUser))
    // Trigger storage event to update other components
    window.dispatchEvent(new Event('storage'))
    return demoUser
  }
  return null
}

export function demoSignup(email: string, password: string): DemoUser {
  const newUser: DemoUser = {
    email,
    role: 'user',
    tokens: 500 // Welcome bonus
  }
  localStorage.setItem('demo-user', JSON.stringify(newUser))
  // Trigger storage event to update other components
  window.dispatchEvent(new Event('storage'))
  return newUser
}

export function demoLogout(): void {
  localStorage.removeItem('demo-user')
  // Trigger storage event to update other components
  window.dispatchEvent(new Event('storage'))
}

export function getDemoUser(): DemoUser | null {
  if (typeof window === 'undefined') return null
  
  const stored = localStorage.getItem('demo-user')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

export function isLoggedIn(): boolean {
  return getDemoUser() !== null
}
