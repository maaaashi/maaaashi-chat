'use client'

import React, { useState } from 'react'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { toggleAtom } from '@/atoms/toggle'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { channelsAtom } from '@/atoms/channels'
import { selectChannelAtom } from '@/atoms/selectChannel'
import { BsChatLeft } from 'react-icons/bs'

export const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [toggle, setToggle] = useRecoilState(toggleAtom)
  const channels = useRecoilValue(channelsAtom)
  const [selectChannel, setSelectChannel] = useRecoilState(selectChannelAtom)

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed)
  }

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
              // only apply styles on first level elements of the tree
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
          {collapsed ? (
            <MenuItem
              onClick={handleCollapsedChange}
              icon={<FiChevronsRight />}
            />
          ) : (
            <MenuItem
              onClick={handleCollapsedChange}
              suffix={<FiChevronsLeft />}
            />
          )}
          <div className='p-2'>
            <button className='btn btn-info w-full'>
              {collapsed ? <AiOutlinePlusCircle /> : '部屋作成'}
            </button>
          </div>
          {channels.map((channel, index) => (
            <MenuItem
              key={index}
              icon={<BsChatLeft />}
              onClick={() => {
                setSelectChannel(channel)
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
