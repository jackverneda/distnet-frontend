import { API_BASE_URL, API_ENDPOINTS } from '~/config/config'
import type { IResponse } from '~/interfaces/IResponse'
import type { Post } from '~/types/post'
import type { User } from '~/types/user'
import { useApi } from './api.service'

export const postService =()=> {
  const api = useApi()

  async function createPost(content: string, currentUser: User): Promise<IResponse<Post>> {
    if (!currentUser) {
      console.log("No hay usuario")
      throw new Error('User not logged in')
    }
    console.log('currentUser', currentUser)
    const payload = {
      content: content,
      user_id: currentUser.user_id
    }
    return api.post(`${API_BASE_URL}${API_ENDPOINTS.POST}`, payload)
  }

  async function getPostsByUserId(user_id: string, page = 1, limit = 10): Promise<IResponse<Post[]>> {
    return api.get(`${API_BASE_URL}${API_ENDPOINTS.POST}/user/${user_id}`, {})
  }

  async function searchPosts(query: string): Promise<Post[]> {
    const response = await api.get(`${API_BASE_URL}${API_ENDPOINTS.POST}?query=${query}`)
    return response.data
  }

  async function getFeed(user_id: string, page = 1, limit = 10): Promise<IResponse<Post[]>> {
    if (!user_id) {
      throw new Error('User not logged in')
    }
    let params = {}
    if (page) {
      params = { page, limit }
    }
    return api.get(`${API_BASE_URL}${API_ENDPOINTS.FEED}/${user_id}`)
  }

  async function getPosts(page = 1, limit = 10): Promise<IResponse<Post[]>> {
    return api.get(`posts?page=${page}&limit=${limit}`)
  }

  async function retweetPost(postId: string): Promise<IResponse<Post>> {
    return api.post(`posts/${postId}/retweet`, {})
  }

  async function deletePost(postId: string): Promise<IResponse<void>> {
    return api.delete(`posts/${postId}`)
  }

return {
  createPost,
  getPostsByUserId,
  searchPosts,
  getPosts,
  getFeed,
  retweetPost,
  deletePost
}
}