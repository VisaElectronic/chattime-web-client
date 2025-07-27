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
    updateGroupChannel: (item: GroupChannel) => void
    addItems: (items: GroupChannel[]) => void
    removeItem: (id: number) => void
    clearAll: () => void
    updateSelectGroupChannel: (item: GroupChannel) => void
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

    updateGroupChannel: (item: GroupChannel) =>
        set((state) => {
            return {
                items: state.items.map(gc => {
                    if (gc.key === item.key) {
                        gc = {
                            ...gc,
                            name: item.name,
                            photo: item.photo
                        }
                    }
                    return gc;
                }),
            }
        }),

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
    })),
    updateSelectGroupChannel: (item: GroupChannel) => 
        set((state) => {
            const selectedGroupChannel = state.selectedGroupChannel!;
            return {
                selectedGroupChannel: {
                    ...selectedGroupChannel,
                    name: item.name,
                    photo: item.photo
                }
            }
        }),
}))
