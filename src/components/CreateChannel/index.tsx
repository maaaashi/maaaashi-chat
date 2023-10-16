import { openModalAtom } from '@/atoms/openModal'
import { useCreateChannelMutation } from '@/graphql/generate'
import { useSession } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

export const CreateChannel = () => {
  const session = useSession()
  const [text, setText] = useState('')
  const [openModal, setOpenModal] = useRecoilState(openModalAtom)
  const [createChannel] = useCreateChannelMutation()

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    const uuid = uuidv4()

    await createChannel({
      variables: {
        input: {
          pk: 'Channel-' + uuid,
          sk: 'Channel-' + uuid,
          type: 'channel',
          value: JSON.stringify({
            name: text,
            username: session.data?.user?.name,
          }),
          createdAt: new Date().toISOString(),
        },
      },
    })

    setOpenModal(false)
  }

  if (!openModal) return <></>

  return (
    <div
      className='absolute top-0 left-0 w-screen h-screen z-20 flex justify-center items-center'
      style={{ backgroundColor: 'rgba(1,1,1,0.6' }}
    >
      <div className='bg-base-100 p-5 rounded-lg'>
        <h3 className='font-bold text-lg'>チャンネル作成</h3>

        <form className='flex flex-col gap-3' onSubmit={submitHandler}>
          <div className='form-control w-full max-w-xs'>
            <label className='label' htmlFor='channelName'>
              <span className='label-text'>チャンネル名</span>
            </label>
            <input
              type='text'
              id='channelName'
              value={text}
              onChange={(e) => {
                setText(e.target.value)
              }}
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
