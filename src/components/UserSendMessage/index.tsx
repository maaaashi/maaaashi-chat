import { selectChannelAtom } from '@/atoms/selectChannel'
import {
  SendMessageMutationVariables,
  useSendMessageMutation,
} from '@/graphql/generate'
import { ChatValue } from 'DynamoDB-Module'
import { useSession } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { useRecoilValue } from 'recoil'
import { v4 as uuidv4 } from 'uuid'

export const UserSendMessage = () => {
  const [sendMessage] = useSendMessageMutation()
  const selectChannel = useRecoilValue(selectChannelAtom)!
  const [content, setContent] = useState('')
  const session = useSession()

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (!session.data?.user?.name || !session.data?.user?.image) {
      return
    }

    const value: ChatValue = {
      content,
      username: session.data?.user?.name,
      imageUrl: session.data?.user?.image,
    }

    const input: SendMessageMutationVariables = {
      input: {
        pk: selectChannel.id,
        sk: 'Chat-' + uuidv4(),
        type: 'chat',
        createdAt: new Date().toISOString(),
        value: JSON.stringify(value),
      },
    }

    sendMessage({
      variables: input,
    })

    setContent('')
  }

  return (
    <form onSubmit={submitHandler} className='bg-base-200 w-full p-4 relative'>
      <textarea
        className='textarea textarea-bordered w-full resize-none'
        placeholder='メッセージを入力'
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
        }}
      ></textarea>
      <button className='btn btn-circle btn-primary absolute top-7 right-5'>
        <AiOutlineSend />
      </button>
    </form>
  )
}
