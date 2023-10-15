import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const { GITHUB_ID, GITHUB_SECRET, NODE_ENV } = process.env

export const options: NextAuthOptions = {
  debug: NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  providers: [
    GithubProvider({
      clientId: GITHUB_ID ?? '',
      clientSecret: GITHUB_SECRET ?? '',
    }),
  ],
}
