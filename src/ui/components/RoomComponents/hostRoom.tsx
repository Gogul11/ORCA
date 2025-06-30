import { useState } from "react";

type Props = {
  onSubmit: (data: { name: string; regNo: string }) => void;
};

const HostRoomForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, regNo });
  };

  return (
    <form onSubmit={handleSubmit} className="room-form">
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Reg No" value={regNo} onChange={(e) => setRegNo(e.target.value)} required />
      <button type="submit">Host</button>
    </form>
  );
};

export default HostRoomForm;
