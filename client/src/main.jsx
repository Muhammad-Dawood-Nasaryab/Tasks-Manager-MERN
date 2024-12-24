import "./styles/global.css";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import Layout from "./components/LayoutComponent.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/register",
				element: <RegisterPage />
			},
			{
				path: "/dashboard",
				element: <DashboardPage />,
			},
			{
				path: "/settings",
				element: <SettingsPage />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthProvider>
				<ModalProvider>
					<LoadingProvider>
						<RouterProvider router={router} />
					</LoadingProvider>
				</ModalProvider>
		</AuthProvider>
	</StrictMode>,
);
