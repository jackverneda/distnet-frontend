import { defineStore } from 'pinia'
import { userService } from '~/services/user.service'
import type { User } from '~/types/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: useState<User | null>('currentUser', () => null),
    loading: false,
    error: null as string | null,
    users: {} as Record<string, User>,
    followers: {} as Record<string, User>,
    following: {} as Record<string, User>,
  }),

  getters: {
    getUserById: (state) => (id: string) => state.users[id],
    getUserByUsername: (state) => (username: string) => 
      Object.values(state.users).find(user => user.username === username),
    isFollower: (state) => (id: string) => state.followers[id] !== undefined,
    isFollowee: (state) => (id: string) => state.following[id] !== undefined,
  },

  actions: {
    initialize() {
      console.log("Initialiting userStore")
      if (import.meta.client) {
        const user = localStorage.getItem('currentUser');
        this.currentUser = user ? JSON.parse(user) : null;
      }
      if(this.currentUser){
        this.fetchCurrentUser()
        this.fetchMyFollowers()
        this.fetchMyFollowing()
      }

    },

    async login(email: string, password: string) {
      try {
        this.loading = true
        const response = await userService.login(email, password)
        if(response.data){
          this.currentUser = response.data.user
          useCookie('authToken').value = response.data.token
          if (import.meta.client) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
          }
        } 
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
        const response = await userService.getUser(this.currentUser!.user_id)
        this.currentUser = response.data
        if (import.meta.client) {
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        }
      } catch (error) {
        this.error = error.message || 'Failed to fetch user'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchUser(id: string) {
      try {
        this.loading = true
        const response = await userService.getUser(id)
        this.users[id] = response.data
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
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      } catch (error) {
        this.error = error.message || 'Update failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async followUser(userId: string) {
      try {
        await userService.followUser(this.currentUser.user_id, userId)
        this.fetchMyFollowing()
        this.fetchCurrentUser()
      } catch (error) {
        this.error = error.message || 'Follow failed'
        throw error
      }
    },

    async fetchMyFollowers() {
      try {
        this.loading = true
        const response = await userService.getFollowers(this.currentUser!.user_id)
        response.data.forEach(user => {
          this.followers[user.user_id] = user
          this.users[user.user_id] = user
        })
      } catch (error) {
        this.error = error.message || 'Failed to fetch followers'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchMyFollowing() {
      try {
        this.loading = true
        const response = await userService.getFollowing(this.currentUser!.user_id)
        response.data.forEach(user => {
          this.following[user.user_id] = user
          this.users[user.user_id] = user
        })
      } catch (error) {
        this.error = error.message || 'Failed to fetch following'
        throw error
      } finally {
        this.loading = false
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
      localStorage.removeItem('currentUser')
    }
  }
})