import FormCreator from "../../components/FormCreator/FormCreator";
import NavBar from "../../components/NavBar/NavBar";
import FormResult from "../../components/FormResult/FormResult";
import AnswerForm from "../AnswerForm/AnswerForm";
import { useAppContext } from "../../context/AppContext";

function DetailedForm() {
    const { viewMode, setViewMode } = useAppContext();
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
