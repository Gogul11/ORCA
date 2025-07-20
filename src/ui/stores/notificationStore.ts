import { create } from "zustand";

type notificationStoreType = {
    message : Array<string>,
    setMessage : (msg : string) => void,
    clearMessage : () => void
}

export const notificationStore = create<notificationStoreType>((set) => ({
  message : [],
  setMessage : (msg : string) => set((state) => ({
    message : [...state.message, msg]
  })),
  clearMessage : () => set({message : []})
}))