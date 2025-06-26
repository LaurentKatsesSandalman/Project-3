import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import settingIcon from './../../assets/icons/cross.png';
import styles from './../DetailsItem/detailsItem.module.css';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import type { FormItem } from '../../types/form';


type ItemProps = {
    form: FormItem;
    setForms: React.Dispatch<React.SetStateAction<any>>;
    onCloseDetails?: () => void;
};

function DetailsItem({ form, onCloseDetails, setForms}: ItemProps) {
    const navigate = useNavigate();
    const [openMenu] = useState(true);
    const { authToken, setAuthToken} = useAppContext();
    const onDelete = async (id: number) => {
        try {
            const response = await axios.delete(
                 `${import.meta.env.VITE_QUICKY_API_URL}/api/forms/${id}`,
                {
                    headers: {
                        Authorization : `Bearer ${authToken}`
                    },
                }

            );
            setForms((prev:FormItem[])=> prev.filter((item)=> item.form_id !== id))
        } catch (err: any){
            console.error(
                "Une erreur s'est produite lors de la suppression du formulaire",err
            );
            if (err.reponse?.status === 401 || err.response?.status === 403) {
                setAuthToken(null);
            }
            alert ("Impossible de supprimer le formulaire pour le moment, veuillez réessayer plus tard");
        }
    };
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
                                    <button className={styles.deleteButton} onClick={() => onDelete(form.form_id)}>Supprimer définitivement</button> 
                                </li>
                            </ul>
                        </div>
                    )}
            </section>
        </>
    )
};

export default DetailsItem;

