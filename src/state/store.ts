import { create } from "zustand";

interface StoreState {
  searchTerm: string,
  setSearchTerm: (searchTerm: string) => void
}

const useStore = create<StoreState>()(set => ({
  searchTerm: '',
  setSearchTerm: searchTerm => set(() => ({ searchTerm }))
}));

export default useStore;