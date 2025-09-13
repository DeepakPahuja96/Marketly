import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
// import { resetPassword } from '@/lib/actions/auth'

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string }
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Reset your password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we&apos;ll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {searchParams.error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{searchParams.error}</p>
              </div>
            )}
            {searchParams.message && (
              <div className="rounded-md bg-green-50 p-4">
                <p className="text-sm text-green-800">{searchParams.message}</p>
              </div>
            )}
            
            <form className="space-y-4">
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
            
            <div className="text-center text-sm">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 underline"
              >
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
