import axios, { isAxiosError } from "axios";
import { safeParse } from "valibot";
import { Auth, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, Token, UpdateCurrentPasswordForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/create-account`
        const { data } = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(token: Token) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/confirm-account`
        const { data } = await axios.post<string>(url, token)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function newConfirmationToken(email: RequestConfirmationCodeForm) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/request-code`
        const { data } = await axios.post<string>(url, email)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function authUser(formData: UserLoginForm) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/login`
        const { data } = await axios.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(email: ForgotPasswordForm) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/forgot-password`
        const { data } = await axios.post<string>(url, email)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validatePasswordToken(token: Token) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/validate-password-token`
        const { data } = await axios.post<string>(url, token)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function resetPassword({ formData, token }: { formData: NewPasswordForm, token: string }) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`
        const { data } = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/user`
        const { data } = await axios(url)
        const response = safeParse(userSchema, data)
        if (response.success) {
            return response.output
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function updateAccount(formData: Pick<UserRegistrationForm, 'email' | 'name'>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/profile`
        const { data } = await axios.put<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function updateCurrentUserPassword(formData: UpdateCurrentPasswordForm) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/update-password`
        const { data } = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkPassword(formData: Pick<Auth, 'password'>) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/auth/check-password`
        const { data } = await axios.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}