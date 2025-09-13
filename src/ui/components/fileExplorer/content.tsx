import { FaFileCode } from "react-icons/fa6";
import { FaFolderClosed } from "react-icons/fa6";
import { currentPathStore } from "../../stores/currentPathStore";
import { ActivePathStore } from "../../stores/activePathStore";
import { ModifiedFileStore } from "../../stores/modifiedFileStore";
import { welcomePageStore } from "../../stores/welcomePageStore";
import { currentStyle } from "../../utils/styleChooser";
import { EditorMapsStore } from "../../stores/editorsMap";
import { hostSelectedPathStore } from "../../stores/host/currentPathStore";

type FileNode = {
    name: string;
    isDir: boolean;
    toogle : () => void;
    select ?: (path : {val : string, isDir : boolean}) => void,
    path : string,
    host : boolean
};

const Content = (props : FileNode) => {

    const selectedPath = currentPathStore((state) => state.setPath)
    const activeStore = ActivePathStore((state) => state.setPath)

    return (
        <div className='cursor-pointer w-full' 
            onClick={() => {
                    props.select && props.select({val : props.path, isDir : props.isDir})
                    !props.isDir && (props.host ? hostSelectedPathStore.getState().setPath(props.path) : selectedPath(props.path))
                    !props.host && welcomePageStore.getState().setOpen(false)
                    !props.host && activeStore(props.path)
                    !props.isDir && !props.host && ModifiedFileStore.getState().setFiles(props.path)
                }}
            onContextMenu={(e) => {
                if(e.button === 2)
                    props.select && props.select({val : props.path, isDir : props.isDir})
            }}
            style={{
				backgroundColor : EditorMapsStore.getState().openedEditors[props.path]?.isOpen ? currentStyle('fileExplorer.afterOpen.files.active') : '',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = currentStyle('fileExplorer.afterOpen.files.hover')}
			onMouseLeave={e => e.currentTarget.style.backgroundColor =  
								EditorMapsStore.getState().openedEditors[props.path]?.isOpen ? currentStyle('fileExplorer.afterOpen.files.active') : ''
						}
        >
            <div 
                className="flex w-[80%] min-h-6 mx-2 gap-2 items-center py-2"
                onClick={props.toogle}
            >
                <div 
                    className="flex-shrink-0"
                    style={{
                        color : props.isDir ? currentStyle('fileExplorer.afterOpen.files.icons.folder') : currentStyle('fileExplorer.afterOpen.files.icons.file')
                    }}
                >
                    {props.isDir ? <FaFolderClosed size={20}/> : <FaFileCode size={20}/>} 
                </div>
                <span>{props.name}</span>
            </div>        
        </div>
    );
}

export default Content;
