// Interface pour une ligne de bulletin (une matière avec sa note)
export interface ReportCardLine {
  subject: string; // Nom de la matière
  code: string; // Code de la matière
  coefficient: number; // Coefficient de la matière
  note: number; // Note obtenue sur 20
  noteCoeff: number; // note * coefficient (calculé automatiquement)
  appreciation: string; // Appréciation textuelle
  }

  // Interface pour le bulletin complet
  export interface ReportCard {
    id: number;
    student: string; // Nom complet de l'élève
    matricule: string; // Matricule de l'élève
    classe: string; // Classe de l'élève
    periode: string; // Période du bulletin
    lines: ReportCardLine[]; // Tableau des lignes (une par matière)
    moyenne: number; // Moyenne générale calculée
    mention: string; // Mention (Très Bien, Bien, etc.)
    rang?: number; // Rang dans la classe (optionnel)
  }