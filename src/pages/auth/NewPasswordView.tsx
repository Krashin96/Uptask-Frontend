import { useState } from "react"
import NewPasswordForm from "~/components/auth/NewPasswordForm"
import NewPasswordToken from "~/components/auth/NewPasswordToken"

export default function NewPasswordView() {
    const [isValidToken, setIsValidToken] = useState(false)
    const [token, setToken] = useState('')

    return (
        <>
            {!isValidToken ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken} /> : <NewPasswordForm token={token} />}
        </>
    )
}
