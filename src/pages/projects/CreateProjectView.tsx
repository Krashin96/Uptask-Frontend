import { Link } from "react-router-dom";
import ProjectForm from "~/components/projects/ProjectForm";

export default function CreateProjectView() {
    return (
        <div className="mx-auto max-w-3xl">
            <h1 className="text-5xl font-black">Crear Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Llena el formulario para crear un proyecto</p>

            <nav className="my-5">
                <Link to={'/'} className="bg-purple-400 hover:bg-purple-500 px-10 py-3 cursor-pointer transition-colors text-white text-xl font-bold">Volver a Proyectos</Link>
            </nav>
            <ProjectForm />
        </div>
    )
}
