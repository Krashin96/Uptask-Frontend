import axios, { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";

type NoteAPI = {
    formData: NoteFormData
    projectID: Project['_id']
    taskID: Task['_id']
    noteID: Note['_id']
}

export async function createNote({ formData, projectID, taskID }: Pick<NoteAPI, 'formData' | 'projectID' | 'taskID'>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/projects/${projectID}/tasks/${taskID}/notes`
        const { data } = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteNote({ projectID, taskID, noteID }: Pick<NoteAPI, 'noteID' | 'projectID' | 'taskID'>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/projects/${projectID}/tasks/${taskID}/notes/${noteID}`
        const { data } = await axios.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}