import { useState } from "react";
import JoinRoomForm from "./joinRoom";
import HostRoomForm from "./hostRoom";
import './Room.css';
import { UserTypeStore } from "../../stores/userTypeStore";

const Room: React.FC<{tab : 'client' | 'host' }> = ({tab}) => {
  
  const [activeTab, setActiveTab] = useState<"client" | "host">(tab);

  return (
    <div className="room-container">
      <div className="tab-toggle">
        <button 
          className={activeTab === "client" ? "active" : ""} 
          onClick={() => setActiveTab("client")}
          disabled={UserTypeStore.getState().user === 'host'}
        >
          Join Room
        </button>
        <button 
          className={activeTab === "host" ? "active" : ""} 
          onClick={() => setActiveTab("host")}
          disabled={UserTypeStore.getState().user === 'client'}
        >
          Host Room
        </button>
      </div>

      <div className="form-section">
        {activeTab === "client" ? (
          <JoinRoomForm  />
        ) : (
          <HostRoomForm  />
        )}
      </div>
    </div>
  );
};

export default Room;
