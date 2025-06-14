// lib/store.ts
import GroupChannel from '@/models/GroupChannel'
import { create } from 'zustand'

/**
 * 2) Define the Zustand state plus actions.
 */
type ChannelState = {
    items: GroupChannel[]
    selectedGroupChannel?: GroupChannel
    addItem: (item: GroupChannel) => void
    addItems: (items: GroupChannel[]) => void
    removeItem: (id: number) => void
    clearAll: () => void
    selectGroupChannel: (item: GroupChannel) => void
}

/**
 * 3) Create the store. 
 */
export const useGroupChannelStore = create<ChannelState>((set) => ({
    items: [],
    addItem: (item: GroupChannel) =>
        set((state) => ({
            items: [...state.items, item],
        })),
    
    addItems: (items: GroupChannel[]) =>
        set(() => ({
            items: [...items],
        })),

    removeItem: (id: number) =>
        set((state) => ({
            items: state.items.filter((i) => i.id !== id),
        })),

    clearAll: () => set({ items: [] }),
    selectGroupChannel: (item: GroupChannel) => set(() => ({
        selectedGroupChannel: item
    }))
}))
