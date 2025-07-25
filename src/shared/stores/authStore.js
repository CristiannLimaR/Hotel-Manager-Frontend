import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado
      user: null,
      token: null,
      isAuthenticated: false,

      // Acciones
      login: (userData, token) => {
        set({
          user: userData,
          token,
          isAuthenticated: true
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),

      // Selectores
      getUser: () => get().user,
      getToken: () => get().token,
      getIsAuthenticated: () => get().isAuthenticated,
      getRole: () => get().user?.role
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

export default useAuthStore 