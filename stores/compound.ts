import { StateCreator } from 'zustand'

export interface StoreInterface3 {
  inUser: boolean
  updateinUser: (inUser: boolean) => void
  pKey: Uint8Array| string | null | undefined
  pvKey: Uint8Array | string | null | undefined
  updatepKey: (pKey: Uint8Array | string | null | undefined) => void
  updatepvKey: (pvKey: Uint8Array | string | null | undefined) => void
}

export const createcompound: StateCreator<StoreInterface3> = (set, get) => ({
    inUser: false,
    updateinUser: (inUser) => {set({inUser: inUser},)},
    pKey: null,
    updatepKey: (pKey) => {set({pKey: pKey},)},
    pvKey: null,
    updatepvKey: (pvKey) => {set({pvKey: pvKey},)},
  })

