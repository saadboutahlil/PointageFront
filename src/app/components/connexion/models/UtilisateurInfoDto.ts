export interface UtilisateurInfoDto{
    type: string;
    utilisateur: Utilisateur;
    }
    export interface Utilisateur{
        utilisateurId: number;
        nom: string;
        prenom: string;
        dateNaissance: Date;
        telephone: string;
        email: string;
        login: string;
        password: string;
        id: number;
        }