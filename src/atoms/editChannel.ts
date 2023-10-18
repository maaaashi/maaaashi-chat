import { Channel } from '@/domains/channel'
import { atom } from 'recoil'

export const editChannelAtom = atom<Channel | null>({
  key: 'editChannelState',
  default: null,
})
