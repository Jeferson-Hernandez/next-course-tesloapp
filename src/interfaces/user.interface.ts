export interface User {
  id: string
  name: string
  email: string
  emailVerified?: boolean
  role: string
  image?: string
}