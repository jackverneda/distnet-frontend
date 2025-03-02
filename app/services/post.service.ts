import { api } from './api.service'
import type { IResponse } from '~/interfaces/IResponse'
import type { Post } from '~/types/post'

async function createPost(content: string, media?: File[]): Promise<IResponse<Post>> {
  const formData = new FormData()
  formData.append('content', content)
  media?.forEach(file => formData.append('media', file))

  return api.post('posts', formData)
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
