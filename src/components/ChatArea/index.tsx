import { selectChannelAtom } from '@/atoms/selectChannel'
import { Chat } from '@/domains/chat'
import {
  useListChannelChatsQuery,
  useOnChatSubscription,
} from '@/graphql/generate'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { ChatBubble } from '../ChatBubble'
import { UserSendMessage } from '../UserSendMessage'

export const ChatArea = () => {
  const selectChannel = useRecoilValue(selectChannelAtom)!
  const [chats, setChats] = useState<Chat[]>([])
  const { data, loading, error } = useListChannelChatsQuery({
    variables: {
      channelId: selectChannel.id,
    },
  })
  const { data: onChatData } = useOnChatSubscription({
    variables: {
      pk: selectChannel.id,
    },
  })

  useEffect(() => {
    if (error || loading || !data) return

    const setChatData = data.listTypeData
      .map((d) => {
        const { content, username, imageUrl } = JSON.parse(d.value)

        return new Chat(
          d.sk,
          content,
          username,
          imageUrl,
          new Date(d.createdAt)
        )
      })
      .sort((a, b) => {
        if (a.createdAt < b.createdAt) return -1

        return 1
      })

    setChats(setChatData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading])

  useEffect(() => {
    const data = onChatData?.onChat

    if (!data) {
      return
    }
    const { content, username, imageUrl } = JSON.parse(data.value)

    const addChat = new Chat(
      data.sk,
      content,
      username,
      imageUrl,
      new Date(data.createdAt)
    )

    setChats((c) => [...c, addChat])
  }, [onChatData])

  if (loading || error) return <>loading...</>

  return (
    <div className='h-full flex flex-col'>
      <div className='flex-1'>
        {chats.map((c, index) => (
          <ChatBubble chat={c} key={index} />
        ))}
      </div>
      <UserSendMessage />
    </div>
  )
}
