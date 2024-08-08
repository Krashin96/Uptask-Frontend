import axios, { isAxiosError } from "axios"
import { safeParse } from "valibot"
import { Project, ProjectFormData, dashBoardProjectsSchema, editProjectSchema, projectSchema } from "../types"

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('AUTH_TOKEN')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const createProject = async (formData: ProjectFormData) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/projects`, formData)

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getAllProjects = async () => {
    try {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/projects`)
        const response = safeParse(dashBoardProjectsSchema, data)

        if (response.success) return response.output

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getProjectByID = async (id: Project['_id']) => {
    try {
        const { data } = await axios<Project>(`${import.meta.env.VITE_API_URL}/projects/${id}`)
        const response = safeParse(editProjectSchema, data)
        if (response.success) return response.output
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export const getFullProject = async (id: Project['_id']) => {
    try {
        const { data } = await axios<Project>(`${import.meta.env.VITE_API_URL}/projects/${id}`)
        const response = safeParse(projectSchema, data)
        if (response.success) return response.output
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


type TEditProject = {
    projectID: Project['_id']
    formData: ProjectFormData
}

export const editProject = async ({ formData, projectID }: TEditProject) => {
    try {
        const { data } = await axios.put<string>(`${import.meta.env.VITE_API_URL}/projects/${projectID}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteProject = async (id: Project['_id']) => {
    try {
        const { data } = await axios.delete<string>(`${import.meta.env.VITE_API_URL}/projects/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}