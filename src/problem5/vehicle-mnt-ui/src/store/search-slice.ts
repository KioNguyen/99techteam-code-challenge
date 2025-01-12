import { StateCreator } from "zustand";

export interface SearchSlice {
  searchKey: string;
  setSearchKey: (searchKey: string) => void;
}

export const searchSlice: StateCreator<SearchSlice> = (set) => {
  const setSearchKey = (searchKey: string) => {
    set(searchKey ? { searchKey } : { searchKey: "" });
  };

  return {
    searchKey: "",
    setSearchKey,
  };
};
