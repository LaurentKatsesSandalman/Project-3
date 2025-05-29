import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<>
			{/* si on a un context, il faudra mettre le provider là */}
			<TopBar /> {/* les noms sont provisoires*/}
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default App;
