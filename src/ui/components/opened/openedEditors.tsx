import { useState } from 'react';
import './openedEditors.css';
import { getIconForExtension } from '../../utils/iconUtils';
import type { IconType } from 'react-icons';

interface OpenedFile {
  id: string;
  name: string;
  path: string;
}

const dummyFiles: OpenedFile[] = [
  { id: '1', name: 'App.cpp', path: 'src\\ui' },
  { id: '2', name: 'window.ts', path: 'src\\ide' },
  { id: '3', name: 'interface.d.ts', path: 'src\\ide' },
  { id: '4', name: 'sideBar.tsx', path: 'src\\ui\\pages' },
  { id: '5', name: 'ClientFolder.css', path: 'src\\ui\\components' },
];

const OpenedEditors = () => {
  const [files, setFiles] = useState<OpenedFile[]>(dummyFiles);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    console.log('Selected file:', id);
  };

  const handleClose = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFiles(files.filter(f => f.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="opened-editors-container">
      <div className="files-list">
        {files.map(file => {
          const Icon: IconType = getIconForExtension(file.name);
          return (
            <div
              key={file.id}
              className={`file-entry ${selectedId === file.id ? 'active' : ''}`}
              onClick={() => handleSelect(file.id)}
            >
              <div className="file-info">
                <span className="file-icon">
                  <Icon size={18} />
                </span>
                <div className="file-texts">
                  <div className="file-name">{file.name}</div>
                  <div className="file-path">{file.path}</div>
                </div>
              </div>
              <span className="file-close" onClick={(e) => handleClose(e, file.id)}>×</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OpenedEditors;
