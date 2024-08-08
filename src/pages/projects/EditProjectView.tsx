import { useQuery } from "@tanstack/react-query"
import { Link, Navigate, useParams } from "react-router-dom"
import { getProjectByID } from "~/api/ProjectAPI"
import EditProjectForm from "~/components/projects/EditProjectForm"

export default function EditProjectView() {
    const { projectID } = useParams()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['editProject', projectID],
        queryFn: () => getProjectByID(projectID!),
        retry: false
    })
    if (isError) <Navigate to={'/404'} />
    if (isLoading) return 'Cargando'
    if (data) return (
        <div className="mx-auto max-w-3xl">
            <h1 className="text-5xl font-black">Editar Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Reemplaza el formulario para editar el proyecto</p>

            <nav className="my-5">
                <Link to={'/'} className="bg-purple-400 hover:bg-purple-500 px-10 py-3 cursor-pointer transition-colors text-white text-xl font-bold">Volver a Proyectos</Link>
            </nav>
            <EditProjectForm data={data} projectID={projectID!} />
        </div>
    )
}
