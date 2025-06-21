import Channel from '@/models/Channel'
import { create } from 'zustand'

/**
 * 2) Define the Zustand state plus actions.
 */
type SearchContactState = {
    search_contacts: Channel[] | null,
    selected_contacts: Channel[] | [],  // the list of objects
    setSearchContacts: (items: Channel[]) => void,
    selectedContact: (item: Channel | null) => void,
    unselectedContact: (item: Channel | null) => void,
    emptySelectedContacts: () => void,
}

/**
 * 3) Create the store. 
 */
export const useSearchContactStore = create<SearchContactState>(
    (set) => ({
        search_contacts: null,
        selected_contacts: [],
        setSearchContacts: (items: Channel[]) =>
            set(() => ({
                search_contacts: items,
            })),
        selectedContact: (item: Channel | null) =>
            set((state) => ({
                selected_contacts: item ? [...state.selected_contacts, item] : [...state.selected_contacts]
            })),
        unselectedContact: (item: Channel | null) =>
            set((state) => ({
                selected_contacts: item ? state.selected_contacts.filter(c => c.id !== item.id) : state.selected_contacts,
            })),
        emptySelectedContacts: () =>
            set(() => ({
                selected_contacts: [],
            })),
    }),
)
