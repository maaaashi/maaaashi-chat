import { Chat } from '@/domains/chat'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { FC } from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { BsTrash3Fill } from 'react-icons/bs'
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

  if (session.data?.user?.name === chat.username) {
    return (
      <div className='chat chat-end'>
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
          <time className='text-xs opacity-50'>
            {formatDate(chat.createdAt)}
          </time>
        </div>
        <div className='flex gap-2'>
          {/* <div className='self-end flex'>
            <button className='btn btn-sm btn-warning'>
              <AiTwotoneEdit />
            </button>
            <button className='btn btn-sm btn-error'>
              <BsTrash3Fill />
            </button>
          </div> */}
          <div className='chat-bubble min-w-[150px] prose-sm'>
            <Markdown remarkPlugins={[remarkGfm]}>{chat.content}</Markdown>
          </div>
        </div>
      </div>
    )
  } else {
    return (
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
        <div className='chat-header'>
          {chat.username}{' '}
          <time className='text-xs opacity-50'>
            {formatDate(chat.createdAt)}
          </time>
        </div>
        <div className='chat-bubble min-w-[150px] chat-bubble-info prose-sm'>
          <Markdown remarkPlugins={[remarkGfm]}>{chat.content}</Markdown>
        </div>
      </div>
    )
  }
}
