'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineCheck } from 'react-icons/ai'
import { BsPalette2 } from 'react-icons/bs'
import Avatar from 'boring-avatars'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { toggleAtom } from '@/atoms/toggle'
import { selectChannelAtom } from '@/atoms/selectChannel'
import { modeAtom } from '@/atoms/mode'

export const Header = () => {
  const { data: session } = useSession()
  const setToggle = useSetRecoilState(toggleAtom)
  const setMode = useSetRecoilState(modeAtom)
  const [selectChannel, setSelectChannel] = useRecoilState(selectChannelAtom)

  const profile = () => {
    if (!session) {
      return <></>
    }

    return (
      <div className='flex items-center gap-3'>
        <div>
          <label
            tabIndex={1}
            className='btn btn-ghost btn-circle avatar online'
          >
            {session.user?.image ? (
              <div className='w-10 rounded-full'>
                <Image
                  src={session.user?.image ?? ''}
                  alt={session.user?.name ?? ''}
                  width={20}
                  height={20}
                />
              </div>
            ) : (
              <Avatar
                name={session.user?.name ?? session.user?.email ?? '名無し'}
                variant='sunset'
              />
            )}
          </label>
          <ul
            tabIndex={1}
            className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box min-w-[208px]'
          >
            <li className='p-3 whitespace-nowrap'>
              {`${session.user?.name ?? session.user?.email ?? '名無し'}さん`}
            </li>
            <li>
              <a
                className='justify-between'
                onClick={() => {
                  setMode('profile')
                  setSelectChannel(null)
                }}
              >
                Edit Profile
              </a>
            </li>
            <li>
              <a onClick={() => signOut()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className='navbar bg-slate-300 justify-between px-4'>
      <div>
        <button
          onClick={() => setToggle((c) => !c)}
          className='btn custom:hidden'
        >
          <GiHamburgerMenu />
        </button>
        <h1 className='p-3 text-2xl font-bold justify-center items-center hidden md:flex'>
          {"Maaaashi's Chat"}
        </h1>
        <h2 className='font-bold'>{selectChannel?.name}</h2>
      </div>
      <div className='gap-2'>
        <div className='dropdown dropdown-end flex'>{profile()}</div>
        {/* <div className='dropdown dropdown-end flex'>
          <div>
            <label
              tabIndex={0}
              className='btn btn-outline flex-col justify-around'
            >
              <BsPalette2 size='15px' />
              THEME
            </label>
            <ul
              tabIndex={0}
              className='dropdown-content menu rounded-box h-[70vh] max-h-96 w-fit flex-nowrap overflow-y-auto bg-base-300 p-2 shadow z-50'
            >
              {listTheme.map((theme, index) => (
                <li
                  key={index}
                  data-theme={theme}
                  className='my-1 bg-transparent'
                >
                  <button
                    className='flex justify-between rounded-lg bg-base-100'
                    data-set-theme={theme}
                    data-act-class='[&_svg]:visible'
                  >
                    <AiOutlineCheck className='check invisible' />
                    {theme.toUpperCase()}
                    <div className='flex gap-1'>
                      <span className='inline-block h-5 w-3 rounded-full bg-primary'></span>
                      <span className='inline-block h-5 w-3 rounded-full bg-secondary'></span>
                      <span className='inline-block h-5 w-3 rounded-full bg-success'></span>
                      <span className='inline-block h-5 w-3 rounded-full bg-neutral'></span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  )
}
