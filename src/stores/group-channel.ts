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
    addItem: (newItem: GroupChannel) =>
        set((state) => {
            const exists = state.items.some(item => item.key === newItem.key);

            if (exists) {
                // If the item exists, update it and move it to the front
                const updatedItems = state.items.map(item =>
                    item.key === newItem.key ? { ...item, ...newItem } : item
                );
                const itemToMove = updatedItems.find(item => item.key === newItem.key)!;
                const restOfItems = updatedItems.filter(item => item.key !== newItem.key);

                return {
                    items: [itemToMove, ...restOfItems]
                };
            } else {
                // If the item doesn't exist, just add the new item to the front
                return {
                    items: [newItem, ...state.items]
                };
            }
        }),

    updateGroupChannel: (item: GroupChannel) =>
        set((state) => {
            return {
                items: state.items.map(gc => {
                    if (gc.key === item.key) {
                        gc = {
                            ...gc,
                            name: item.name,
                            photo: item.photo,
                        }
                        if(item.unread != null) gc.unread = item.unread
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
