import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import settingIcon from './../../assets/icons/cross.png';
import styles from './../DetailsItem/detailsItem.module.css';
import axios from 'axios';

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
    onPublish: (id: number) => void;
    onClose: (id: boolean) => void;
    onDelete: (id: number) => void;
    onCloseDetails?: () => void;
};

function DetailsItem({ form, onPublish, onClose, onCloseDetails }: ItemProps) {
    const navigate = useNavigate();
    const [openMenu] = useState(true);
    const onDelete = async (id: number) => {
        try{await axios.delete(`/api/forms/${id}`);
            console.log(`formulaire ${id} supprimé avec succès`);
         }catch (error) {console.error(`Erreur lors de la suppression du formulaire ${id}`, error)}
    };
    console.log(form);
    return (
        <>
            <section className={styles.bodySection}>
                <section className={styles.headerSection}>
                <div className={styles.h2Container}>
                    <h2 className={styles.h2}>{form.form_name}</h2>
                </div>
                <div className={styles.linkContainer}>
                        <div className={styles.crossButton}>
                            <button className={styles.crossContainer} onClick={onCloseDetails}>
				                <img className={styles.imgCross} src={settingIcon} alt="Fermeture"/>
                            </button> 
                    </div>
                </div>
                </section>
                    {openMenu && (
                        <div className={styles.bulletPoint}>
                            <ul>
                                <li>
                                    <button onClick={() => onPublish(form.form_id)}>Publier</button>
                                </li> {/* partie non géré pour l'instant*/}
                                <li>
                                    <button onClick={() => onClose(form.is_closed)}>Clôturer</button>
                                </li> {/* partie non géré pour l'instant*/}
                                <li>
                                    <button onClick={() => onDelete(form.form_id)}>Supprimer définitivement</button> {/* fetch avec axio pour delete à l'adresse correct API vers l'id (à voir avec L)*/}
                                </li>
                            </ul>
                        </div>
                    )}
            </section>
        </>
    )
};

export default DetailsItem;

