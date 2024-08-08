import axios, { isAxiosError } from "axios"
import { safeParse } from "valibot"
import { Project, Task, TaskFormData, taskSchema } from "../types"

type TaskAPI = {
    formData: TaskFormData
    projectID: Project['_id']
    taskID: Task['_id']
    status: Task['status']
}

export async function createTask({ formData, projectID }: Pick<TaskAPI, 'formData' | 'projectID'>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/projects/${projectID}/tasks`
        const { data } = await axios.post<string>(url, formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskByID({ projectID, taskID }: Pick<TaskAPI, 'taskID' | 'projectID'>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/projects/${projectID}/tasks/${taskID}`
        const { data } = await axios(url)
        const response = safeParse(taskSchema, data)
        if (response.success) return response.output
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function editTask({ projectID, taskID, formData }: Pick<TaskAPI, 'taskID' | 'projectID' | 'formData'>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/projects/${projectID}/tasks/${taskID}`
        const { data } = await axios.put<string>(url, formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({ projectID, taskID }: Pick<TaskAPI, 'taskID' | 'projectID'>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/projects/${projectID}/tasks/${taskID}`
        const { data } = await axios.delete<string>(url)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatus({ projectID, taskID, status }: Pick<TaskAPI, 'taskID' | 'projectID' | 'status'>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/projects/${projectID}/tasks/${taskID}/status`
        const { data } = await axios.post<string>(url, { status })
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}