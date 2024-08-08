import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "~/layouts/AppLayout";
import DashboardPage from "~/pages/DashboardPage";
import AuthLayout from "./layouts/AuthLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import NotFound from "./pages/404/NotFound";
import ConfirmAccountView from "./pages/auth/ConfirmAccountView";
import ForgotPasswordView from "./pages/auth/ForgotPasswordView";
import LoginView from "./pages/auth/LoginView";
import NewPasswordView from "./pages/auth/NewPasswordView";
import RegisterView from "./pages/auth/RegisterView";
import RequestConfirmationCodeView from "./pages/auth/RequestNewCodeView";
import ChangePasswordView from "./pages/profile/ChangePasswordView";
import ProfileView from "./pages/profile/ProfileView";
import CreateProjectView from "./pages/projects/CreateProjectView";
import EditProjectView from "./pages/projects/EditProjectView";
import ProjectDetailsView from "./pages/projects/ProjectDetailsView";
import ProjectTeamView from "./pages/projects/ProjectTeamView";

export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardPage />} index />
                    <Route path="/projects/create" element={<CreateProjectView />} />
                    <Route path="/projects/:projectID/edit" element={<EditProjectView />} />
                    <Route path="/projects/:projectID" element={<ProjectDetailsView />} />
                    <Route path="/projects/:projectID/team" element={<ProjectTeamView />} />
                    <Route element={<ProfileLayout />}>
                        <Route path="/profile" element={<ProfileView />} />
                        <Route path="/profile/password" element={<ChangePasswordView />} />
                    </Route>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} index />
                    <Route path="/auth/create-account" element={<RegisterView />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
                    <Route path="/auth/request-code" element={<RequestConfirmationCodeView />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
                    <Route path="/auth/new-password" element={<NewPasswordView />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="*" element={<NotFound />} index />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}