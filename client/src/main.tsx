import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import Home from "./pages/Home/Home.tsx";
import CreatorPage from "./pages/CreatorPage/CreatorPage.tsx";
import DetailedForm from "./pages/DetailedForm/DetailedForm.tsx";
import AnswerForm from "./pages/AnswerForm/AnswerForm.tsx";
import CreatorSettings from "./pages/CreatorSettings/CreatorSettings.tsx";
import PublicLayout from "./PublicLayout.tsx";

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/forms",
                element: <CreatorPage />,
            },
            {
                path: "/settings",
                element: <CreatorSettings />,
            },
            {
                path: "/forms/:form_id",
                element: <DetailedForm />,
            },
        ],
    },
    // Separate this path from the others to not display the topbar
    {
        element: <PublicLayout />,
        children: [
            {
                path: "/answers/:form_id",
                element: <AnswerForm />,
            },
        ],
    },
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
    ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
