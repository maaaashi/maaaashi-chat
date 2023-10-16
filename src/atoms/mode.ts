import { atom } from 'recoil'

export const modeAtom = atom<'chat' | 'profile'>({
  key: 'modeState',
  default: 'chat',
})
