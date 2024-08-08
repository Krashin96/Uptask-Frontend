import axios, { isAxiosError } from "axios";
import { safeParse } from "valibot";
import { TeamMemberForm, TeamMembers, User, userSchema } from "../types";

type searchUserProps = {
    formData: TeamMemberForm
    projectID: string
}

export async function searchUser({ formData, projectID }: searchUserProps) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectID}/team/find`
    try {
        const { data } = await axios.post<User>(url, formData)
        const response = safeParse(userSchema, data)
        if (response.success) return response.output

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToProject({ id, projectID }: { id: User['_id'], projectID: string }) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectID}/team`
    try {
        const { data } = await axios.post(url, { id })
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}

export async function getProjectTeam({ projectID }: { projectID: string }) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectID}/team`
    try {
        const { data } = await axios<User[]>(url)
        const response = safeParse(TeamMembers, data)
        if (response.success) {
            return response.output
        } else {
            return []
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}

export async function removeUserFromProject({ projectID, id }: { projectID: string, id: User['_id'] }) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectID}/team/${id}`
    try {
        const { data } = await axios.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}