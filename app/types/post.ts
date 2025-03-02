import type { User } from '.'

export interface Post {
  id: string
  content: string
  author: User
  likesCount: number
  retweetsCount: number
  repliesCount: number
  createdAt: Date
  media?: string[]
  isLiked?: boolean
  isRetweeted?: boolean
}
