import { Channel } from '@/domains/channel'
import { atom } from 'recoil'

export const selectChannelAtom = atom<Channel | null>({
  key: 'selectChannelState',
  default: null,
})
