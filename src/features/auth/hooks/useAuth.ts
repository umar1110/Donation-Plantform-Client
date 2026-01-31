import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/src/stores/auth.store'
import api from '@/src/lib/axios'
import { useRouter } from 'next/navigation'
import { RegisterOrgData } from '../types'

// Login
export function useLogin() {
  const { setTokens, setUser } = useAuthStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post('/auth/login', credentials)
      return data // axios interceptor extracts data automatically
    },
    onSuccess: (data) => {
      // Save tokens
      setTokens(data.accessToken, data.refreshToken)
      setUser(data.user)
      
      // Cache user data
      queryClient.setQueryData(['user', 'me'], data.user)
      
      // Redirect
      router.push('/dashboard')
    },
  })
}

// Logout
export function useLogout() {
  const { clearTokens } = useAuthStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
        await api.post('/auth/logout')
    },
    onSuccess: () => {
      clearTokens()
      queryClient.clear() // Clear all cache
      router.push('/login')
    },
  })
}

// Get current user
export function useMe() {
  const { accessToken, refreshToken, setUser } = useAuthStore()

  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me')
      // Update user in store
      if (data) {
        setUser(data.data)
      }
      return data
    },
    // Enable if has accessToken OR refreshToken (axios will auto-refresh)
    enabled: !!accessToken || !!refreshToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  })
}

// Register Organization
export function useRegisterOrg() {
  const { setTokens, setUser } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: async (userData: RegisterOrgData) => {
      const { data } = await api.post('/orgs', userData)
      return data
    },
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken)
      setUser(data.user)
      router.push('/dashboard')
    },
  })
}