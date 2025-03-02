import type { User } from '.'

export interface Post {
  post_id: string
  content: string
  user_id: string
  author: User
  createdAt: Date
}

export interface PostEnvelope {
  post: Post
  isRepost: boolean
  user_id: string
  author: User
}
