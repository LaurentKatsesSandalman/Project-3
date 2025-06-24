import styles from "./DetailedForm.module.css";
import FormCreator from "../../components/FormCreator/FormCreator";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import FormResult from "../../components/FormResult/FormResult";

function DetailedForm() {
    const [viewMode, setViewMode] = useState<"preview" | "edit" | "result">(
        "edit"
    );
    return (
        <>
            <NavBar viewMode={viewMode} setViewMode={setViewMode} />
            {viewMode === "edit" && <FormCreator />}
            {viewMode === "result" && <FormResult />}
        </>
    );
}

export default DetailedForm;
