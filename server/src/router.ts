import express from "express";

const router = express.Router();


//créer/lire un nouveau formulaire
import formActions from "./modules/form/formActions";
//ici comme pour les prochaines section, je ne me suis pas posé de question sur la liste précise. Typiquement, il devra y avoir des updates et des delete, qui ici ne sont pas mis
router.get("/api/forms", formActions.browse);
router.get("/api/forms/:id", formActions.read);
router.post("/api/forms", formActions.add);

//créer/lire un nouveau "créateur de formulaire"
import userActions from "./modules/user/userActions";
router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", userActions.add);

//créer/lire une nouvelle "réponse" à un formulaire existant
import answerActions from "./modules/answer/answerActions";
router.get("/api/:form_id/answers", answerActions.browse);// il me semble nécessaire de rajouter :form_id, qu'en pensez-vous ?
router.get("/api/:form_id/answers/:id", answerActions.read);
router.post("/api/:form_id/answers", answerActions.add);

export default router;