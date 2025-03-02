import { useApi } from './api.service'
import { API_BASE_URL, API_ENDPOINTS } from '~/config/config'
import type { IResponse } from '~/interfaces/IResponse'
import type { User, AuthResponse, UserCore } from '~/types/user'

export const userService = () => {
const api = useApi()
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

async function getFollowers(id: string): Promise<IResponse<User[]>> {
  return api.get(`${API_BASE_URL}${API_ENDPOINTS.FOLLOWER}/${id}`)
}

async function getFollowing(id: string): Promise<IResponse<User[]>> {
  return api.get(`${API_BASE_URL}${API_ENDPOINTS.FOLLOWING}/${id}`)
}

async function searchUsers(query: string): Promise<IResponse<UserCore[]>> {
  return api.get(`${API_BASE_URL}${API_ENDPOINTS.USER}?query=${query}`) 
}

async function updateUser(userData: Partial<User>): Promise<IResponse<User>> {
  return api.put('users/me', userData)
}

async function followUser(userId: string, followee_id): Promise<IResponse<void>> {
  return api.post(`${API_BASE_URL}${API_ENDPOINTS.FOLLOW}/${userId}`, {user_id: userId, followee_id: followee_id})
}

async function unfollowUser(userId: string): Promise<IResponse<void>> {
  return api.delete(`users/${userId}/follow`)
}

return  {
  login,
  register,
  getUser,
  getFollowers,
  getFollowing,
  searchUsers,
  updateUser,
  followUser,
  unfollowUser
}
}
