import React, { useEffect, useState } from 'react';
import { GiDolphin } from 'react-icons/gi';
import { FaMinus } from "react-icons/fa";
//Components
import LabXEditor from '../../../components/editor';
//Stores
import { hostSelectedPathStore } from '../../../stores/host/currentPathStore';
import { currentStyle } from '../../../utils/styleChooser';

const EditorHost: React.FC = () => {
  
  const selectedPath = hostSelectedPathStore((state) => state.path);
  const [fileData, setFileData] = useState<{ data: string; ext: string; name : string } | null>(null);
  const [openEditor, setOpenEditor] = useState<boolean>(false)

  useEffect(() => {
    if (!selectedPath) return;

    (async () => {
      const res: { data: string; ext: string; fileName: string } = await window.electronApi.openFile(selectedPath);
      setFileData({ data: res.data, ext: res.ext, name : res.fileName });
      setOpenEditor(true)
    })();
  }, [selectedPath]);

  return (
    <div className="w-full h-full">
      <div className='h-[3%] flex items-center justify-center gap-4'>
        <p 
          style={{color : currentStyle('hostDashboard.editor.text')}}
          className='font-bold'
        >
          {openEditor && fileData?.name}
        </p>
        {openEditor && 
          <p
            className='font-bold cursor-pointer text-xl'
            style={{color : currentStyle('hostDashboard.editor.error')}}
            onClick={() => setOpenEditor(false)}
          >
            <FaMinus/>
          </p>
        }
      </div>
      <div className='h-[97%]'>
        {selectedPath && fileData && openEditor ? (
          <LabXEditor
            value={fileData.data}
            ext={fileData.ext}
            path=''
            read={true}
          />
        ) : (
          <div className='flex h-full w-full justify-center items-center'>
            <div className='text-7xl'>
              <GiDolphin color='#007acc'/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorHost;
