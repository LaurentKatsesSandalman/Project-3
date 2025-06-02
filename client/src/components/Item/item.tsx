import { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Button from '../Button/button';
import settingIcon from 'src/assets/icons/wheel.png';

export type FormItem = {
    id: string;
    name: string;
    createdAt: string; // ISO date string
    publishedAt?: string; // ISO date string, optional
    link: string; //URL publique du formulaire
    isClosed: boolean; 
};

type ItemProps = {
    form: FormItem;
    onPublish: (id: string) => void;
    onClose: (id: string) => void;
    onDelete: (id: string) => void;
};

function Item({ form, onPublish, onClose, onDelete }: ItemProps) {
    const navigate = useNavigate();
    const [openMenu, SetOpenMenu] = useState(false);

    return (
        <>
            <section className="Item_contenainer">
                <div className="Item_header">
                    <h2 className="Item_title">{form.name}</h2>
                    <button className="absolute top-3 right-3 p-2" onClick={() => setOpenMenu((o) => !o)}>
				        <img src={settingsIcon} alt="Paramètres"/>
                    </button>
                    {openMenu && (
                        <div className="parameters-menu">
                            <ul>
                                <li>
                                    <button onClick={() => onPublish(form.id)}>Publier</button>
                                </li>
                                <li>
                                    <button onClick={() => onClose(form.id)}>Clôturer</button>
                                </li>
                                <li>
                                    <button onClick={() => onDelete(form.id)}>Supprimer définitivement</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="Item_body">
                    <ul>
                        <li><p>Crée le : {new Date(form.createdAt).toLocaleDateString()} </p></li>
                        <li><p>Publié le : {new Date(form.publishedAt).toLocaleDateString()}</p></li>
                        <li><p>Statut : {form.isClosed ? 'Fermé' : 'Ouvert'}</p></li>
                    </ul>
                </div>
                <div className="Item_footer">
                    <Button onClick={()=> navigate(`/edit-form/${form.id}}`)}>Editer</button>
                    <Button onClick={() => navigate(`/form/${form.id}`)}>Apperçu</Button>
                    <Button onClick={()=> navigate(`/form/${form.id}`)}>Résultat</Button>
                </div>
            </section>
        </>
    )
};

export default Item;

