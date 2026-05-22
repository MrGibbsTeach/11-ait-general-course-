import NextAuth from 'next-auth'
import PostgresAdapter from '@auth/pg-adapter'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { pool } from '@/lib/db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const result = await pool.query(
          'SELECT id, email, name, full_name, role, avatar_url, password_hash FROM users WHERE email = $1',
          [credentials.email]
        )
        const user = result.rows[0]
        if (!user?.password_hash) return null

        const isValid = await bcrypt.compare(credentials.password as string, user.password_hash)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.full_name ?? user.name,
          role: user.role,
          image: user.avatar_url,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role
      }
      return token
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})
