import React from 'react'
import { ChatBubble } from '../ChatBubble'
import { Chat } from '@/domains/chat'

export const NoneChannel = () => {
  const message = `
### チャンネルを自由に作成して、チャットを楽しもう
  `

  const chat = new Chat('id', message, 'まーしー', '/rep.jpg', new Date())
  return (
    <div className='p-4 flex flex-col gap-3 bg-slate-100 h-full'>
      <h2 className='font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500'>
        Welcome
      </h2>
      <p>チャンネルを自由に作成して、チャットを楽しもう</p>

      <ChatBubble chat={chat} />
    </div>
  )
}
