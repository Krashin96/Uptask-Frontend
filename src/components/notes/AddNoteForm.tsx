import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { createNote } from "~/api/NoteAPI"
import { NoteFormData } from "~/types/index"
import ErrorMessage from "../ErrorMessage"

export default function AddNoteForm() {
    const initialValues: NoteFormData = {
        content: ''
    }

    const params = useParams()
    const projectID = params.projectID!

    const queryParams = new URLSearchParams(location.search)

    const taskID = queryParams.get('viewTask')!

    const { register, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['task', taskID] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({ formData, projectID, taskID })
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            noValidate
            className="space-y-3"
        >
            <div>
                <label className="font-bold">
                    Crear Nota
                    <input type="text" placeholder="Contenido de la nota" className="w-full p-3 border border-gray-300" {...register('content', { required: 'El Contenido es obligatorio' })} />
                </label>
                {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
            </div>

            <input type="submit" value="Crear Nota" className="bg-fuchsia-600 hover:bg-fuchsia-700 cursor-pointer w-full p-2 font-bold text-white   " />

        </form>
    )
}
