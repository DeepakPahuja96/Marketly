'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { LogoutButton } from '@/components/LogoutButton'
import { useAuth } from '@/hooks/useAuth'

export function NavbarClient() {
  const pathname = usePathname()
  const { user, isLoading, isLoggedIn, isAdmin } = useAuth()

  // Don't render until loaded to avoid hydration mismatch
  if (isLoading) {
    return (
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Marketly
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  const tokenBalance = user?.tokens || 0

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Marketly
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Token Balance */}
                <div className="flex items-center space-x-2 rounded-md bg-gray-100 px-3 py-1">
                  <span className="text-sm font-medium text-gray-700">Tokens:</span>
                  <span className="text-sm font-bold text-gray-900">{tokenBalance}</span>
                </div>

                {/* Navigation Links */}
                <Link
                  href="/account"
                  className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                    pathname === '/account' ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  Account
                </Link>
                <Link
                  href="/purchases"
                  className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                    pathname === '/purchases' ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  Purchases
                </Link>

                {/* Admin Link */}
                {isAdmin && (
                  <Link
                    href="/admin/products"
                    className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                      pathname.startsWith('/admin') ? 'text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    Admin
                  </Link>
                )}

                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                >
                  Login
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
