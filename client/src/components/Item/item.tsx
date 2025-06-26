import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import settingIcon from "./../../assets/icons/wheel.png";
import styles from "./../Item/Item.module.css";
import DetailsItem from "../DetailsItem/detailsItem";
import type { FormItem } from "../../types/form";

type ItemProps = {
    form: FormItem;
    setForms: React.Dispatch<React.SetStateAction<any>>;
};

function Item({ form, setForms }: ItemProps) {
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
                                `http://localhost:5173/answers/${form.form_id}`
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
