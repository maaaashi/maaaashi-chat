import { modeAtom } from '@/atoms/mode'
import Avatar from 'boring-avatars'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { FormEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'

export const Profile = () => {
  const session = useSession()
  const [username, setUsername] = useState(session.data?.user?.name ?? '')
  const setMode = useSetRecoilState(modeAtom)

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className='flex flex-col items-center p-5'>
      <h2 className='self-start font-bold'>Edit Profile</h2>

      <form className='form-control w-full gap-3' onSubmit={submitHandler}>
        <div className='flex flex-col items-center'>
          <label className='label self-start' htmlFor='userimage'>
            <span className='label-text font-bold'>IMAGE</span>
          </label>

          {session.data?.user?.image ? (
            <Image
              onClick={() => {
                alert('comming soon')
              }}
              className='border rounded-full cursor-pointer'
              src={session.data.user.image}
              alt='image'
              width={200}
              height={200}
            />
          ) : (
            <div
              className='cursor-pointer'
              onClick={() => {
                alert('comming soon')
              }}
            >
              <Avatar
                size={200}
                name={session.data?.user?.name ?? '名無し'}
                variant='marble'
              />
            </div>
          )}

          <input type='file' className='file-input w-full max-w-xs' />
        </div>
        <div>
          <label className='label' htmlFor='username'>
            <span className='label-text font-bold'>NAME</span>
          </label>
          <input
            type='text'
            placeholder='COOL SKELETON 95'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='input input-bordered w-full'
          />
        </div>

        <div className='self-end flex gap-2'>
          <button
            className='btn btn-outline text-[12px]'
            onClick={() => {
              setMode('chat')
            }}
          >
            キャンセル
          </button>
          <button className='btn btn-primary text-[12px]'>更新</button>
        </div>
      </form>
    </div>
  )
}
