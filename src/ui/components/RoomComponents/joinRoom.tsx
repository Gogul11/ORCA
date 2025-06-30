import { useState } from "react";

type Props = {
  onSubmit: (data: { roomId: string; name: string; regNo: string }) => void;
};

const JoinRoomForm: React.FC<Props> = ({ onSubmit }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ roomId, name, regNo });
  };

  return (
    <form onSubmit={handleSubmit} className="room-form">
      <input placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} required />
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Reg No" value={regNo} onChange={(e) => setRegNo(e.target.value)} required />
      <button type="submit">Join</button>
    </form>
  );
};

export default JoinRoomForm;
