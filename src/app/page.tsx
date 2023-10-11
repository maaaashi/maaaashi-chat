'use client'

import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { SideMenu } from '@/components/SideMenu'
import { Header } from '@/components/Header'

export default function Home() {
  const { data: session } = useSession()

  useEffect(() => {
    themeChange(false)
  }, [session])

  if (session) {
    return (
      <div className='flex h-screen overflow-y-hidden'>
        <SideMenu />
        <main className='flex-1 bg-base-100 flex flex-col'>
          <Header />
          <div className='flex-1 overflow-x-hidden overflow-y-auto w-full'>
            メイン
          </div>
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
