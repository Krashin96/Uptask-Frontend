import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"
import { getTaskByID } from "~/api/TaskAPI"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {
    const search = new URLSearchParams(location.search)
    const taskID = search.get('taskID')!

    const params = useParams()
    const projectID = params.projectID!

    const { data, isError } = useQuery({
        queryKey: ['task', taskID],
        queryFn: () => getTaskByID({ projectID, taskID }),
        enabled: !!taskID
    })
    if (isError) return <Navigate to={'/404'} />
    if (data) return <EditTaskModal data={data} projectID={projectID} />
}
