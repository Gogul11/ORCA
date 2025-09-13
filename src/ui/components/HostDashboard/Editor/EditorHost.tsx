import React, { useEffect, useState } from 'react';
import LabXEditor from '../../../components/editor';
import { currentPathStore } from '../../../stores/currentPathStore';
import { GiDolphin } from 'react-icons/gi';

const EditorHost: React.FC = () => {
  const selectedPath = currentPathStore((state) => state.path);
  const [fileName, setFilename] = useState('')

  const [fileData, setFileData] = useState<{ data: string; ext: string } | null>(null);

  useEffect(() => {
    if (!selectedPath) return;

    (async () => {
      const res: { data: string; ext: string; fileName: string } = await window.electronApi.openFile(selectedPath);
      setFileData({ data: res.data, ext: res.ext });
      setFilename(res.fileName)
    })();
  }, [selectedPath]);

  return (
    <div className="w-full h-full">
      <div className='h-[3%] text-white'>
        {fileName}
      </div>
      <div className='h-[97%]'>
        {selectedPath && fileData ? (
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
