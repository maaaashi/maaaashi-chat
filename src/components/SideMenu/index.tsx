'use client'

import React, { useState } from 'react'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { MdInsertEmoticon } from 'react-icons/md'
import { useRecoilState } from 'recoil'
import { toggleAtom } from '@/atoms/toggle'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { channelsAtom } from '@/atoms/channels'

export const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [toggle, setToggle] = useRecoilState(toggleAtom)
  const [channels, setChannels] = useRecoilState(channelsAtom)

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
          className='flex-1'
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
          {channels.map((channel, index) => (
            <MenuItem key={index} icon={<MdInsertEmoticon />}>
              {channel.name}
            </MenuItem>
          ))}
        </Menu>
        <button className='btn btn-info'>
          {collapsed ? <AiOutlinePlusCircle /> : '部屋作成'}
        </button>
      </div>
    </Sidebar>
  )
}
