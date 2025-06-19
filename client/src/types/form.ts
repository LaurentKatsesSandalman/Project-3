//créer le typing pour le form 

export interface Form  {
    form_id: number;
    is_deployed: boolean;
    is_closed: boolean;
    date_to_close?: string | null;
    creation_date: string | null;
    is_public: boolean;
    multi_answer: boolean;
    original_version_id?: number;
    theme_id: number;
    user_id: number;
    form_name: string;
    form_description: string;
}
