import { create } from "zustand";
import type { Message } from "../types/types";

interface chatStoreType {
    message : Message[]
    setMessage : (msg : Message) => void
    clearMessage : () => void
}

export const ChatStore = create<chatStoreType>((set) => ({
    message : [],
    setMessage : (msg : Message) => set((state) => ({
        message : [...state.message, msg]
    })),
    clearMessage : () => set({message : []})
}))