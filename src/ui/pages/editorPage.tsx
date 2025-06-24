import { useEffect, useState } from 'react';
import LabXEditor from '../components/editor';
import LabXTerminal from '../components/terminal';
import { Rnd } from 'react-rnd';

const EditorPage = () => {

    const[showTerminal, setShowTerminal] = useState<boolean>(false)
    const[terminalWidth, setTerminalWidth] = useState<number>(window.innerWidth * 0.5)
    const[editorWidth, setEditorWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        const openTerminal = (event : KeyboardEvent) : void => {
            if((event.ctrlKey || event.metaKey) && event.key == 'k'){
                event.preventDefault()
                if(showTerminal)
                    setEditorWidth(editorWidth + terminalWidth)
                else
                    setEditorWidth(editorWidth - terminalWidth)
                setShowTerminal(term => ! term)
            }
        }

        window.addEventListener('keydown', openTerminal)

        return () => {
            window.removeEventListener('keydown', openTerminal);
        }
    }, [showTerminal])


    useEffect(() => {

        const handelWindowResize = () => {
            const newWidth = window.innerWidth;
            
            setEditorWidth(newWidth)
            setTerminalWidth(newWidth * 0.5)
            setShowTerminal(false)
        }
        
        window.addEventListener('resize', handelWindowResize)

        return () => window.removeEventListener('resize', handelWindowResize)

    }, [])

    return (
        <div className="flex h-screen gap-6 w-screen">
                <Rnd
                    default={{
                        x : 0,
                        y :  0,
                        height : '100%',
                        width : editorWidth
                    }}
                    size={{
                        width: editorWidth,
                        height: '100%',
                    }}
                    minWidth={400}
                    maxWidth={showTerminal ? window.innerWidth-300 : window.innerWidth - 5}
                    onResize={(_e, _dir, ref, _delta, _position) => {
                        const newEditorWidth : number = ref.offsetWidth;
                        const newTerminalWidth : number = window.innerWidth - newEditorWidth
                        setEditorWidth(newEditorWidth)
                        setTerminalWidth(newTerminalWidth)
                    }}
                    disableDragging
                    enableResizing = {{
                        top:false,
                        bottom:false,
                        left : false,
                        right : showTerminal,
                        bottomLeft : true,
                        bottomRight : true,
                        topLeft : true,
                        topRight : true
                    }}
                    className='hide-scrollbar'
                >
                    <div className='h-full w-full border border-green-500'>
                        <LabXEditor theme="vs-dark"/>
                    </div>
                </Rnd>

                {showTerminal && 
                    <div className="h-full absolute top-0 -right-0 overflow-hidden" 
                        style={{width : terminalWidth}}>
                        <LabXTerminal />
                    </div>
                }
        </div>
    );
};

export default EditorPage;
