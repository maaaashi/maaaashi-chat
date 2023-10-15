import { Chat } from '@/domains/chat'
import Image from 'next/image'
import React, { FC } from 'react'

interface Props {
  chat: Chat
}

export const ChatBubble: FC<Props> = ({ chat }) => {
  return (
    <div className='flex'>
      <div className='chat chat-start'>
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
        <div className='chat-header'>{chat.username}</div>
        <div className='chat-bubble'>{chat.content}</div>
      </div>
      <time className='self-end text-xs opacity-50'>
        {chat.createdAt.toISOString()}
      </time>
    </div>
  )
}
