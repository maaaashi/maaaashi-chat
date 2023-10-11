'use client'

import { SessionProvider } from 'next-auth/react'
import React, { FC, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

interface Props {
  children: ReactNode
}

export const WrapProviders: FC<Props> = ({ children }) => {
  return (
    <RecoilRoot>
      <SessionProvider>{children}</SessionProvider>
    </RecoilRoot>
  )
}
