import { useState } from "react";
import { useNavigate } from "react-router";
import { ipStore } from "../../stores/ipStore";
import { roomIdStore } from "../../stores/roomIdStore";
import { roomNameStore } from "../../stores/roomNameStore";
import { adminStore } from "../../stores/hostDirStore";

const HostRoomForm: React.FC = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [port, setPort] = useState("");
  const [ip, setIp] = useState("");
  const [staffId, setStaffId] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isHosted, setIsHosted] = useState(false);
  const navigate = useNavigate();

  const adminDir = adminStore((state) => state.dir);
  const setAdminDir = adminStore((state) => state.setDir);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Room name is required.";
    if (!roomId.trim()) newErrors.roomId = "Room ID is required.";
    if (!port.trim() || !/^\d{4,5}$/.test(port))
      newErrors.port = "Port must be 4-5 digits.";
    if (!staffId.trim()) newErrors.staffId = "Staff ID is required.";
    if (!ip.trim() || !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip))
      newErrors.Ip = "Valid IP address is required.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    ipStore.getState().setIp(`http://${ip}:${port}`);
    setErrors({});
    window.electronApi.startServer(roomId, name, port, adminDir);
    setIsHosted(true);
    roomIdStore.getState().setRoomId(roomId);
    roomNameStore.getState().setRoomName(name);
  };

  const handleStartRoom = () => {
    navigate("/hostDashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <input
          type="text"
          placeholder="Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          disabled={isHosted}
          className={`w-full rounded-md px-3 py-2 text-base bg-[#2c313c] border ${
            errors.staffId
              ? "border-red-500 bg-[#2b2f36]"
              : "border-[#3e4451] focus:border-[#61afef] focus:ring-2 focus:ring-[#61afef]/30"
          } text-[#abb2bf] outline-none`}
        />
        {errors.staffId && (
          <span className="text-red-500 text-sm">{errors.staffId}</span>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isHosted}
          className={`w-full rounded-md px-3 py-2 text-base bg-[#2c313c] border ${
            errors.name
              ? "border-red-500 bg-[#2b2f36]"
              : "border-[#3e4451] focus:border-[#61afef] focus:ring-2 focus:ring-[#61afef]/30"
          } text-[#abb2bf] outline-none`}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          disabled={isHosted}
          className={`w-full rounded-md px-3 py-2 text-base bg-[#2c313c] border ${
            errors.roomId
              ? "border-red-500 bg-[#2b2f36]"
              : "border-[#3e4451] focus:border-[#61afef] focus:ring-2 focus:ring-[#61afef]/30"
          } text-[#abb2bf] outline-none`}
        />
        {errors.roomId && (
          <span className="text-red-500 text-sm">{errors.roomId}</span>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Ip address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          disabled={isHosted}
          className={`w-full rounded-md px-3 py-2 text-base bg-[#2c313c] border ${
            errors.Ip
              ? "border-red-500 bg-[#2b2f36]"
              : "border-[#3e4451] focus:border-[#61afef] focus:ring-2 focus:ring-[#61afef]/30"
          } text-[#abb2bf] outline-none`}
        />
        {errors.Ip && (
          <span className="text-red-500 text-sm">{errors.Ip}</span>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Port Number"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          disabled={isHosted}
          className={`w-full rounded-md px-3 py-2 text-base bg-[#2c313c] border ${
            errors.port
              ? "border-red-500 bg-[#2b2f36]"
              : "border-[#3e4451] focus:border-[#61afef] focus:ring-2 focus:ring-[#61afef]/30"
          } text-[#abb2bf] outline-none`}
        />
        {errors.port && (
          <span className="text-red-500 text-sm">{errors.port}</span>
        )}
      </div>

      <div className="flex flex-col justify-center items-center gap-2 my-4">
        <div
          className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition duration-200"
          onClick={async () => {
            try {
              const dir = await window.electronApi.openDir();
              setAdminDir(dir);
            } catch (e) {
              console.error(e);
              window.alert(e);
            }
          }}
        >
          Select Directory
        </div>

        {adminDir ? (
          <p className="text-green-500 text-sm text-center">
            📁 Directory: <br /> {adminDir}
          </p>
        ) : isHosted ? (
          <p className="text-yellow-500 text-sm text-center">
            ⚠️ Please select a directory before starting the room
          </p>
        ) : null}
      </div>

      {!isHosted ? (
        <button
          type="submit"
          className="bg-[#61afef] text-[#282c34] font-bold px-4 py-2 rounded-md text-base transition hover:bg-[#528bbe]"
        >
          Host
        </button>
      ) : (
        <>
          <div className="bg-[#2c313c] border border-[#3e4451] p-4 rounded-md text-center text-[#abb2bf]">
            <h3 className="text-[#98c379] mb-2">Room Hosted Successfully!</h3>
            <p className="mb-2">
              Room ID:{" "}
              <code className="bg-[#21252b] border border-[#3e4451] px-2 py-1 rounded-md font-mono text-[#61afef]">
                {roomId}
              </code>
            </p>
            <p>
              The server is running on port :{" "}
              <code className="bg-[#21252b] border border-[#3e4451] px-2 py-1 rounded-md font-mono text-[#61afef]">
                {port}
              </code>
            </p>
          </div>

          <button
            type="button"
            onClick={handleStartRoom}
            className="bg-[#61afef] text-[#282c34] font-bold px-4 py-2 rounded-md text-base transition hover:bg-[#528bbe] mt-4"
          >
            Start Room
          </button>
        </>
      )}
    </form>
  );
};

export default HostRoomForm;
