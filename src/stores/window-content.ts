import { EMPTY_WINDOW } from '@/constants/window'
import { create } from 'zustand'

/**
 * 2) Define the Zustand state plus actions.
 */
type WindowContentState = {
    typeWindow: number               // the list of objects
    setTypeWindow: (typeWindow: number) => void
}

/**
 * 3) Create the store. 
 */
export const useWindowContentStore = create<WindowContentState>(
    (set) => ({
        typeWindow: EMPTY_WINDOW,

        setTypeWindow: (typeWindow: number) =>
            set(() => ({
                typeWindow: typeWindow,
            })),
    })
)
