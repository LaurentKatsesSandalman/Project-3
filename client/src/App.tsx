import { Outlet } from 'react-router-dom';
import { useState } from "react";
import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import FormCreator from "./components/FormCreator/FormCreator";

function App() {
  return (
    <>
      {/* Si on a un contexte, il faudra mettre le provider ici */}
      <TopBar />
      <main>
        <Outlet />
      </main>
      <FormCreator />
      <Footer />
    </>
  );
}

export default App;
