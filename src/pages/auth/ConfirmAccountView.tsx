import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAccount } from "~/api/AuthAPI";
import { Token } from "~/types/index";

export default function ConfirmAccountView() {
    const [key, setKey] = useState<Token['token']>('')

    const handleChange = (token: Token['token']) => {
        setKey(token)
    }

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
        }
    })

    const handleComplete = (token: Token['token']) => {
        mutate({ token })
    }



    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
            </p>
            <form
                className="space-y-8 p-10 bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>

                <div className="flex gap-5 justify-center">
                    <PinInput onComplete={handleComplete} onChange={handleChange} value={key}>
                        <PinInputField className="w-10 h-10 rounded-lg border border-gray-500 placeholder-white text-center font-bold" />
                        <PinInputField className="w-10 h-10 rounded-lg border border-gray-500 placeholder-white text-center font-bold" />
                        <PinInputField className="w-10 h-10 rounded-lg border border-gray-500 placeholder-white text-center font-bold" />
                        <PinInputField className="w-10 h-10 rounded-lg border border-gray-500 placeholder-white text-center font-bold" />
                        <PinInputField className="w-10 h-10 rounded-lg border border-gray-500 placeholder-white text-center font-bold" />
                        <PinInputField className="w-10 h-10 rounded-lg border border-gray-500 placeholder-white text-center font-bold" />
                    </PinInput>

                </div>

            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/request-code'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>

        </>
    )
}