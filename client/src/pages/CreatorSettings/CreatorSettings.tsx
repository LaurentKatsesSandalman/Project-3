import { useParams } from "react-router-dom";
import styles from "./CreatorSettings.module.css";

function CreatorSettings() {
    const params = useParams();
    return <div>User id: {params.user_id}</div>
}

export default CreatorSettings;