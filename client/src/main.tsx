import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import CreatorPage from "./pages/CreatorPage.tsx";
import DetailedForm from "./pages/DetailedForm.tsx";
import AnswerForm from "./pages/AnswerForm.tsx";

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
