import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { pool } from '@/lib/db'
import { authConfig } from '@/auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    // Students: username only, no password
    Credentials({
      id: 'student',
      credentials: {
        username: { label: 'Username', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.username) return null

        const result = await pool.query<{
          id: string
          username: string
          full_name: string
          role: string
          avatar_url: string | null
          class_code: string | null
        }>(
          `SELECT u.id, u.username, u.full_name, u.role, u.avatar_url, c.class_code
           FROM users u
           LEFT JOIN class_enrollments ce ON ce.student_id = u.id
           LEFT JOIN classes c ON c.id = ce.class_id
           WHERE u.username = $1 AND u.role = 'student'
           LIMIT 1`,
          [credentials.username]
        )
        const user = result.rows[0]
        if (!user) return null

        return {
          id: user.id,
          name: user.full_name,
          fullName: user.full_name,
          role: user.role,
          image: user.avatar_url,
          classCode: user.class_code,
        }
      },
    }),

    // Teachers: PIN-based access
    Credentials({
      id: 'teacher',
      credentials: {
        pin: { label: 'PIN', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.pin) return null

        const result = await pool.query<{
          id: string
          full_name: string
          role: string
          avatar_url: string | null
          pin_hash: string
        }>(
          `SELECT id, full_name, role, avatar_url, pin_hash
           FROM users WHERE role = 'teacher' AND pin_hash IS NOT NULL`
        )

        for (const user of result.rows) {
          const match = await bcrypt.compare(credentials.pin as string, user.pin_hash)
          if (match) {
            return {
              id: user.id,
              name: user.full_name,
              fullName: user.full_name,
              role: user.role,
              image: user.avatar_url,
              classCode: null,
            }
          }
        }

        return null
      },
    }),
  ],
})
