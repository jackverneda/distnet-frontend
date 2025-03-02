import { API_BASE_URL, API_ENDPOINTS } from '~/config/config'
import { api } from './api.service'
import type { IResponse } from '~/interfaces/IResponse'
import type { Post } from '~/types/post'
import type { User } from '~/types/user'

async function getFeed(page = 1, limit = 10): Promise<IResponse<Post[]>> {
  const currentUser = getCurrentUser()
  if (!currentUser) {
    throw new Error('User not logged in')
  }
  let params = {}
  if (page) {
    params = { page, limit }
  }
  return api.get(`${API_BASE_URL}${API_ENDPOINTS.FEED}/${currentUser.user_id}`)
}

function getCurrentUser(): User | null {
  return useUserStore().currentUser
}

export const feedService = { getFeed }
