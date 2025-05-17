import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      // Estado
      user: null,
      token: null,
      isAuthenticated: false,

      // Acciones
      login: (userData, token) => set({
        user: userData,
        token,
        isAuthenticated: true
      }),

      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false
      }),

      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),

      // Selectores
      getUser: () => useAuthStore.getState().user,
      getToken: () => useAuthStore.getState().token,
      getIsAuthenticated: () => useAuthStore.getState().isAuthenticated
    }),
    {
      name: 'auth-storage', // nombre para el almacenamiento persistente
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

export default useAuthStore 