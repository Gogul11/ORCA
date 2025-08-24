import { useState } from "react";
import JoinRoomForm from "./joinRoom";
import HostRoomForm from "./hostRoom";
import { UserTypeStore } from "../../stores/userTypeStore";

const Room: React.FC<{ tab: "client" | "host" }> = ({ tab }) => {
  const [activeTab, setActiveTab] = useState<"client" | "host">(tab);

  return (
    <div className="h-full w-full mx-auto flex flex-col justify-center px-4">
      <div className="flex justify-around mb-6">
        <button
          className={`px-4 py-2 rounded-sm hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
            ${
              activeTab === "client"
                ? "bg-[#0098ff]/50 text-white"
                : "bg-[#0098ff] hover:bg-[#007acc] text-black"
            }`}
          onClick={() => setActiveTab("client")}
          disabled={UserTypeStore.getState().user === "host"}
        >
          Join Room
        </button>

        <button
          className={`px-4 py-2 rounded-sm hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
            ${
              activeTab === "host"
                ? "bg-[#0098ff]/50 text-white"
                : "bg-[#0098ff] hover:bg-[#007acc] text-black"
            }`}
          onClick={() => setActiveTab("host")}
          disabled={UserTypeStore.getState().user === "client"}
        >
          Host Room
        </button>
      </div>



      <div className="p-6 rounded-md border border-white/20">
        {activeTab === "client" ? <JoinRoomForm /> : <HostRoomForm />}
      </div>
    </div>
  );
};

export default Room;
