import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "~/components/Header";
import { useAuth } from "../hooks/useAuth";

export default function AppLayout() {
    const { data, isError, isLoading } = useAuth()

    if (isLoading) return 'Cargando...'
    if (isError) return <Navigate to={'/auth/login'} />
    if (data) return (
        <>
            <Header user={data} />

            <section className="max-w-screen-2xl mx-auto mt-10 p-10">
                <Outlet />
            </section>

            <footer className="py-5">
                <p className="text-center">Todos los derechos reservados {new Date().getFullYear()}</p>
            </footer>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
