import { openModalAtom } from '@/atoms/openModal'
import { selectChannelAtom } from '@/atoms/selectChannel'
import { Channel } from '@/domains/channel'
import { useCreateChannelMutation } from '@/graphql/generate'
import { useSession } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

export const CreateChannel = () => {
  const session = useSession()
  const [text, setText] = useState('')
  const [openModal, setOpenModal] = useRecoilState(openModalAtom)
  const [createChannel] = useCreateChannelMutation()
  const setSelectChannel = useSetRecoilState(selectChannelAtom)

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    const uuid = uuidv4()

    const response = await createChannel({
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

    if (!response.data || !response.data.createChannel) return

    const { name } = JSON.parse(response.data?.createChannel?.value)

    const newChannel = new Channel(
      response.data?.createChannel?.pk,
      name,
      session.data?.user?.name ?? ''
    )

    setSelectChannel(newChannel)
    setOpenModal(false)
  }

  if (!openModal) return <></>

  return (
    <div
      className='absolute top-0 left-0 w-screen h-screen z-20 flex justify-center items-center'
      style={{ backgroundColor: 'rgba(1,1,1,0.6' }}
    >
      <div className='bg-base-100 p-5 rounded-lg w-4/5 md:w-3/5'>
        <h3 className='font-bold text-lg'>チャンネル作成</h3>

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
