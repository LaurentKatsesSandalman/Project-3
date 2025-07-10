import { Outlet } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

function PublicLayout() {
    return (
        <AppProvider>
            <main>
                <Outlet />
            </main>
        </AppProvider>
    );
}

export default PublicLayout;
