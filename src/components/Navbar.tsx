import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  // Mock data for testing without Supabase
  const isLoggedIn = false
  const tokenBalance = 500
  const isAdmin = false

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
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                >
                  Account
                </Link>
                <Link
                  href="/purchases"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                >
                  Purchases
                </Link>

                {/* Admin Link */}
                {isAdmin && (
                  <Link
                    href="/admin/products"
                    className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                  >
                    Admin
                  </Link>
                )}

                <Button variant="ghost" size="sm">
                  Logout
                </Button>
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
