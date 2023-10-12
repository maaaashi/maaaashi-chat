import { Channel } from '@/domains/channel'
import { atom } from 'recoil'

export const channelsAtom = atom<Channel[]>({
  key: 'channelsState',
  default: [],
})
