import { useState } from 'react';
import './openedTerm.css';

interface TerminalSession {
  id: string;
  name: string;
  cwd: string;
}

const dummyTerminals: TerminalSession[] = [
  { id: '1', name: 'bash', cwd: '/home/user/project' },
  { id: '2', name: 'zsh', cwd: '/home/user/project/src' },
  { id: '3', name: 'powershell', cwd: 'C:\\dev\\tools' },
];

const OpenedTerminals = () => {
  const [terminals, setTerminals] = useState<TerminalSession[]>(dummyTerminals);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setActiveId(id);
    console.log('Switched to terminal:', id);
  };

  const handleClose = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setTerminals(terminals.filter(t => t.id !== id));
    if (activeId === id) setActiveId(null);
  };

  return (
    <div className="opened-terminals-container">
      
      <div className="terminals-list">
        {terminals.map(terminal => (
          <div
            key={terminal.id}
            className={`terminal-entry ${activeId === terminal.id ? 'active' : ''}`}
            onClick={() => handleSelect(terminal.id)}
          >
            <div className="terminal-info">
              <span className="terminal-name">{terminal.name}</span>
              <div className="terminal-cwd">{terminal.cwd}</div>
            </div>
            <span className="terminal-close" onClick={(e) => handleClose(e, terminal.id)}>×</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenedTerminals;
