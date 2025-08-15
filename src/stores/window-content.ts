import { EMPTY_WINDOW } from '@/constants/window'
import { create } from 'zustand'

/**
 * 2) Define the Zustand state plus actions.
 */
type WindowContentState = {
    typeWindow: number
    resetWindow: boolean
    setTypeWindow: (typeWindow: number) => void
    setResetWindow: (resetWindow: boolean) => void
}

/**
 * 3) Create the store. 
 */
export const useWindowContentStore = create<WindowContentState>(
    (set) => ({
        typeWindow: EMPTY_WINDOW,
        resetWindow: false,
        setTypeWindow: (typeWindow: number) =>
            set(() => ({
                typeWindow: typeWindow,
                resetWindow: true
            })),
        setResetWindow: (resetWindow: boolean) =>
            set(() => ({
                resetWindow: resetWindow
            })),
    })
)
