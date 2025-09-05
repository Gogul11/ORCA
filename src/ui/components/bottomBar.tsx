import { BsCollection } from "react-icons/bs";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { VscVmConnect } from "react-icons/vsc";
import { FaDownload } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { sideBarStore } from "../stores/sideBarStore";
import { LuListTodo } from "react-icons/lu";
import { colorThemeStore } from "../stores/ThemeStore";
import { darkTheme, lightTheme } from "../utils/colors";

type Tab = 'files' | 'open' | 'chat' | 'connect' | 'download' | 'connectClient' | 'connectHost' | 'timer' | 'todo' | ' ';

const BottomBar = () => {
  const activeTab = sideBarStore((state) => state.activeTab);
  const setActiveTab = sideBarStore((state) => state.setAcitveTab);
  const isOpen = sideBarStore((state) => state.isOpen);
  const toggle = sideBarStore((state) => state.toggle);
  const theme = colorThemeStore((state) => state.theme)
  
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    if(activeTab === tab){
      toggle()
      setActiveTab(' ')
    } 
    if (!isOpen) toggle();
  };

  return (
    <div 
      className="w-full flex justify-evenly h-full"
      style={{backgroundColor : theme === "dark" ?  darkTheme.bottomTab.bg : lightTheme.bottomTab.bg}}
    >
      <button className="cursor-pointer" onClick={() => handleTabClick("files")}>
        <BsCollection 
          size={24} 
          style={{
            color : activeTab === "files" ? 
                    (theme === "dark" ? darkTheme.bottomTab.iconActive : lightTheme.bottomTab.iconActive) : 
                    (theme === "dark" ? darkTheme.bottomTab.iconNotActive : lightTheme.bottomTab.iconNotActive)
                  }}
        />
      </button>

      <button className="cursor-pointer" onClick={() => handleTabClick("connect")}>
        <VscVmConnect 
          size={24} 
          style={{
            color : activeTab === "connect" || activeTab === "connectClient" || activeTab === "connectHost" ? 
                    (theme === "dark" ? darkTheme.bottomTab.iconActive : lightTheme.bottomTab.iconActive) :
                    (theme === "dark" ? darkTheme.bottomTab.iconNotActive : lightTheme.bottomTab.iconNotActive)
                  }} />
      </button>

      <button className="cursor-pointer" onClick={() => handleTabClick("chat")}>
        <BsFillChatRightDotsFill 
          size={24} 
          style={{
            color : activeTab === "chat" ? 
                    (theme === "dark" ? darkTheme.bottomTab.iconActive : lightTheme.bottomTab.iconActive) :
                    (theme === "dark" ? darkTheme.bottomTab.iconNotActive : lightTheme.bottomTab.iconNotActive)
                  }} />
      </button>

      <button className="cursor-pointer" onClick={() => handleTabClick("download")}>
        <FaDownload 
          size={24} 
          style={{
            color : activeTab === "download" ? 
                    (theme === "dark" ? darkTheme.bottomTab.iconActive : lightTheme.bottomTab.iconActive) : 
                    (theme === "dark" ? darkTheme.bottomTab.iconNotActive : lightTheme.bottomTab.iconNotActive)
                  }} />
      </button>

      <button className="cursor-pointer" onClick={() => handleTabClick("timer")}>
        <TfiTimer 
          size={24} 
          style={{
            color : activeTab === "timer" ? 
                    (theme === "dark" ? darkTheme.bottomTab.iconActive : lightTheme.bottomTab.iconActive) : 
                    (theme === "dark" ? darkTheme.bottomTab.iconNotActive : lightTheme.bottomTab.iconNotActive)
                  }} />
      </button>

      <button className="cursor-pointer" onClick={() => handleTabClick("todo")}>
        <LuListTodo 
          size={24} 
          style={{
            color : activeTab === "todo" ? 
                    (theme === "dark" ? darkTheme.bottomTab.iconActive : lightTheme.bottomTab.iconActive) : 
                    (theme === "dark" ? darkTheme.bottomTab.iconNotActive : lightTheme.bottomTab.iconNotActive)
                  }} />
      </button>
    </div>
  );
};

export default BottomBar;
