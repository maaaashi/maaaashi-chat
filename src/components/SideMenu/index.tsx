'use client'

import React, { FC, MouseEventHandler, useEffect, useState } from 'react'
import {
  Menu,
  MenuItem,
  MenuItemStyles,
  Sidebar,
  menuClasses,
} from 'react-pro-sidebar'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { toggleAtom } from '@/atoms/toggle'
import { AiOutlinePlusCircle, AiTwotoneEdit } from 'react-icons/ai'
import { channelsAtom } from '@/atoms/channels'
import { selectChannelAtom } from '@/atoms/selectChannel'
import { BsChatLeft, BsTrash3Fill } from 'react-icons/bs'
import { openChannelModalAtom } from '@/atoms/openChannelModal'
import {
  useDeleteChannelMutation,
  useOnDeleteChannelSubscription,
  useOnPutChannelSubscription,
} from '@/graphql/generate'
import { Channel } from '@/domains/channel'
import { modeAtom } from '@/atoms/mode'
import { useSession } from 'next-auth/react'
import { Confirm } from '@/lib/sweetAlert2'
import { editChannelAtom } from '@/atoms/editChannel'

const Suffix: FC<{ channel: Channel }> = ({ channel }) => {
  const setEditChannel = useSetRecoilState(editChannelAtom)
  const setOpenModal = useSetRecoilState(openChannelModalAtom)
  const [deleteChannel] = useDeleteChannelMutation()

  const editHandler: MouseEventHandler = async (e) => {
    e.stopPropagation()
    setEditChannel(channel)
    setOpenModal(true)
  }

  const deleteHandler: MouseEventHandler = async (e) => {
    e.stopPropagation()
    const confirm = await Confirm.fire({
      title: `${channel.name}を削除します。`,
      text: 'よろしいでしょうか？',
    })

    if (!confirm.isConfirmed) return

    deleteChannel({
      variables: {
        pk: channel.id,
        sk: channel.id,
      },
    })
  }

  const session = useSession()
  if (channel.username === session.data?.user?.name) {
    return (
      <div className='flex'>
        <button className='btn btn-sm btn-warning' onClick={editHandler}>
          <AiTwotoneEdit />
        </button>
        <button className='btn btn-sm btn-error' onClick={deleteHandler}>
          <BsTrash3Fill />
        </button>
      </div>
    )
  }
  return <></>
}

export const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [toggle, setToggle] = useRecoilState(toggleAtom)
  const [channels, setChannels] = useRecoilState(channelsAtom)
  const [selectChannel, setSelectChannel] = useRecoilState(selectChannelAtom)
  const setOpenModal = useSetRecoilState(openChannelModalAtom)
  const setMode = useSetRecoilState(modeAtom)
  const { data: onPutChannelData } = useOnPutChannelSubscription()
  const { data: onDeleteChannelData } = useOnDeleteChannelSubscription()

  useEffect(() => {
    if (!onPutChannelData || !onPutChannelData.onPutChannel) return

    const targetChannel = onPutChannelData.onPutChannel
    const { name, username } = JSON.parse(onPutChannelData.onPutChannel.value)

    const targetIndex = channels.findIndex((c) => c.id === targetChannel.pk)

    if (targetIndex === -1) {
      setChannels((c) => [...c, new Channel(targetChannel.pk, name, username)])
    } else {
      setChannels((c) =>
        c.map((channel, index) => {
          if (index === targetIndex) {
            return new Channel(targetChannel.pk, name, username)
          }
          return channel
        })
      )
    }
  }, [channels, onPutChannelData, setChannels])

  useEffect(() => {
    if (!onDeleteChannelData || !onDeleteChannelData.onDeleteChannel) return

    const deleteChannel = onDeleteChannelData.onDeleteChannel

    setChannels((c) => c.filter((channel) => channel.id !== deleteChannel.pk))
  }, [onDeleteChannelData, setChannels])

  const theme = 'dark'

  const themes = {
    sidebar: {
      backgroundColor: '#334155',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  }

  // hex to rgba converter
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: themes.menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes.menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0 ? hexToRgba(themes.menu.menuContent, 1) : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes.menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes.menu.hover.backgroundColor, 1),
        color: themes.menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  }

  return (
    <Sidebar
      collapsed={collapsed}
      breakPoint='sm'
      toggled={toggle}
      onBackdropClick={() => setToggle((c) => !c)}
      backgroundColor={hexToRgba(themes.sidebar.backgroundColor, 1)}
      rootStyles={{
        color: themes.sidebar.color,
      }}
    >
      <div className='flex flex-col h-full'>
        <Menu menuItemStyles={menuItemStyles}>
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
            <div className='tooltip w-full' data-tip={channel.name} key={index}>
              <MenuItem
                icon={<BsChatLeft />}
                onClick={(e) => {
                  setSelectChannel(channel)
                  setMode('chat')
                }}
                active={selectChannel === channel}
                suffix={<Suffix channel={channel} />}
              >
                {channel.name}
              </MenuItem>
            </div>
          ))}
        </Menu>
      </div>
    </Sidebar>
  )
}
