import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteNote } from '~/api/NoteAPI'
import { Note } from '~/types/index'
import { formatDate } from '~/utils/index'
import { useAuth } from '../../hooks/useAuth'

export default function NoteDetails({ note }: { note: Note }) {
    const { data, isLoading } = useAuth()

    const params = useParams()
    const projectID = params.projectID!

    const taskID = new URLSearchParams(location.search).get('viewTask')!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['task', taskID] })
        }
    })

    const handleSubmit = () => {
        mutate({ noteID: note._id, projectID, taskID })
    }

    if (isLoading) return 'Cargando...'
    return (
        <div className='p-3 flex justify-between items-center'>
            <div>
                <p>{note.content} por: <span className='font-bold'>{note.createdBy.name}</span></p>
                <p className='text-xs text-slate-500'>
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {data?._id === note.createdBy._id && (
                <button onClick={handleSubmit} type="button" className='bg-red-300   hover:bg-red-600 p-2 text-xs font-semibold active:translate-y-1  cursor-pointer transition rounded shadow-sm'>Eliminar</button>
            )}
        </div>
    )
}
