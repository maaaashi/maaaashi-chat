import { Chat } from '@/domains/chat'
import React, { FC } from 'react'

interface Props {
  chat: Chat
}

export const ChatBubble: FC<Props> = ({ chat }) => {
  return (
    <div className='flex'>
      <div className='chat chat-start'>
        <div className='chat-image avatar'>
          <div className='w-10 rounded-full'>{chat.imageUrl}</div>
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
