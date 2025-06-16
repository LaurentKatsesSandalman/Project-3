import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import Home from "./pages/Home/Home.tsx";
import CreatorPage from "./pages/CreatorPage/CreatorPage.tsx";
import DetailedForm from "./pages/DetailedForm/DetailedForm.tsx";
import AnswerForm from "./pages/AnswerForm/AnswerForm.tsx";
import CreatorSettings from "./pages/CreatorSettings/CreatorSettings.tsx";

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/:user_id",
				element: <CreatorPage />,
			},
			{
				path: "/settings/:user_id",
				element: <CreatorSettings />,
			},
			{
				path: "/:user_id/:form_id",
				element: <DetailedForm />,
			},
			{
				path: "/answer/:form_id",
				element: <AnswerForm />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
