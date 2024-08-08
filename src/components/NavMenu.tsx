import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { useQueryClient } from '@tanstack/react-query'
import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type NavMenuProps = {
    user: {
        _id: string;
        name: string;
        email: string;
    }
}

export default function NavMenu({ user }: NavMenuProps) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const logout = () => {
        queryClient.removeQueries({ queryKey: ['user'] })
        localStorage.removeItem('AUTH_TOKEN')
        navigate('auth/login')
    }

    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-purple-400 mx-5">
                <Bars3Icon className='w-8 h-8 text-white ' />
            </PopoverButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
                    <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                        <p className='text-center cursor-default'>Hola: {user?.name}</p>
                        <Link
                            to='/profile'
                            className='block w-full p-2 hover:text-purple-950 hover:bg-gray-300 transition-colors'
                        >Mi Perfil</Link>
                        <Link
                            to='/'
                            className='block w-full p-2 hover:text-purple-950 hover:bg-gray-300 transition-colors'
                        >Mis Proyectos</Link>
                        <button
                            className='block w-full text-left p-2 hover:text-purple-950 hover:bg-gray-300 transition-colors'
                            type='button'
                            onClick={logout}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </PopoverPanel>
            </Transition>
        </Popover>
    )
}