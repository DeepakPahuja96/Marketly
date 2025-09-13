'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { demoLogin } from '@/lib/demo-auth'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const user = demoLogin(email, password)
    if (user) {
      // Small delay to allow navbar to update before redirect
      setTimeout(() => {
        router.push('/')
        router.refresh()
      }, 100)
    } else {
      setError('Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in to your account</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access Marketly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Demo Credentials Info */}
            <div className="rounded-md bg-blue-50 p-4">
              <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
              <div className="text-xs text-blue-700 space-y-1">
                <div><strong>User:</strong> demo@marketly.com / demo123</div>
                <div><strong>Admin:</strong> admin@marketly.com / admin123</div>
                <div><strong>Test:</strong> test@example.com / test123</div>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="text-center text-sm">
              <Link
                href="/reset-password"
                className="text-gray-600 hover:text-gray-900 underline"
              >
                Forgot your password?
              </Link>
            </div>
            
            <div className="text-center text-sm">
              <span className="text-gray-600">Don&apos;t have an account? </span>
              <Link
                href="/signup"
                className="text-gray-900 hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
