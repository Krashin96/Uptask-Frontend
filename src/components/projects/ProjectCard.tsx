import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isManager } from '../../hooks/isManager'
import { useAuth } from '../../hooks/useAuth'

type ProjectCardProps = {
    data: {
        _id: string;
        projectName: string;
        clientName: string;
        description: string;
        manager: string
    }[] | undefined

}

export default function ProjectCard({ data }: ProjectCardProps) {
    const { data: user } = useAuth()
    const navigate = useNavigate()

    if (data && user) return (
        <>

            <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                {data.map((project) => {
                    return (
                        <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className={`font-bold text-xs uppercase ${isManager(project.manager, user._id) ? 'bg-indigo-50 text-indigo-500 border-indigo-500' : 'bg-green-50 text-green-500 border-green-500'} border-2 rounded-lg py-1 px-5 mb-2 w-fit`}>{isManager(project.manager, user._id) ? 'Manager' : 'Colaborador'}</p>

                                    <Link to={`/projects/${project._id}/`}
                                        className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                                    >{project.projectName}</Link>
                                    <p className="text-sm text-gray-400">
                                        Cliente: {project.clientName}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">opciones</span>
                                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </MenuButton>
                                    <Transition as={Fragment} enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                        <MenuItems
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                        >
                                            <MenuItem>
                                                <Link to={`/projects/${project._id}/`}
                                                    className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-slate-300 transition-colors'>
                                                    Ver Proyecto
                                                </Link>
                                            </MenuItem>
                                            {isManager(project.manager, user._id) && (
                                                <>
                                                    <MenuItem>
                                                        <Link to={`/projects/${project._id}/edit`}
                                                            className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-slate-300 transition-colors'>
                                                            Editar Proyecto
                                                        </Link>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <button
                                                            type='button'
                                                            className='block w-full text-left px-3 py-1 text-sm leading-6 text-red-500 hover:bg-slate-300 transition-colors'
                                                            onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                                                        >
                                                            Eliminar Proyecto
                                                        </button>
                                                    </MenuItem>
                                                </>
                                            )}
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    )
                })}
            </ul>

        </>
    )
}


