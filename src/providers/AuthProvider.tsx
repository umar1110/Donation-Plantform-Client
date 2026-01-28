// components/AuthProvider.tsx
'use client'
import { useEffect } from 'react'
import { useMe } from '@/src/features/auth/hooks/useAuth'
import { useAuthStore } from '@/src/stores/auth.store'
import { useRouter, usePathname } from 'next/navigation'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, isError } = useMe()
  const { setUser, clearTokens, accessToken } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (user) {
      setUser(user)
    }
  }, [user, setUser])

  // Redirect if auth fails
  useEffect(() => {
    if (isError && accessToken && !pathname.startsWith('/login')) {
      clearTokens()
      router.push('/login')
    }
  }, [isError, accessToken, clearTokens, router, pathname])

  // Show loading on protected pages
  const isProtectedPage = pathname.startsWith('/dashboard')
  if (isLoading && isProtectedPage) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}