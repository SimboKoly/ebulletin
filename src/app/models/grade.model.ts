export interface Grade {
  id: number; // Identifiant unique de la note
  studentId: number; // Référence vers l'élève (clé étrangère)
  subjectId: number; // Référence vers la matière (clé étrangère)
  note: number; // La note sur 20 (ex: 14.5)
  appreciation?: string;// Commentaire optionnel du professeur
  periode: string; // Période d'évaluation (ex: 'Trimestre 1')
  }