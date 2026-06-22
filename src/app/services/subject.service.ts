import { Injectable } from '@angular/core';
import { Subject } from '../models';
@Injectable({ providedIn: 'root' })
export class SubjectService {
private readonly STORAGE_KEY = 'ebulletin_subjects';
getAll(): Subject[] {
const data = localStorage.getItem(this.STORAGE_KEY);
return data ? JSON.parse(data) : this.getDefaults();
}
// Retourne des matières par défaut si LocalStorage est vide
// Utile pour ne pas avoir à tout saisir manuellement lors des tests
private getDefaults(): Subject[] {
return [
{ id: 1, code: 'MATH', libelle: 'Mathématiques', coefficient: 4 },
{ id: 2, code: 'PHYS', libelle: 'Physique-Chimie', coefficient: 3 },
{ id: 3, code: 'FRAN', libelle: 'Français', coefficient: 4 },
{ id: 4, code: 'HIST', libelle: 'Histoire-Géographie', coefficient: 2 },
{ id: 5, code: 'ANGL', libelle: 'Anglais', coefficient: 3 },
{ id: 6, code: 'SVT', libelle: 'Sciences de la Vie et de la Terre', coefficient: 2
},
];
}
getById(id: number): Subject | undefined {
return this.getAll().find(s => s.id === id);
}
add(subject: Omit<Subject, 'id'>): Subject {
  const subjects = this.getAll();
  const newSubject: Subject = { ...subject, id: Date.now() };
  subjects.push(newSubject);
  this.save(subjects);
  return newSubject;
  }
  update(updated: Subject): void {
  const subjects = this.getAll();
  const index = subjects.findIndex(s => s.id === updated.id);
  if (index !== -1) {
  subjects[index] = updated;
  this.save(subjects);
  }
  }
  delete(id: number): void {
  const subjects = this.getAll().filter(s => s.id !== id);
  this.save(subjects);
  }
  private save(subjects: Subject[]): void {
  localStorage.setItem(this.STORAGE_KEY, JSON.stringify(subjects));
  }
  }