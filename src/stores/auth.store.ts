// stores/authStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User } from '../features/users'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  setTokens: (access: string, refresh: string) => void
  clearTokens: () => void
  setUser: (user: User | null) => void
}

// Set cookie for middleware
const setCookie = (loggedIn: boolean) => {
  if (typeof document !== 'undefined') {
    document.cookie = loggedIn 
      ? 'auth=1; path=/; max-age=604800' 
      : 'auth=; path=/; max-age=0'
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setTokens: (access, refresh) => {
        setCookie(true)
        set({ accessToken: access, refreshToken: refresh })
      },

      clearTokens: () => {
        setCookie(false)
        set({ accessToken: null, refreshToken: null, user: null })
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Sync cookie on page refresh
        if (state?.refreshToken) setCookie(true)
      },
    }
  )
)