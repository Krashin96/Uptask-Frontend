import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, Fragment, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTaskByID, updateStatus } from '~/api/TaskAPI';
import { statusTranslations } from '~/locales/es';
import { TaskStatus } from '~/types/index';
import { formatDate } from '~/utils/index';
import NotesPanel from '../notes/NotesPanel';

export default function TaskModalDetails() {
    const params = useParams()
    const projectID = params.projectID!

    const navigate = useNavigate()

    const location = useLocation()
    const search = new URLSearchParams(location.search)
    const taskID = search.get('viewTask')!

    const { data, isError, error } = useQuery({
        queryFn: () => getTaskByID({ projectID, taskID }),
        queryKey: ['task', taskID],
        enabled: !!taskID
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['editProject', projectID] })
            queryClient.invalidateQueries({ queryKey: ['task', taskID] })
        }
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus
        mutate({ projectID, taskID, status })
    }

    useEffect(() => {
        if (isError) {
            toast.error(error.message, { toastId: 'error' })
            return navigate(location.pathname, { replace: true })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError])

    if (data) return (
        <>
            <Transition appear show={!!taskID} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)} </p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)} </p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </DialogTitle>


                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>

                                    {data.completedBy.length ? (
                                        <>
                                            <p className='mb-2 text-slate-500 text-2xl'>Historial de Cambios</p>
                                            {
                                                data.completedBy &&
                                                <ol className='list-decimal'>{
                                                    data.completedBy.map(member => member.user && (
                                                        <li key={member._id}><span>{statusTranslations[member.status]} por: </span>{member.user.name}</li>
                                                    ))
                                                }</ol>
                                            }
                                        </>
                                    ) : null}
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>
                                        <select onChange={handleChange} className='w-full bg-white border border-gray-300' defaultValue={data.status}>
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option value={key} key={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <NotesPanel notes={data.notes} />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}