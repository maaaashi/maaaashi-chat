import { selectChannelAtom } from '@/atoms/selectChannel'
import { Chat } from '@/domains/chat'
import { useListChannelChatsQuery } from '@/graphql/generate'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export const ChatArea = () => {
  const selectChannel = useRecoilValue(selectChannelAtom)!
  const [chats, setChats] = useState<Chat[]>([])
  const { data, loading, error } = useListChannelChatsQuery({
    variables: {
      channelId: selectChannel.id,
    },
  })

  useEffect(() => {
    if (error || loading || !data) return

    console.log(data.listTypeData)

    const setChatData = data.listTypeData
      .map((d) => {
        const { content, username } = JSON.parse(d.value)

        return new Chat(d.sk, content, username, new Date(d.createdAt))
      })
      .sort((a, b) => {
        if (a.createdAt < b.createdAt) return -1

        return 1
      })

    setChats(setChatData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading])

  if (loading || error) return <>loading...</>

  return (
    <div>
      {chats.map((c, index) => (
        <div key={index}>
          {c.id}: {c.createdAt.toISOString()}
        </div>
      ))}
    </div>
  )
}
