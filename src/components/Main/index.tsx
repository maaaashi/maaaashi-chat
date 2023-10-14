import React, { useEffect } from 'react'
import { Header } from '@/components/Header'
import { useListChannelsQuery } from '@/graphql/generate'
import { useSetRecoilState } from 'recoil'
import { channelsAtom } from '@/atoms/channels'
import { Channel } from '@/domains/channel'

export const Main = () => {
  const { data, error, loading } = useListChannelsQuery({
    variables: {
      createdAt: new Date().toISOString(),
    },
  })
  const setChannels = useSetRecoilState(channelsAtom)

  useEffect(() => {
    alert('hoge')
    if (error || loading || !data) return

    const channels = data.listData.map((c) => {
      const { id, name } = JSON.parse(c.value)

      return new Channel(id, name)
    })

    setChannels(channels)
  }, [data, error, loading, setChannels])

  return (
    <>
      <Header />
      <div className='flex-1 overflow-x-hidden overflow-y-auto w-full'>
        メイン
      </div>
    </>
  )
}
