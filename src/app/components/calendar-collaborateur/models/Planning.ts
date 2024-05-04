
export class Planning {
    planningId!: number;
    datePlanning!: Date;
    nbrSemaine!: number;
    managerId!: number;
    collaborateurId!: number;
    typePlannification!: typePlanification;
  }
  export interface typePlanification {
    typePlannificationId: number;
    type: string;
}