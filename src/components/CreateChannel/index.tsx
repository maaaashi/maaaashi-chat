import { openModalAtom } from '@/atoms/openModal'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

export const CreateChannel = () => {
  const [text, setText] = useState('')
  const [openModal, setOpenModal] = useRecoilState(openModalAtom)

  if (!openModal) return <></>

  return (
    <div
      className='absolute top-0 left-0 w-screen h-screen z-20 flex justify-center items-center'
      style={{ backgroundColor: 'rgba(1,1,1,0.6' }}
    >
      <div className='bg-base-100 p-5 rounded-lg'>
        <h3 className='font-bold text-lg'>チャンネル作成</h3>

        <form className='flex flex-col gap-3'>
          <div className='form-control w-full max-w-xs'>
            <label className='label' htmlFor='channelName'>
              <span className='label-text'>チャンネル名</span>
            </label>
            <input
              type='text'
              id='channelName'
              placeholder='○○について'
              className='input input-bordered w-full max-w-xs'
            />
          </div>

          <div className='self-end'>
            <button
              className='btn btn-outline text-[12px]'
              onClick={() => {
                setOpenModal(false)
              }}
            >
              キャンセル
            </button>
            <button className='btn btn-primary text-[12px]'>作成</button>
          </div>
        </form>
      </div>
    </div>
  )
}
