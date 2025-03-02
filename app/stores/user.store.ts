import { defineStore } from 'pinia'
import { userService } from '~/services/user.service'
import type { User } from '~/types/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as User | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        this.loading = true
        const response = await userService.login(email, password)
        this.currentUser = response.data.user
        useCookie('authToken').value = response.data.token
      } catch (error) {
        this.error = error.message || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchCurrentUser() {
      try {
        this.loading = true
        const response = await userService.getCurrentUser()
        this.currentUser = response.data
      } catch (error) {
        this.error = error.message || 'Failed to fetch user'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProfile(userData: Partial<User>) {
      try {
        this.loading = true
        const response = await userService.updateUser(userData)
        this.currentUser = response.data
      } catch (error) {
        this.error = error.message || 'Update failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async followUser(userId: string) {
      try {
        await userService.followUser(userId)
        if (this.currentUser) {
          this.currentUser.followingCount++
        }
      } catch (error) {
        this.error = error.message || 'Follow failed'
        throw error
      }
    },

    async register(userData: {
      username: string
      email: string
      password: string
      name: string
    }) {
      try {
        await userService.register(userData)
      } catch (error) {
        this.error = error.message || 'Register failed'
        throw error
      }
    },

    logout() {
      this.currentUser = null
      useCookie('authToken').value = null
    }
  }
})
