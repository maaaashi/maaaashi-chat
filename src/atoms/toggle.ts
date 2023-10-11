import { atom } from 'recoil'

export const toggleAtom = atom<boolean>({
  key: 'toggleState',
  default: false,
})
