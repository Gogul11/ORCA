// api/deleteFileFolder.ts
import type { IpcMainInvokeEvent } from "electron"
import fs from 'fs'

export const DeleteFileFolder = (
    _event: IpcMainInvokeEvent,
    filePath: string
) => {
    try {
        if (fs.existsSync(filePath)) {
            const isDir = fs.statSync(filePath).isDirectory()

            if (isDir) {
                fs.rmSync(filePath, { recursive: true, force: true }) // Delete directory
            } else {
                fs.unlinkSync(filePath) // Delete file
            }

            console.log(`Deleted: ${filePath}`)
        } else {
            console.warn(`Path does not exist: ${filePath}`)
        }
    } catch (error) {
        console.error(`Error deleting file/folder at ${filePath}:`, error)
    }
}
