'use client'

import React, { useEffect } from 'react'
import { Header } from '@/components/Header'
import { useListChannelsLazyQuery } from '@/graphql/generate'
import { useSetRecoilState } from 'recoil'
import { channelsAtom } from '@/atoms/channels'
import { Channel } from '@/domains/channel'

export const Main = () => {
  const [getChannels, { data, error, loading }] = useListChannelsLazyQuery()
  const setChannels = useSetRecoilState(channelsAtom)

  useEffect(() => {
    getChannels({
      variables: {
        createdAt: new Date().toISOString(),
      },
    })
  }, [getChannels])

  useEffect(() => {
    if (error || loading || !data) return
    const channels = data.listData.map(({ pk, value }) => {
      const { name } = JSON.parse(value)

      return new Channel(pk, name)
    })

    setChannels(channels)
  }, [data, error, getChannels, loading, setChannels])

  return (
    <>
      <Header />
      <div className='flex-1 overflow-x-hidden overflow-y-auto w-full'>
        メイン
      </div>
    </>
  )
}
