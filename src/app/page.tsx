'use client'

import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { SideMenu } from '@/components/SideMenu'
import { Header } from '@/components/Header'
import { Main } from '@/components/Main'
import { CreateChannel } from '@/components/CreateChannel'

export default function Home() {
  const { data: session, status } = useSession()

  useEffect(() => {
    themeChange(false)
  }, [session])

  if (status === 'loading') {
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className='loading loading-bars loading-lg'></span>
      </div>
    )
  }

  if (session) {
    return (
      <div className='flex h-screen overflow-y-hidden'>
        <SideMenu />
        <main className='flex-1 bg-base-100 flex flex-col'>
          <CreateChannel />
          <Main />
        </main>
      </div>
    )
  }

  return (
    <div className='h-screen overflow-y-hidden'>
      <Header />
      <div className='flex justify-center items-center h-full'>
        <button className='btn' onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    </div>
  )
}
