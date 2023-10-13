import React, { useEffect } from 'react'
import { Header } from '@/components/Header'
import { useListChannelsQuery } from '@/graphql/generate'
import { useSetRecoilState } from 'recoil'
import { channelsAtom } from '@/atoms/channels'
import { Channel } from '@/domains/channel'

export const Main = () => {
  const listChannelsResult = useListChannelsQuery({
    variables: {
      pk: 'Channel',
    },
  })
  const setChannels = useSetRecoilState(channelsAtom)

  useEffect(() => {
    const { data, error, loading } = listChannelsResult
    if (error || loading || !data) return

    const channels = data.listChannels.map((c) => new Channel(c.id, c.name))

    setChannels(channels)
  }, [listChannelsResult, setChannels])

  return (
    <>
      <Header />
      <div className='flex-1 overflow-x-hidden overflow-y-auto w-full'>
        メイン
      </div>
    </>
  )
}
