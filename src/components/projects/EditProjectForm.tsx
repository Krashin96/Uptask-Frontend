import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Project, ProjectFormData } from "types";
import { editProject } from "~/api/ProjectAPI";
import ErrorMessage from "~/components/ErrorMessage";

type EditProjectFormProps = {
    data: ProjectFormData
    projectID: Project['_id']
}

export default function EditProjectForm({ data, projectID }: EditProjectFormProps) {
    const { clientName, description, projectName } = data

    const navigate = useNavigate()

    const { formState: { errors }, register, handleSubmit } = useForm({
        defaultValues: {
            projectName: projectName,
            clientName: clientName,
            description: description
        }
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: editProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            queryClient.invalidateQueries({ queryKey: ['editProject', projectID] })
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const request = {
            formData,
            projectID
        }
        mutate(request)

    }
    return (
        <>
            <form onSubmit={handleSubmit(handleForm)} className="mt-10 bg-white shadow-lg p-10 rounded-lg" noValidate>
                <div className="mb-5 space-y-3">
                    <label htmlFor="projectName" className="text-sm uppercase font-bold">
                        Nombre del Proyecto
                    </label>
                    <input
                        id="projectName"
                        className="w-full p-3  border border-gray-200"
                        type="text"
                        placeholder="Nombre del Proyecto"
                        {...register("projectName", {
                            required: "El Titulo del Proyecto es obligatorio",
                        })}
                    />

                    {errors.projectName && (
                        <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                    )}
                </div>

                <div className="mb-5 space-y-3">
                    <label htmlFor="clientName" className="text-sm uppercase font-bold">
                        Nombre Cliente
                    </label>
                    <input
                        id="clientName"
                        className="w-full p-3  border border-gray-200"
                        type="text"
                        placeholder="Nombre del Cliente"
                        {...register("clientName", {
                            required: "El Nombre del Cliente es obligatorio",
                        })}
                    />

                    {errors.clientName && (
                        <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                    )}
                </div>

                <div className="mb-5 space-y-3">
                    <label htmlFor="description" className="text-sm uppercase font-bold">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        className="w-full p-3  border border-gray-200"
                        placeholder="Descripción del Proyecto"
                        {...register("description", {
                            required: "Una descripción del proyecto es obligatoria"
                        })}
                    />

                    {errors.description && (
                        <ErrorMessage>{errors.description.message}</ErrorMessage>
                    )}
                </div>


                <input type="submit"
                    value={data.clientName === '' ? 'Crear Proyecto' : 'Editar Proyecto'}
                    className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 transition-colors cursor-pointer" />
            </form>
        </>
    )
}