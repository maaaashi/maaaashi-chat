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
        <h3>チャンネル作成</h3>

        <form>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full max-w-xs'
          />

          <div>
            <button
              className='btn btn-outline'
              onClick={() => {
                setOpenModal(false)
              }}
            >
              キャンセル
            </button>
            <button className='btn btn-primary'>作成</button>
          </div>
        </form>
      </div>
    </div>
  )
}
