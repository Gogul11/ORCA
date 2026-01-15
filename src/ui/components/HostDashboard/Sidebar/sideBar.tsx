import React, { useEffect, useState } from 'react';
import { LuRefreshCcw } from "react-icons/lu";
// import './SideBar.css';
//stores
import { ipStore } from '../../../stores/host/ipStore.ts';
//utils
import { getSocket } from '../../../utils/Socket';
import {currentStyle} from "../../../utils/styleChooser.ts";

interface Client {
  id: string;
  name: string;
  regNo: string;
  startTime: string;
  endTime ?: string
  status : 'active' | 'ended' | 'disconnected',
  zippedPath ?: string
}

type sideBarProps = {setClient : (val : Client) => void}

const Sidebar: React.FC<sideBarProps> = ({setClient}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'ended'>('all');


  useEffect(() => {
    const soc = getSocket(ipStore.getState().ip)
    console.log(ipStore.getState().ip)

    soc.emit('admin-join');

    soc.on('joined-studs', (joinedStudentList) => {
      console.log(joinedStudentList)
      setClients((prev) => {
        const updated = [...prev]
        joinedStudentList.forEach((s : any) => {
          const exsistingIdx = updated.findIndex(c => c.regNo === s.regNo)

          const entry = {
            id: `${s.regNo}-${Date.now()}`,
            name : s.name,
            regNo : s.regNo,
            startTime : new Date(s.startTime).toISOString(),
            endTime: s.endTime ? new Date(s.endTime).toISOString() : undefined,
            status: s.status,
          }

          if(exsistingIdx === -1){
            updated.push(entry)
          }
          else{
            updated[exsistingIdx] = {...updated[exsistingIdx], ...entry}
          }
        });
        return updated
      })
    });

  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const trimmedSearch = searchTerm.trim().toLowerCase();

  const filteredClients = clients.filter(client => {
    const matchesSearch =
      client.name.toLowerCase().includes(trimmedSearch) ||
      client.regNo.toLowerCase().includes(trimmedSearch);

    const matchesStatus =
      statusFilter === 'all' ||
      client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStudentOnClick = (client : Client) => {
    setSelectedClientId(client.regNo)
    setClient(client)
    const soc = getSocket(ipStore.getState().ip)

    soc.emit('get-student-folder', client.regNo)
    console.log('hi this is side bar onclick')
  }

  const handleRefresh = () => {
    const soc = getSocket(ipStore.getState().ip)
    console.log('refreshed')
    soc.emit('refresh-students')
  }

  return (
      <div
          className="flex flex-col w-full h-full border-r"
          style={{
              backgroundColor : currentStyle('hostDashboard.sideBar.bg'),
              borderColor : currentStyle('hostDashboard.sideBar.border')
          }}
      >
          <div className="w-full flex justify-start items-center px-4 py-2">
              <LuRefreshCcw
                  className="cursor-pointer  hover:scale-1"
                  style={{color : currentStyle('hostDashboard.sideBar.text')}}
                  size={20}
                  onClick={handleRefresh}
              />
          </div>

          <div className="w-full px-4 py-2 mb-2 flex flex-col gap-1 text-sm">
              <div className="flex justify-between">
                  <span style={{color : currentStyle('hostDashboard.sideBar.text3')}}>Connected Students:</span>
                  <span style={{color : currentStyle('hostDashboard.sideBar.text2')}}>{clients.length}</span>
              </div>
              <div className="flex justify-between">
                  <span style={{color : currentStyle('hostDashboard.sideBar.text3')}}>Active:</span>
                  <span style={{color : currentStyle('hostDashboard.sideBar.text2')}}>
                        {clients.filter((c) => c.status === "active").length}
                  </span>
              </div>
              <div className="flex justify-between">
                  <span style={{color : currentStyle('hostDashboard.sideBar.error')}}>Ended:</span>
                  <span style={{color : currentStyle('hostDashboard.sideBar.text2')}}>
                        {clients.filter((c) => c.status === "ended").length}
                  </span>
              </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center px-3 py-2">
              <input
                  type="text"
                  className="flex-1 min-w-0 px-3 py-1 rounded outline-none border text-sm"
                  style={{
                      backgroundColor : currentStyle('hostDashboard.sideBar.input.bg'),
                      color : currentStyle('hostDashboard.sideBar.input.text'),
                      borderColor : currentStyle('hostDashboard.sideBar.input.border'),
                  }}
                  placeholder="Search by name or reg no..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>

          {/* Status Filter */}
          <div className="w-full flex justify-around my-2">
              {(["all", "active", "ended"] as const).map((status) => (
                  <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className="text-sm underline-offset-4 hover:underline transition-colors duration-200 cursor-pointer"
                      style={{
                          color : statusFilter === status ?
                              currentStyle('hostDashboard.sideBar.status.active') :
                              currentStyle('hostDashboard.sideBar.status.notActive'),
                      }}
                  >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
              ))}
          </div>

          {/* Client List */}
          <div 
            className="flex-1 overflow-y-auto border-t"
            style={{borderColor : currentStyle('hostDashboard.sideBar.border')}}
          >
              {filteredClients.map((client) => (
                  <div
                      key={client.id}
                      onClick={() => handleStudentOnClick(client)}
                      className="px-3 py-2 cursor-pointer transition-colors duration-200"
                      style={{
                        backgroundColor : client.status === "disconnected" ? 
                                          currentStyle('hostDashboard.sideBar.disconnected') : selectedClientId === client.id ?
                                          currentStyle('hostDashboard.sideBar.disconnected') : '',
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = currentStyle('hostDashboard.sideBar.bg')}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 
                                          client.status === "disconnected" ? 
                                          currentStyle('hostDashboard.sideBar.disconnected') : ''}
                  >
                      <div 
                        className="text-md"
                        style={{color : currentStyle('hostDashboard.sideBar.text2')}}
                      >{client.regNo}</div>
                      <div                         
                        style={{color : currentStyle('hostDashboard.sideBar.text3')}}
                      >{client.name}</div>
                      <div 
                        className="text-xs"
                        style={{color : currentStyle('hostDashboard.sideBar.text')}}
                      >
                          Joined at: <span>{formatTime(client.startTime)}</span>
                      </div>
                      {client.endTime && (
                          <div
                            className="text-xs"
                            style={{color : currentStyle('hostDashboard.sideBar.text')}}
                          >
                              Ended at: <span>{formatTime(client.endTime)}</span>
                          </div>
                      )}
                  </div>
              ))}
          </div>
      </div>

  );
};

export default Sidebar;
