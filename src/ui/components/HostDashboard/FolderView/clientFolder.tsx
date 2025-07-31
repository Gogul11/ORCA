import React, { useEffect, useState } from 'react';
import './ClientFolder.css';
import type { Client } from '../../../types/types';
import Content from '../../fileExplorer/content';
import { fetchFolder, openFolder } from '../../../utils/flileExplorer';

interface Props {
  client?: Client;
}

type FileNode = {
  name: string;
  path: string;
  isDir: boolean;
  children?: FileNode[];
  isOpen : boolean
};

const ClientFolderView: React.FC<Props> = ({ client }) => {


	const [tree, setTree] = useState<FileNode[]>([]);
  const[selectedPath, setSelectedPath] = useState({ val: '', isDir: false })
	const [fetch, setFetch] = useState<boolean>(false)
  const[folderPath, setFolderPath] = useState<string>('/home/jarvis/Desktop/testDir/23-123')


  useEffect(() => {

  }, [])

  useEffect(() => {
    fetchFolder(folderPath)
    .then((data) => {
      setTree(data);
      setFetch(false);
    })
    .catch((_err: any) => {
      // Try refreshing parent instead
      const parentDir = folderPath.split('/').slice(0, -1).join('/');
      if (parentDir && parentDir !== folderPath) {
        fetchFolder(parentDir)
          .then((data) => {
            setTree(data);
            setSelectedPath({ val: parentDir, isDir: true });
            setFetch(false);
          })
          .catch((_e: any) => {
            window.alert("Oops, Error while fetching!");
            setFetch(false);
          });
      } else {
        window.alert("Oops, Error while fetching!");
        setFetch(false);
      }
    });
  }, [folderPath])

  const renderTree = (nodes: FileNode[], level = 0) =>
  nodes.map((node) => (
    <div
      key={node.path}
      style={{ paddingLeft: level + 16 }}
      className={`
        group transition-all duration-150 rounded-sm
        ${selectedPath.val === node.path ? 'bg-[#3e4451] text-[#abb2bf]' : ''}
        ${node.isDir ? 'text-[#61afef]' : 'text-[#e5c07b]'}
      `}
    >
      <Content 
        isDir={node.isDir}
        name={node.name}
        toogle={() => openFolder(node.path, setTree, tree)}
        select={(p: typeof selectedPath) => setSelectedPath(p)}
        path={node.path}
      />
      {node.isDir && node.children && node.isOpen && renderTree(node.children, level + 1)}
    </div>
  ));


  if (!client) {
    return <div className="client-folder-view">Select a client to view their folder.</div>;
  }

  return (
    <div className="client-folder-view">
      <h2 className="client-header">
        <span className="client-name-highlight">{client.name}</span>
        <span className="client-reg-highlight">{client.regNo}</span>
      </h2>

      <div className="folder-structure">
        {renderTree(tree)}
      </div>
    </div>
  );
};

export default ClientFolderView;