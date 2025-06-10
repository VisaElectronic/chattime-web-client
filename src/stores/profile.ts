import User from '@/models/User'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * 2) Define the Zustand state plus actions.
 */
type UserState = {
    item: User | null               // the list of objects
    setUser: (item: User) => void
    resetUser: (id: number) => void
}

/**
 * 3) Create the store. 
 */
export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            item: null,

            setUser: (item: User) =>
                set(() => ({
                    item: item,
                })),

            resetUser: () =>
                set(() => ({
                    item: null,
                })),
        }),
        {
            name: "user-storage",            // key in localStorage
            storage: createJSONStorage(() => localStorage)
        }
    )
)
