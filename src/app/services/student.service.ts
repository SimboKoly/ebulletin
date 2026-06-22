import { Injectable } from '@angular/core';
import { Student } from '../models';
@Injectable({
providedIn: 'root' // Le service est disponible partout dans l'app
})
export class StudentService {
// Clé utilisée pour identifier les données dans LocalStorage
private readonly STORAGE_KEY = 'ebulletin_students';
// ─── Récupérer tous les élèves ─────────────────────────
getAll(): Student[] {
  const data = localStorage.getItem(this.STORAGE_KEY);
  // Si aucune donnée, retourner un tableau vide
  return data ? JSON.parse(data) : [];
  }
  // ─── Récupérer un élève par son ID ──────────────────────
  getById(id: number): Student | undefined {
  // Array.find() retourne le premier élément qui correspond
  return this.getAll().find(s => s.id === id);
  }
  // ─── Ajouter un élève ───────────────────────────────────
  add(student: Omit<Student, 'id'>): Student {
  // Omit<Student, 'id'> = Student sans le champ id
  // On génère l'id automatiquement
  const students = this.getAll();
  const newStudent: Student = {
  ...student, // Copie tous les champs reçus
  // Date.now() génère un timestamp unique comme ID
  id: Date.now()
  };
  students.push(newStudent);
  this.save(students);
  return newStudent;
  }
  // ─── Modifier un élève ──────────────────────────────────
  update(updated: Student): void {
  const students = this.getAll();
  // Trouver l'index de l'élève à modifier
  const index = students.findIndex(s => s.id === updated.id);
  if (index !== -1) {
  students[index] = updated; // Remplacer par la version modifiée
  this.save(students);
  }
  }
  // ─── Supprimer un élève ─────────────────────────────────
  delete(id: number): void {
  // filter() crée un nouveau tableau sans l'élément supprimé
  const students = this.getAll().filter(s => s.id !== id);
  this.save(students);
  }
  // ─── Rechercher des élèves ──────────────────────────────
  search(query: string): Student[] {
  const q = query.toLowerCase();
  return this.getAll().filter(s =>
    s.nom.toLowerCase().includes(q) ||
    s.prenom.toLowerCase().includes(q) ||
    s.matricule.toLowerCase().includes(q) ||
    s.classe.toLowerCase().includes(q)
    );
    }
    // ─── Méthode privée de sauvegarde ──────────────────────
    private save(students: Student[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(students));
    }
    }