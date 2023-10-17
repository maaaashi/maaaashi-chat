'use client'

import React, { useEffect } from 'react'
import { Header } from '@/components/Header'
import { useListChannelsLazyQuery } from '@/graphql/generate'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { channelsAtom } from '@/atoms/channels'
import { Channel } from '@/domains/channel'
import { selectChannelAtom } from '@/atoms/selectChannel'
import { NoneChannel } from '../NoneChannel'
import { ChatArea } from '../ChatArea'
import { modeAtom } from '@/atoms/mode'
import { Profile } from '../Profile'

export const Main = () => {
  const [getChannels, { data, error, loading }] = useListChannelsLazyQuery()
  const mode = useRecoilValue(modeAtom)
  const setChannels = useSetRecoilState(channelsAtom)
  const selectChannel = useRecoilValue(selectChannelAtom)
  const mainView = () => {
    switch (mode) {
      case 'chat':
        return selectChannel ? <ChatArea /> : <NoneChannel />
      case 'profile':
        return <Profile />
    }
  }

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
      const { name, username } = JSON.parse(value)

      return new Channel(pk, name, username)
    })

    setChannels(channels)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading])

  return (
    <>
      <Header />
      <div className='flex-1 overflow-x-hidden overflow-y-auto w-full'>
        {mainView()}
      </div>
    </>
  )
}
