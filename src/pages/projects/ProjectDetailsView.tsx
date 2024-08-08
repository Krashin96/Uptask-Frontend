import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { getFullProject } from "~/api/ProjectAPI"
import AddTaskModal from "~/components/task/AddTaskModal"
import EditTaskData from "~/components/task/EditTaskData"
import TaskList from "~/components/task/TaskList"
import TaskModalDetails from "~/components/task/TaskModalDetails"
import { isManager } from "../../hooks/isManager"
import { useAuth } from "../../hooks/useAuth"

export default function ProjectDetailsView() {
    const navigate = useNavigate()
    const { projectID } = useParams()

    const { data: user, isLoading: userLoading } = useAuth()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['editProject', projectID],
        queryFn: () => getFullProject(projectID!),
        retry: false
    })

    const canEdit = useMemo(() => user?._id === data?.manager, [data, user])

    if (isError) <Navigate to={'/404'} />
    if (isLoading && userLoading) return 'Cargando'
    if (data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="mt-5 font-light text-gray-500 text-2xl">{data.description}</p>

            {
                isManager(data.manager, user._id) && <nav className="my-5 flex gap-3">
                    <button onClick={() => navigate(location.pathname + '?newTask=true')} className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors" type="button">
                        Agregar Tarea
                    </button>

                    <Link
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        to={'team'}
                    >
                        Colaboradores
                    </Link>
                </nav>
            }

            <TaskList tasks={data.tasks} canEdit={canEdit} />

            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
