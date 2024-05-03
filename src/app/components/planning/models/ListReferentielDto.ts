export interface ListReferentielDto {
    listCollaborateur: Array<collaborateur>;
    listTypePlannification: Array<typePlanification>;
}
export interface collaborateur {
    id: number;
    nom: string;
    prenom: string;
}
export interface typePlanification {
    typePlannificationId: number;
    type: string;
}