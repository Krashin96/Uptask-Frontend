import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addUserToProject } from "~/api/TeamAPI";
import { User } from "~/types/index";

export default function SearchResult({ user, reset }: { user: User, reset: () => void }) {
    const params = useParams()
    const projectID = params.projectID!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectID] })
            reset()
        }
    })

    const handleAddMembertoProject = () => {
        mutate({ id: user._id, projectID })
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            <div className="flex justify-between items-center">
                <p className="">{user.name}</p>
                <button
                    onClick={handleAddMembertoProject}
                    className="text-purple-600 hover:bg-purple-300 transition-colors rounded px-10 py-3 font-bold cursor-pointer"
                    type="button"
                >
                    Agregar al Proyecto
                </button>
            </div>
        </>
    )
}
