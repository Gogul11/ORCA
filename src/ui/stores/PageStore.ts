import { create } from "zustand";

type pageStoreType = {
    isOpen : boolean,
    setOpen : (val : boolean) => void,
    page : string,
    setPage : (p : string) => void
}

export const pageStore = create<pageStoreType>((set) => ({
    isOpen : true,
    setOpen : (val : boolean) => set({isOpen : val}),
    page : "welcome",
    setPage : (page : string) => set({page : page})
}))