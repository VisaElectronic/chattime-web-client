// lib/store.ts
import Message from '@/models/Message'
import { create } from 'zustand'

/**
 * 2) Define the Zustand state plus actions.
 */
type MessageState = {
    items: Message[]
    addItem: (item: Message) => void
    addItems: (items: Message[]) => void
    removeItem: (id: number) => void
    clearAll: () => void         // optional: remove all items
}

/**
 * 3) Create the store. 
 */
export const useMessageStore = create<MessageState>((set) => ({
    items: [],
    
    addItem: (item: Message) =>
        set((state) => ({
            items: [item, ...state.items],
        })),
    
    addItems: (items: Message[]) =>
        set(() => ({
            items: [...items],
        })),

    removeItem: (id: number) =>
        set((state) => ({
            items: state.items.filter((i) => i.id !== id),
        })),

    clearAll: () => set({ items: [] }),
}))
