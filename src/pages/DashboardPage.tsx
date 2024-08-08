import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import { getAllProjects } from "~/api/ProjectAPI";
import DeleteProjectModal from "~/components/projects/DeleteProjectModal";
import ProjectCard from "~/components/projects/ProjectCard";
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
    const { isLoading: userLoading } = useAuth()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['projects'],
        queryFn: getAllProjects
    })


    if (isLoading && userLoading) return <p>Cargando...</p>
    if (isError) return <Navigate to={'/404'} />
    if (data) return (
        <>
            <h1 className="text-5xl font-black">Mis Proyectos</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Maneja y administra tus proyectos</p>

            <nav className="my-5">
                <Link to={'/projects/create'} className="bg-purple-400 hover:bg-purple-500 px-10 py-3 cursor-pointer transition-colors text-white text-xl font-bold">Nuevo Proyecto</Link>
            </nav>

            {data.length ? (
                <ProjectCard data={data} />
            ) : (
                <p className="text-center py-20">
                    No hay Proyectos aún {''}
                    <Link to={'/projects/create'} className="text-fuchsia-500 font-bold">Crear Proyecto</Link>
                </p>

            )}

            <DeleteProjectModal />
        </>
    )
}
