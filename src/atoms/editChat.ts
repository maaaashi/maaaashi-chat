import { Chat } from '@/domains/chat'
import { atom } from 'recoil'

export const editChatAtom = atom<Chat | null>({
  key: 'editChatState',
  default: null,
})
