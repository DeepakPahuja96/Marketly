'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'

export function AccountPage() {
  const router = useRouter()
  const { user, isLoading, isLoggedIn } = useAuth()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login')
    }
  }, [isLoading, isLoggedIn, router])

  if (isLoading || !user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account information and preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your account details (Demo Mode)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={user.email}
              disabled
            />
            <Input
              label="Role"
              type="text"
              value={user.role}
              disabled
            />
            <div className="rounded-md bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Demo Mode:</strong> Profile editing is not available in demo mode.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Token Balance */}
        <Card>
          <CardHeader>
            <CardTitle>Token Balance</CardTitle>
            <CardDescription>Your current token balance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{user.tokens}</div>
                <div className="text-sm text-gray-600">Available Tokens</div>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              Purchase More Tokens
            </Button>
            <div className="text-xs text-gray-500 text-center">
              Token purchasing will be available with Stripe integration
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>Your account overview (Demo Data)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Total Purchases</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Tokens Spent</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">Today</div>
                <div className="text-sm text-gray-600">Member Since</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
