// import { useState } from 'react';
// import {useNavigate, Link} from 'react-router-dom';
// import Button from '../Button/Button';
// import settingIcon from '../assets/icons/wheel.png';

// export type FormItem = {
//     id: string;
//     name: string;
//     createdAt: string; // ISO date string
//     publishedAt?: string; // ISO date string, optional
//     link: string; //URL publique du formulaire
//     isClosed: boolean; 
// };
// commentaire de Jordan : Il est mieux de sortir les typages ( sauf props ) pour plutot les ajouters dans un dossier type, au cas ou on aurait besoin de l'utiliser dans plusieurs fichiers. Perso j'ai utilisé les noms donnés dans le schema.sql pour le nom de mes clés pour s'y retrouver plus facilement par exemple : form_id, form_name, creation_date, etc.

// type ItemProps = {
//     form: FormItem;
//     onPublish: (id: string) => void;
//     onClose: (id: string) => void;
//     onDelete: (id: string) => void;
// };

// function Item({ form, onPublish, onClose, onDelete }: ItemProps) {
//     const navigate = useNavigate();
//     const [openMenu, SetOpenMenu] = useState(false);

//     return (
//         <>
//             <section className="Item_contenainer">
//                 <div className="Item_header">
//                     <h2 className="Item_title">{form.name}</h2>
//                     <button className="absolute top-3 right-3 p-2" onClick={() => SetOpenMenu((o) => !o)}>
// 				        <img src={settingIcon} alt="Paramètres"/>
//                     </button>
//                     {openMenu && (
//                         <div className="parameters-menu">
//                             <ul>
//                                 <li>
//                                     <button onClick={() => onPublish(form.id)}>Publier</button>
//                                 </li>
//                                 <li>
//                                     <button onClick={() => onClose(form.id)}>Clôturer</button>
//                                 </li>
//                                 <li>
//                                     <button onClick={() => onDelete(form.id)}>Supprimer définitivement</button>
//                                 </li>
//                             </ul>
//                         </div>
//                     )}
//                     <Link to={form.link} ><p>Lien vers du formulaire</p></Link>
//                 </div>
//                 <div className="Item_body">
//                     <ul>
//                         <li><p>Crée le : {new Date(form.createdAt).toLocaleDateString()} </p></li>
//                         <li><p>Statut : {form.isClosed ? 'Fermé' : 'Ouvert'}</p></li>
//                         {/* <li><p>Nombre de réponses : </p></li> Laurent doit valider ce statut*/}
//                     </ul>
//                 </div>
//                 faire un bouton pour l'aperçu du formulaire
//                 <div className="Item_footer">
//                     <Button  variant= "primary"onClick={()=> navigate(`/edit-form/${form.id}`)}>Editer</Button>
//                     <Button variant ="primary" onClick={() => navigate(`/form/${form.id}`)}>Apperçu</Button>
//                     <Button variant="primary" onClick={()=> navigate(`/form/${form.id}`)}>Résultat</Button>
//                 </div>
//             </section>
//         </>
//     )
// };

// export default Item;

