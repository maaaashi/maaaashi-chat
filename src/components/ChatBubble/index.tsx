import { Chat } from '@/domains/chat'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { FC } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  chat: Chat
}

export const ChatBubble: FC<Props> = ({ chat }) => {
  const session = useSession()

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()

    return `${month}/${day} ${hour}:${minutes}`
  }

  return (
    <div
      className={`chat ${
        session.data?.user?.name === chat.username ? 'chat-end' : 'chat-start'
      }`}
    >
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full border bottom-2 border-base-300'>
          <Image
            src={chat.imageUrl}
            alt={chat.username}
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className='chat-header'>
        {chat.username}{' '}
        <time className='text-xs opacity-50'>{formatDate(chat.createdAt)}</time>
      </div>
      <div
        className={`chat-bubble ${
          session.data?.user?.name === chat.username ? '' : 'chat-bubble-info'
        } prose-sm`}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{chat.content}</Markdown>
      </div>
    </div>
  )
}
