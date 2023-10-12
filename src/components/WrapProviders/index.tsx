'use client'

import { SessionProvider } from 'next-auth/react'
import React, { FC, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apolloClient'

interface Props {
  children: ReactNode
}

export const WrapProviders: FC<Props> = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <SessionProvider>{children}</SessionProvider>
      </RecoilRoot>
    </ApolloProvider>
  )
}
