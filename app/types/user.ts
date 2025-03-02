export interface User {
  user_id: string
  username: string
  email: string
  name: string
  avatar?: string
  bio?: string
  followers: number
  following: number
  createdAt: Date
}

export interface AuthResponse {
  user: User
  token: string
}
