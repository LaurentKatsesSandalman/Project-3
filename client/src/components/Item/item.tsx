import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../Button/Button";
import settingIcon from "./../../assets/icons/wheel.png";
import styles from "./../Item/Item.module.css";
import DetailsItem from "../DetailsItem/detailsItem";

export type FormItem = {
    form_id: number;
    form_name: string;
    link: string; // URL publique du formulaire
    creation_date: string;
    is_closed: boolean;
};
// commentaire de Jordan : Il est mieux de sortir les typages ( sauf props ) pour plutot les ajouters dans un dossier type, au cas ou on aurait besoin de l'utiliser dans plusieurs fichiers.
// Perso j'ai utilisé les noms donnés dans le schema.sql pour le nom de mes clés pour s'y retrouver plus facilement par exemple : form_id, form_name, creation_date, etc.

type ItemProps = {
    form: FormItem;
    setForms: React.Dispatch<React.SetStateAction<any>>;
    onPublish: (id: number) => void;
    onClose: (id: boolean) => void;
    onDelete: (id: number) => void;
};

function Item({ form, onPublish, onClose, onDelete, setForms }: ItemProps) {
    const navigate = useNavigate();
    const [openMenu, SetOpenMenu] = useState(false);
    const handleCloseDetails = () => {
        SetOpenMenu(false);
    };
    return (
        <>
            <section className={styles.headerSection}>
                {/*section pour les détails de l'item */}
                {openMenu && (
                    <div className={styles.detailsContainer}>
                        <DetailsItem
                            form={form}
                            onPublish={onPublish}
                            onClose={onClose}
                            onDelete={onDelete}
                            onCloseDetails={handleCloseDetails}
                            setForms={setForms}
                        />
                    </div>
                )}
                <div className={styles.h2Container}>
                    <h2 className={styles.h2}>{form.form_name}</h2>
                    <div className={styles.wheelButton}>
                        <button
                            className={styles.wheelContainer}
                            onClick={() => SetOpenMenu((prev) => !prev)}
                        >
                            <img
                                className={styles.imgWheel}
                                src={settingIcon}
                                alt="Paramètres"
                            />
                        </button>
                    </div>
                </div>
                <div className={styles.linkContainer}>
                    <p
                        onClick={() => {
                            navigator.clipboard.writeText(
                                `https://quicky.com/form/${form.form_id}`
                            );
                            alert("Lien copié !");
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        Lien vers le formulaire
                    </p>
                </div>
                <div className={styles.itemBody}>
                    <ul className={styles.itemList}>
                        <li className={styles.bulletPoint}>
                            <p>
                                Crée le :{" "}
                                {new Date(
                                    form.creation_date
                                ).toLocaleDateString()}
                            </p>
                        </li>
                        <li>
                            <p>
                                Statut : {form.is_closed ? "Fermé" : "Ouvert"}{" "}
                            </p>
                        </li>
                        {/* <li><p>Nombre de réponses : </p></li> Laurent doit valider ce statut */}
                    </ul>
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        style={{
                            borderRadius: "0 0 4px 4px",
                            maxWidth: "100%",
                        }}
                        variant="primary"
                        onClick={() => navigate(`/forms/${form.form_id}`)}
                    >
                        Editer
                    </Button>
                    {/*detail form pour switch vers la page d'édition du formulaire*/}
                    {/* <Button style={{borderRadius:"0"}} variant ="primary" onClick={() => navigate(`/form/${form.form_id}`)}>Apperçu</Button>
                    <Button style={{borderRadius:"0 0 4px 0"}} variant="primary" onClick={()=> navigate(`/form/${form.form_id}`)}>Résultat</Button> */}
                </div>
            </section>
        </>
    );
}

export default Item;
