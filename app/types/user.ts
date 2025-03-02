export interface User {
  id: string
  username: string
  email: string
  name: string
  avatar?: string
  bio?: string
  followersCount: number
  followingCount: number
  createdAt: Date
}

export interface AuthResponse {
  user: User
  token: string
}
