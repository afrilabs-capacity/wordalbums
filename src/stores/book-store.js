import create from "zustand";

export const useBookStore = create((set) => ({
  publisher: {},
  pageAdvertId: "",
  setpageAdvertId: (id) => set((state) => ({ pageAdvertId: id })),
  setPublisherInfo: (field, data) =>
    set((state) => ({ bears: state.bears + 1 })),
}));
