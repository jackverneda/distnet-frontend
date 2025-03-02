import { API_BASE_URL, API_ENDPOINTS } from '~/config/config'
import { api } from './api.service'
import type { IResponse } from '~/interfaces/IResponse'
import type { Post } from '~/types/post'

async function createPost(content: string): Promise<IResponse<Post>> {
  const currentUser = useUserStore().currentUser
  if (!currentUser) {
    console.log("No hay usuario")
    throw new Error('User not logged in')
  }
  console.log('currentUser', currentUser)
  const formData = new FormData()
  formData.append('content', content)
  formData.append('user_id', currentUser.user_id)
  return api.post(`${API_BASE_URL}${API_ENDPOINTS.POST}`, formData)
}

async function getPosts(page = 1, limit = 10): Promise<IResponse<Post[]>> {
  return api.get(`posts?page=${page}&limit=${limit}`)
}

async function likePost(postId: string): Promise<IResponse<Post>> {
  return api.post(`posts/${postId}/like`, {})
}

async function unlikePost(postId: string): Promise<IResponse<Post>> {
  return api.delete(`posts/${postId}/like`)
}

async function retweetPost(postId: string): Promise<IResponse<Post>> {
  return api.post(`posts/${postId}/retweet`, {})
}

async function deletePost(postId: string): Promise<IResponse<void>> {
  return api.delete(`posts/${postId}`)
}

export const postService = {
  createPost,
  getPosts,
  likePost,
  unlikePost,
  retweetPost,
  deletePost
}
