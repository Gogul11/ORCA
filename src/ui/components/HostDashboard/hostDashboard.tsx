import { useState } from 'react';
import axios from 'axios';
import {GiDolphin} from "react-icons/gi";
// import './HostDashboard.css';
//types
import type { Client } from '../../types/types';
//Components
import Sidebar from './Sidebar/sideBar';
import ClientFolderView from './FolderView/clientFolder';
import Editor from './Editor/EditorHost';
//utils
import {currentStyle} from "../../utils/styleChooser.ts";
//Stores
import { roomNameStore } from '../../stores/host/roomNameStore.ts';
import { ipStore } from '../../stores/host/ipStore.ts';
import { roomIdStore } from '../../stores/host/roomIdStore.ts';

const HostDashboard: React.FC = () => {

    const [selectedClient, setSelectedClient] = useState<Client>();
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleBroadcast = async () => {
        if (!file) return alert("Please select a file first");

        const formData = new FormData();
        formData.append("file", file);

        await axios.post(`${ipStore.getState().ip}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            if(res.data.success){
                alert("File sent successfully")
            }
        }).catch((err) => {
            console.log(err)
            alert(`Something went wrong ${err.message}`)
        });
    };


  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
        <div
          className="h-[5%] w-full flex items-center justify-between px-4"
          style={{backgroundColor : currentStyle('hostDashboard.navBar.bg')}}
        >
            <div
                className="flex items-center gap-2 text-2xl "
                style={{color : currentStyle('hostDashboard.navBar.text')}}
            >
                <p>Orca</p>
                <GiDolphin/>
            </div>
            <div
                className="text-xl"
                style={{color : currentStyle('hostDashboard.navBar.text')}}
            >
                  Room name: <span
                                style={{color : currentStyle('hostDashboard.navBar.text2')}}
                            >{roomNameStore.getState().roomName}</span> &nbsp;|&nbsp;
                  Room ID: <span
                                style={{color : currentStyle('hostDashboard.navBar.text')}}
                            >{roomIdStore.getState().roomId}</span>
            </div>
            <div className="flex gap-2">
                  <input
                      type='file'
                      onChange={handleFileChange}
                      className="text-sm px-3 py-1 cursor-pointer rounded-sm"
                      style={{
                          color : currentStyle('hostDashboard.navBar.text'),
                          backgroundColor : currentStyle('hostDashboard.navBar.inputBg'),
                        }}
                  />
                  <button
                      onClick={handleBroadcast}
                      className="text-sm px-3 py-1 cursor-pointer rounded-sm"
                      style={{
                          color : currentStyle('hostDashboard.navBar.button.text'),
                          backgroundColor : currentStyle('hostDashboard.navBar.button.bg'),
                      }}
                  >Broadcast</button>
            </div>
        </div>

      {/* Main Layout */}
        <div className="flex h-[95%]">

            <div className="h-full " style={{ width: '15%' }}>
                <Sidebar setClient={setSelectedClient} />
            </div>

            <div className="h-full" style={{ width: '25%' }}>
                <ClientFolderView client={selectedClient} />
            </div>

            <div className="h-full" style={{ width: '60%' }}>
                <Editor />
            </div>
        </div>
    </div>
  );
};

export default HostDashboard;
