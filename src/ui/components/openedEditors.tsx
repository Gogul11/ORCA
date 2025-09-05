import React, { useEffect, useState } from 'react';
import { EditorMapsStore } from '../stores/editorsMap';
import { ActivePathStore } from '../stores/activePathStore';
import { ModifiedFileStore } from '../stores/modifiedFileStore';
import { colorThemeStore } from '../stores/ThemeStore';
import { darkTheme, lightTheme } from '../utils/colors';


type openedEditorsObjectType = {
  isOpen : boolean,
  data : string
}

interface OpenedEditorsBarProps {
  editors: Record<string, openedEditorsObjectType>;
}

const OpenedEditorsBar: React.FC<OpenedEditorsBarProps> = ({ editors}) => {

  const tooggleOpenedEditors = EditorMapsStore((state) => state.toogleEditors)
  const deleteEditors = EditorMapsStore((state) => state.deleteEditor)
  const ActiveEditorPath = ActivePathStore((state) => state.setPath)
  const ModifiedFiles = ModifiedFileStore((state) => state.setFiles)
  const theme = colorThemeStore((state) => state.theme)

  const [editorNames, setEditorsName] = useState<Record<string, string>>({})

  useEffect(() => {
    (async() => {
      const retrivedNames = await Promise.all (Object.entries(editors).map(async([path]) => {
        const name = await window.electronApi.getFileName(path)
        return [path, name] as [string, string]
      }))
      setEditorsName(Object.fromEntries(retrivedNames))
    })();
  }, [editors])
  
  return (
    <div 
      className="w-full h-full overflow-x-scroll whitespace-nowrap flex items-center px-2 space-x-[1px] hide-scrollbar"
      style={{backgroundColor : theme === "dark" ? darkTheme.bottomBar.bg : lightTheme.bottomBar.bg}}
    >
      {Object.entries(editors).map(([path, val]) => (
        <div
          key={path}
          className="flex items-center px-3 py-1 h-full cursor-pointer text-sm"
          style={{
            backgroundColor : theme === "dark" ? 
                              (val.isOpen ? darkTheme.bottomBar.componentActive : darkTheme.bottomBar.componentBg) : 
                              (val.isOpen ? lightTheme.bottomBar.componentActive : lightTheme.bottomBar.componentBg),
            color : theme === "dark" ? darkTheme.bottomBar.text : lightTheme.bottomBar.text
          }}
          onClick={() => {
            tooggleOpenedEditors(path)
            ActiveEditorPath(path)
            ModifiedFiles(path)
          }}
        >
          <span>
            {editorNames[path]}
            {/* {file.isModified && <span className="text-red-400 ml-1">*</span>} */}
          </span>
          <span
            className="ml-2 file-close text-lg"
            style={{color : theme === "dark" ? darkTheme.bottomBar.crossIcon : lightTheme.bottomBar.crossIcon}}
            onClick={(e) => {
              e.stopPropagation();
              deleteEditors(path)
            }}
          >
            ×
          </span>
        </div>
      ))}
    </div>
  );
};

export default OpenedEditorsBar;
