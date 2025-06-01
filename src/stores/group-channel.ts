// lib/store.ts
import GroupChannel from '@/models/GroupChannel'
import { create } from 'zustand'

/**
 * 2) Define the Zustand state plus actions.
 */
type ChannelState = {
    items: GroupChannel[]                // the list of objects
    addItem: (item: GroupChannel) => void
    addItems: (items: GroupChannel[]) => void
    removeItem: (id: number) => void
    clearAll: () => void         // optional: remove all items
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
}))
