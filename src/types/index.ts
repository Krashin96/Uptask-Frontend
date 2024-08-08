// Projects

import { InferOutput, array, nullable, object, pick, picklist, string } from "valibot";

export const userSchema = object({
    _id: string(),
    name: string(),
    email: string()
})

export const notesSchema = object({
    _id: string(),
    content: string(),
    createdBy: userSchema,
    task: string(),
    createdAt: string()
})

export const status = [
    'pending',
    'onHold',
    'inProgress',
    'underReview',
    'completed'
] as const


export const taskSchema = object({
    _id: string(),
    name: string(),
    description: string(),
    project: string(),
    status: picklist(status),
    createdAt: string(),
    updatedAt: string(),
    completedBy: array(
        object({
            user: nullable(userSchema),
            status: picklist(status),
            _id: string()
        })
    ),
    notes: array(
        notesSchema
    )
})

export const taskProjectSchema = array(
    pick(
        taskSchema, ['_id', 'name', 'description', 'status']
    )
)

export const projectSchema = object({
    _id: string(),
    projectName: string(),
    clientName: string(),
    description: string(),
    manager: string(),
    tasks: taskProjectSchema,
    team: array(pick(userSchema, ['_id']))
})

export const dashBoardProjectsSchema = array(
    pick(
        projectSchema, ['_id', 'clientName', 'projectName', 'description', 'manager']
    )
)

export const editProjectSchema = pick(projectSchema, ['projectName', 'description', 'clientName'])

export type Project = InferOutput<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'description' | 'projectName'>

// Tasks

const statusSchema = picklist(status)
export type TaskStatus = InferOutput<typeof statusSchema>
export type Task = InferOutput<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
export type TaskProject = InferOutput<typeof taskProjectSchema>

// Auth && Users

const UserLoginForm = object({
    name: string(),
    password: string(),
    password_confirmation: string(),
    email: string(),
    token: string()
})

export const TeamMembers = array(
    object({
        _id: string(),
        name: string(),
        email: string()
    })
)

export type UpdateCurrentPasswordForm = {
    password: string
    current_password: string
}

export type Auth = InferOutput<typeof UserLoginForm>
export type Token = Pick<Auth, 'token'>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'email' | 'password' | 'name' | 'password_confirmation'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type User = InferOutput<typeof userSchema>
export type TeamMemberForm = Pick<User, 'email'>
export type TeamMembers = InferOutput<typeof TeamMembers>
export type Note = InferOutput<typeof notesSchema>
export type NoteFormData = Pick<Note, 'content'>