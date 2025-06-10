import { useParams } from "react-router-dom";
import styles from "./CreatorPage.module.css";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";

// choppe :user_id de l'url
// fetch les formulaire pour user_id = xx

function CreatorPage() {
    const params = useParams();

    const [users, setUsers] = useState();

    // TEMP, used as an exemple
    const { authToken, setAuthToken } = useAppContext();
    const handleClick = async () => {
        // COPY THIS WHEN YOU WANT TO REQUEST THE API
        try {
            const response = await axios.get(
                `http://localhost:3000/api/users`,
                // WHERE YOU WOULD WANT TO ADD THE REQUEST BODY
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            setUsers(response.data);
        } catch (err: any) {
            // TEMP
            console.log(err);
            // When there is an issue with the token
            if (err.status === 403 || err.status === 401) {
                // Maybe do something to show the user he is being disconnected
                setAuthToken(null);
            }
        }
    };

    useEffect(() => {
        console.log(users);
    }, [users]);
    // END OF TEMP

    return (
        <>
            <h1>Creator page</h1>
            <div>User id: {params.user_id}</div>
            <Button variant="danger" onClick={handleClick}>
                TEST
            </Button>
            {/*map la liste des formulaires
			=> pour chacun, le petit recap avec bouton pour aller plus loin
			*/}
            {/*bouton pour creer nouveau formulaire*/}
        </>
    );
}

export default CreatorPage;
