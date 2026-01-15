import { create } from "zustand";

type users = 'user' | 'host' | 'client'

interface userType{
    user : users,
    setUser : (u : users) => void,
    reset : () => void
}
export const UserTypeStore = create<userType>((set) => ({
    user : 'user',
    setUser : (u : users) => set({user : u}),
    reset : () => set({user : 'user'})
}))