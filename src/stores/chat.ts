// lib/store.ts
import Chat from '@/models/Chat'
import { create } from 'zustand'

/**
 * 2) Define the Zustand state plus actions.
 */
type ChatState = {
    items: Chat[]                // the list of objects
    addItem: (item: Chat) => void
    addItems: (items: Chat[]) => void
    removeItem: (id: number) => void
    clearAll: () => void         // optional: remove all items
}

/**
 * 3) Create the store. 
 */
export const useChatStore = create<ChatState>((set) => ({
    items: [],

    addItem: (item: Chat) =>
        set((state) => ({
            items: [...state.items, item],
        })),
    
    addItems: (items: Chat[]) =>
        set(() => ({
            items: [...items],
        })),

    removeItem: (id: number) =>
        set((state) => ({
            items: state.items.filter((i) => i.id !== id),
        })),

    clearAll: () => set({ items: [] }),
}))
