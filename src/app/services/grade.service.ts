import { Injectable } from '@angular/core';
import { Grade } from '../models';
@Injectable({ providedIn: 'root' })
export class GradeService {
private readonly STORAGE_KEY = 'ebulletin_grades';
getAll(): Grade[] {
const data = localStorage.getItem(this.STORAGE_KEY);
return data ? JSON.parse(data) : [];
}
// Récupérer toutes les notes d'un élève spécifique
getByStudent(studentId: number): Grade[] {
return this.getAll().filter(g => g.studentId === studentId);
}
// Récupérer les notes d'un élève pour une période donnée
getByStudentAndPeriode(studentId: number, periode: string): Grade[] {
return this.getAll().filter(
g => g.studentId === studentId && g.periode === periode
);
}
add(grade: Omit<Grade, 'id'>): Grade {
const grades = this.getAll();
const newGrade: Grade = { ...grade, id: Date.now() };
grades.push(newGrade);
this.save(grades);
return newGrade;
}
update(updated: Grade): void {
const grades = this.getAll();
const index = grades.findIndex(g => g.id === updated.id);
if (index !== -1) {
grades[index] = updated;
this.save(grades);
}
}
delete(id: number): void {
const grades = this.getAll().filter(g => g.id !== id);
this.save(grades);
}
private save(grades: Grade[]): void {
localStorage.setItem(this.STORAGE_KEY, JSON.stringify(grades));
}
}