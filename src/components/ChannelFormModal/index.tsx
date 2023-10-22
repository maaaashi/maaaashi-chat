import { editChannelAtom } from '@/atoms/editChannel'
import { openChannelModalAtom } from '@/atoms/openChannelModal'
import { usePutChannelMutation } from '@/graphql/generate'
import { useSession } from 'next-auth/react'
import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

export const ChannelFormModal: FC = () => {
  const session = useSession()
  const [editChannel, setEditChannel] = useRecoilState(editChannelAtom)
  const [openModal, setOpenModal] = useRecoilState(openChannelModalAtom)
  const [text, setText] = useState(editChannel?.name ?? '')
  const [mode, setMode] = useState<'new' | 'edit'>('new')
  const [putChannel] = usePutChannelMutation()

  useEffect(() => {
    setText(editChannel?.name ?? '')
    setMode(editChannel ? 'edit' : 'new')
  }, [editChannel])

  if (!openModal) return <></>

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const uuid = uuidv4()

    await putChannel({
      variables: {
        input: {
          pk: editChannel?.id ?? 'Channel-' + uuid,
          sk: editChannel?.id ?? 'Channel-' + uuid,
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
      <div className='bg-base-100 p-5 rounded-lg w-4/5 md:w-3/5'>
        <h3 className='font-bold text-lg'>
          チャンネル{mode === 'new' ? '作成' : '編集'}
        </h3>

        <form className='flex flex-col gap-3' onSubmit={submitHandler}>
          <div className='form-control w-full'>
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
              className='input input-bordered w-full'
            />
          </div>

          <div className='self-end'>
            <button
              className='btn btn-outline text-[12px]'
              onClick={() => {
                setEditChannel(null)
                setOpenModal(false)
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
