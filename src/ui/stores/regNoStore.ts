import { create } from "zustand";

type regNoStoreType = {
    regNo : string,
    setRegNo : (val : string) => void;
}

export const regNoStore = create<regNoStoreType>((set) => ({
    regNo : '',
    setRegNo : (val : string) => set({regNo : val})
}))