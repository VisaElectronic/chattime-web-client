// lib/store.ts
import { create } from 'zustand'

/**
 * We’re defining a simple counter store with:
 *  - count: the current value
 *  - increment, decrement, reset: basic local actions
 *  - setCount: a “wildcard setter” which we can call from STOMP callbacks
 */
type CounterState = {
  count: number

  increment: () => void
  decrement: () => void
  reset: () => void

  /**
   * Allows us to “overwrite” the count from anywhere (e.g. from STOMP).
   * We’ll call this inside our STOMP onMessage handler.
   */
  setCount: (newCount: number) => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,

  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),

  // “wildcard setter” – sets count exactly to whatever the server sends
  setCount: (newCount: number) => set({ count: newCount }),
}))
