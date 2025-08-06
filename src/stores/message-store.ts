// lib/store.ts
import Message from '@/models/Message'
import { create } from 'zustand'

/**
 * 2) Define the Zustand state plus actions.
 */
type MessageState = {
    items: Message[]
    currentOffset: number
    addItem: (item: Message) => void
    addItems: (items: Message[]) => void
    removeItem: (id: number) => void
    clearAll: () => void
    appendMessages: (items: Message[]) => void
    setCurrentOffset: (offset: number) => void
}

/**
 * 3) Create the store. 
 */
export const useMessageStore = create<MessageState>((set) => ({
    items: [],
    currentOffset: 0,
    
    addItem: (item: Message) =>
        set((state) => {
            // otherwise, prepend the new item
            return { items: [item, ...state.items] };
        }),
    
    addItems: (items: Message[]) =>
        set(() => ({
            items: [...items],
        })),

    removeItem: (id: number) =>
        set((state) => ({
            items: state.items.filter((i) => i.id !== id),
        })),

    clearAll: () => set({ items: [] }),

    appendMessages: (items: Message[]) =>
        set((state) => ({
            items: [...state.items, ...items],
        })),

    setCurrentOffset: (offset: number) =>
        set(() => ({
            currentOffset: offset,
        })),
}))
