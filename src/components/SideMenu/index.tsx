'use client'

import React, { useEffect, useState } from 'react'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { toggleAtom } from '@/atoms/toggle'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { channelsAtom } from '@/atoms/channels'
import { selectChannelAtom } from '@/atoms/selectChannel'
import { BsChatLeft } from 'react-icons/bs'
import { openModalAtom } from '@/atoms/openModal'
import { useOnChannelSubscription } from '@/graphql/generate'
import { Channel } from '@/domains/channel'
import { modeAtom } from '@/atoms/mode'

export const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [toggle, setToggle] = useRecoilState(toggleAtom)
  const [channels, setChannels] = useRecoilState(channelsAtom)
  const [selectChannel, setSelectChannel] = useRecoilState(selectChannelAtom)
  const setOpenModal = useSetRecoilState(openModalAtom)
  const setMode = useSetRecoilState(modeAtom)
  const { data } = useOnChannelSubscription()

  useEffect(() => {
    if (!data || !data.onChannel) return

    const newChannel = data.onChannel
    const { name } = JSON.parse(data.onChannel.value)

    setChannels((c) => [...c, new Channel(newChannel.pk, name)])
  }, [data, setChannels])

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor='hsl(var(--b2) / 1)'
      breakPoint='sm'
      toggled={toggle}
      onBackdropClick={() => setToggle((c) => !c)}
    >
      <div className='flex flex-col h-full'>
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (active)
                return {
                  '--tw-border-opacity': '1',
                  '--tw-bg-opacity': '1',
                  borderColor: 'hsl(var(--b3) / var(--tw-border-opacity))',
                  backgroundColor: 'hsl(var(--b3) / var(--tw-bg-opacity))',
                }
            },
          }}
        >
          <h1 className='p-3 text-center text-lg font-bold'>
            {"Maaaashi's ChatApp"}
          </h1>
          <div className='p-2'>
            <button
              className='btn btn-info w-full'
              onClick={() => {
                setOpenModal(true)
                setMode('chat')
              }}
            >
              {collapsed ? <AiOutlinePlusCircle /> : '部屋作成'}
            </button>
          </div>
          {channels.map((channel, index) => (
            <MenuItem
              key={index}
              icon={<BsChatLeft />}
              onClick={() => {
                setSelectChannel(channel)
                setMode('chat')
              }}
              active={selectChannel === channel}
            >
              {channel.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Sidebar>
  )
}
