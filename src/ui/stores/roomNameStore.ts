import { create } from "zustand";

type roomNameStoreType = {
    roomName : string,
    setRoomName : (val : string) => void;
}

export const roomNameStore = create<roomNameStoreType>((set) => ({
    roomName : '',
    setRoomName : (val : string) => set({roomName : val})
}))