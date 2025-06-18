//créer le typing pour le form 
export type FormItem = {
    id: string; // Identifiant unique du formulaire
    name: string; // Nom du formulaire
    createdAt: string; // Date de création du formulaire
    link: string; // URL publique du formulaire
    isClosed: boolean; // Indique si le formulaire est fermé ou ouvert
    fields: Array<{
        id: string; // Identifiant unique du champ
        label: string; // Libellé du champ
        type: string; // Type de champ (texte, choix multiple, etc.)
        required: boolean; // Indique si le champ est obligatoire
        options?: string[]; // Options pour les champs de type choix multiple
        order: number; // Ordre d'affichage du champ dans le formulaire
        createdAt: string; // Date de création du champ
        updatedAt: string; // Date de dernière mise à jour du champ
        formId: string; // Identifiant du formulaire auquel le champ appartient
    }>;
    responsesCount: number; // Nombre de réponses reçues pour le formulaire
    createdBy: {
        userId: string; // Identifiant de l'utilisateur qui a créé le formulaire
        email: string; // Email de l'utilisateur qui a créé le formulaire
    };
    updatedAt: string; // Date de dernière mise à jour du formulaire
    publishedAt?: string; // Date de publication du formulaire (optionnel)
    description?: string; // Description du formulaire (optionnel)
};