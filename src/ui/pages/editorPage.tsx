import { useEffect, useState } from 'react';
import LabXEditor from '../components/editor';
import LabXTerminal from '../components/terminal';
import { Rnd } from 'react-rnd';
import { 
    defaultRndSize, 
    enableResizingOptions, 
    handleOpenTerminal, 
    handleRndResize, 
    handleScreenResize, 
    rndSize } from '../utils/editoPageUtils';

const EditorPage = () => {

    const[showTerminal, setShowTerminal] = useState<boolean>(false)
    const[terminalWidth, setTerminalWidth] = useState<number>(window.innerWidth * 0.5)
    const[editorWidth, setEditorWidth] = useState<number>(window.innerWidth)

    //Responsible for closing and opeing terminal
    useEffect(() => {
        const openTerminal = (event : KeyboardEvent) : void => {
           handleOpenTerminal(event, setEditorWidth, setShowTerminal, editorWidth, terminalWidth, showTerminal)
        }

        window.addEventListener('keydown', openTerminal)

        return () => {
            window.removeEventListener('keydown', openTerminal);
        }
    }, [showTerminal, terminalWidth, editorWidth])

    //Responsible for editor and terminal size when the screen size changes
    useEffect(() => {
        window.addEventListener('resize', () => handleScreenResize(setEditorWidth, setTerminalWidth, setShowTerminal))

        return () => window.removeEventListener('resize', () => handleScreenResize(setEditorWidth, setTerminalWidth, setShowTerminal))

    }, [editorWidth, terminalWidth])

    return (
        <div className="flex h-screen gap-6 w-screen">

                {/* Editor */}
                <Rnd
                    default={defaultRndSize(editorWidth)}
                    size={rndSize(editorWidth)}
                    minWidth={400}
                    maxWidth={showTerminal ? window.innerWidth-300 : window.innerWidth - 5}
                    onResize={(e, dir, ref, delta, position) => 
                        handleRndResize(e, dir, ref, delta, position, setEditorWidth, setTerminalWidth)}
                    disableDragging
                    enableResizing = {enableResizingOptions(showTerminal)}
                    className='hide-scrollbar'
                >
                    <div className='h-[97%] w-full border border-green-500'>
                        <LabXEditor theme="vs-dark"/>
                    </div>
                </Rnd>

                {/* Terminal */}
                {showTerminal && 
                    <div className="h-[98%] absolute top-0 -right-0 overflow-hidden" 
                        style={{width : terminalWidth}}>
                        <LabXTerminal />
                    </div>}
                
                <div className='h-[3%] flex w-full absolute bottom-0 border border-red-600'>
                    <div className='w-[50%] bg-fuchsia-600 h-full'>
                            {/* //list of editors opened */}
                    </div>
                    <div className='w-[50%] bg-indigo-600 h-full'>
                            {/* //list of terminals opened */}
                    </div>
                </div>
        </div>
    );
};

export default EditorPage;
