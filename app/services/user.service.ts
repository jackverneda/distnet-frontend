import { api } from './api.service'
import { API_BASE_URL, API_ENDPOINTS } from '~/config/config'
import type { IResponse } from '~/interfaces/IResponse'
import type { User, AuthResponse } from '~/types/user'

async function login(email: string, password: string): Promise<IResponse<AuthResponse>> {
  return api.post(API_BASE_URL + API_ENDPOINTS.LOGIN, { email, password })
}

async function register(userData: {
  username: string
  email: string
  password: string
  name: string
}): Promise<IResponse<AuthResponse>> {
  return api.post(API_BASE_URL + API_ENDPOINTS.REGISTER, userData)
}

async function getUser(id: string): Promise<IResponse<User>> {
  return api.get(`${API_BASE_URL}${API_ENDPOINTS.USER}/${id}`)
}

async function updateUser(userData: Partial<User>): Promise<IResponse<User>> {
  return api.put('users/me', userData)
}

async function followUser(userId: string): Promise<IResponse<void>> {
  return api.post(`users/${userId}/follow`, {})
}

async function unfollowUser(userId: string): Promise<IResponse<void>> {
  return api.delete(`users/${userId}/follow`)
}

export const userService = {
  login,
  register,
  getUser,
  updateUser,
  followUser,
  unfollowUser
}
