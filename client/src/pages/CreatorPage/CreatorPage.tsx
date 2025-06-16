import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Button from "../../components/Button/Button";
import styles from "./CreatorPage.module.css";

function CreatorPage() {
    const [users, setUsers] = useState();

    // TEMP, Remove when real route using authenticateToken is available
    const { authToken, setAuthToken } = useAppContext();
    const handleClick = async () => {
        // COPY THIS WHEN YOU WANT TO REQUEST THE API
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_QUICKY_API_URL}/api/users`, // You could add /${form_id} to the route for example if you want to pass params to your request
                // WHERE YOU WOULD WANT TO ADD THE REQUEST BODY if .post or .patch
                // {
                //     form: formData,
                // },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            setUsers(response.data);
        } catch (err: any) {
            // When there is an issue with the token
            if (err.status === 403 || err.status === 401) {
                setAuthToken(null);
            }
        }
    };

    useEffect(() => {
        console.log(users);
    }, [users]);
    // TEMP END

    return (
        <>
            <h1>Creator page</h1>
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
