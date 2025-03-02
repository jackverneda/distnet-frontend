export interface User extends UserCore {
  bio?: string
  followers: number
  following: number
  createdAt: Date
}

export interface UserCore{
  user_id: string
  username: string
  email: string
  name: string
  avatar?: string
}

export interface AuthResponse {
  user: User
  token: string
}
