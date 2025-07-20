import AdmZip from 'adm-zip'
import type { IpcMainInvokeEvent } from 'electron'
import path from 'path'

export const zipFolder = async (
    _event : IpcMainInvokeEvent,
    folderPath : string, 
    outputFolderName : string
) => {
    try{
        const zip = new AdmZip()
        zip.addLocalFolder(folderPath)
        const out = path.join(folderPath, outputFolderName)
        console.log(out, " ", folderPath)
        zip.writeZip(out)
        console.log(out, " written successfully") 

        return true
    }
    catch(e){
        console.log("failure ", e)

        return false
    }
}