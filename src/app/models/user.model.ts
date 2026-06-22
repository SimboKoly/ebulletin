// Type union : un utilisateur est soit 'enseignant' soit 'eleve'
export type UserRole = 'enseignant' | 'eleve' | 'admin';
export interface User {
id: number;
username: string; // Identifiant de connexion
password: string; // Mot de passe (hashé en production)
role: UserRole; // Rôle de l'utilisateur
nom: string;
prenom: string;
studentId?: number; // Référence vers l'élève (seulement si role === 'eleve')
}