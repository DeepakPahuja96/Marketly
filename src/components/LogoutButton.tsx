'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { demoLogout } from '@/lib/demo-auth'

interface LogoutButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LogoutButton({ variant = 'ghost', size = 'sm', className }: LogoutButtonProps) {
  const router = useRouter()

  const handleLogout = () => {
    demoLogout()
    router.push('/')
    router.refresh()
    // Force a page reload to ensure all state is cleared
    window.location.reload()
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}
