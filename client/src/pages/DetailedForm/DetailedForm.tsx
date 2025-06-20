import styles from "./DetailedForm.module.css";
import FormCreator from "../../components/FormCreator/FormCreator";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
// choppe :form_id de l'url
// fetch les infos de formulaire pour form_id = xx

function DetailedForm() {
	const [viewMode, setViewMode] = useState<"preview"|"edit"|"result">("edit")
	// 3 value entre create / show /data
	return (
		<>
			<h1>DetailedForm</h1>
			<NavBar viewMode={viewMode} setViewMode={setViewMode}/>
			{viewMode==="edit"&&<FormCreator />}
			
			{/* <detail de la nav bar + chgmt valeur/> */}
			{/*puis switch case en foncion de la value nav bar
		cas1 : <CreateForm>
		cas2 : <AnswerForm> <= normalement, on n'a pas besoin de créer 
		cas3 : <Data:>*/}
		</>
	);
}

export default DetailedForm;
