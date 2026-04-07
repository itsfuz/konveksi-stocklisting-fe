// src/lib/actions/auth.ts
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(username :string) {

  if (!username) return { error: "Name is required" }

  const cookieStore = await cookies()
  
  // Set a simple plain-text cookie
  cookieStore.set('currentUser', username, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  redirect('/')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('currentUser')
  redirect('/login')
}