import { Outlet } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import TopBar from "./components/TopBar/TopBar";
import "./App.css";
import CreatorPage from "./pages/CreatorPage/CreatorPage";
import Item from "./components/Item/item";

function App() {
    return (
        <AppProvider>
            <TopBar />
            <main>
                {/* <Outlet /> */}
                <CreatorPage />
            </main>
        </AppProvider>
    );
}

export default App;
