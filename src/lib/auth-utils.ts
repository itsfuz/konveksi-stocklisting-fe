// src/lib/auth-utils.ts
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode' // npm install jwt-decode

export async function getSessionUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session_token')?.value

  if (!token) return null

  try {
    // Decode the token payload
    const decoded: { username: string; role: string } = jwtDecode(token)
    return decoded
  } catch (error) {
    return null
  }
}