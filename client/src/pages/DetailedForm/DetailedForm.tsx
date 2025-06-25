import styles from "./DetailedForm.module.css";
import FormCreator from "../../components/FormCreator/FormCreator";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import FormResult from "../../components/FormResult/FormResult";
import AnswerForm from "../AnswerForm/AnswerForm";

function DetailedForm() {
    const [viewMode, setViewMode] = useState<"preview" | "edit" | "result">(
        "edit"
    );
    return (
        <>
            <NavBar viewMode={viewMode} setViewMode={setViewMode} />
            {viewMode === "edit" && <FormCreator />}
            {viewMode === "result" && <FormResult />}
            {viewMode === "preview" && <AnswerForm isPreview={true} />}
        </>
    );
}

export default DetailedForm;
