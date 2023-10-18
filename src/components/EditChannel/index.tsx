import { editChannelAtom } from '@/atoms/editChannel'
import { useUpdateChannelMutation } from '@/graphql/generate'
import { useSession } from 'next-auth/react'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export const EditChannel: FC = () => {
  const session = useSession()
  const [editChannel, setEditChannel] = useRecoilState(editChannelAtom)
  const [text, setText] = useState(editChannel?.name ?? '')
  const [updateChannel] = useUpdateChannelMutation()

  useEffect(() => {
    setText(editChannel?.name ?? '')
  }, [editChannel])

  if (!editChannel) return <></>

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    await updateChannel({
      variables: {
        input: {
          pk: editChannel.id,
          sk: editChannel.id,
          type: 'channel',
          value: JSON.stringify({
            name: text,
            username: session.data?.user?.name,
          }),
          createdAt: new Date().toISOString(),
        },
      },
    })

    setEditChannel(null)
  }

  return (
    <div
      className='absolute top-0 left-0 w-screen h-screen z-20 flex justify-center items-center'
      style={{ backgroundColor: 'rgba(1,1,1,0.6' }}
    >
      <div className='bg-base-100 p-5 rounded-lg'>
        <h3 className='font-bold text-lg'>チャンネル更新</h3>

        {editChannel.name}
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
                setEditChannel(null)
              }}
            >
              キャンセル
            </button>
            <button className='btn btn-primary text-[12px]' type='submit'>
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
