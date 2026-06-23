import { Injectable } from '@angular/core';
import { GradeService } from './grade.service';
import { SubjectService } from './subject.service';
import { StudentService } from './student.service';
import { ReportCard, ReportCardLine } from '../models/report_card.model';
@Injectable({ providedIn: 'root' })
export class ReportCardService {
  // Injection de dépendances : Angular injecte automatiquement ces services
  constructor(
  private gradeService: GradeService,
  private subjectService: SubjectService,
  private studentService: StudentService
  ) {}
  // ─── Générer le bulletin d'un élève ──────────────────────
  generate(studentId: number, periode: string): ReportCard | null {
  const student = this.studentService.getById(studentId);
  if (!student) return null; // Élève introuvable
  // Récupérer toutes les notes de l'élève pour cette période
  const grades = this.gradeService.getByStudentAndPeriode(studentId, periode);
  const subjects = this.subjectService.getAll();
  // Construire les lignes du bulletin
  const lines: ReportCardLine[] = [];
  let totalPoints = 0; // Somme des (note × coefficient)
  let totalCoeff = 0; // Somme des coefficients
  grades.forEach(grade => {
  const subject = subjects.find(s => s.id === grade.subjectId);
  if (!subject) return;
  const noteCoeff = grade.note * subject.coefficient;
  totalPoints += noteCoeff;
  totalCoeff += subject.coefficient;
  lines.push({
  subject: subject.libelle,
  code: subject.code,
  coefficient: subject.coefficient,
  note: grade.note,
  noteCoeff: noteCoeff,
  appreciation: grade.appreciation || this.getAppreciation(grade.note),
  });
  });
  // Calcul de la moyenne générale
  const moyenne = totalCoeff > 0
  ? Math.round((totalPoints / totalCoeff) * 100) / 100
  : 0;
  return {
  id: studentId,
  student: `${student.prenom} ${student.nom}`,
  matricule: student.matricule,
  classe: student.classe,
  periode,
lines,
moyenne,
mention: this.getMention(moyenne),
};
}
// ─── Calculer les rangs pour une classe ──────────────────
getRanks(classe: string, periode: string): Map<number, number> {
const students = this.studentService.getAll()
.filter(s => s.classe === classe);
// Calculer la moyenne de chaque élève
const moyennes = students.map(s => ({
studentId: s.id,
moyenne: this.generate(s.id, periode)?.moyenne ?? 0
}));
// Trier par moyenne décroissante
moyennes.sort((a, b) => b.moyenne - a.moyenne);
// Créer une Map { studentId => rang }
const ranks = new Map<number, number>();
moyennes.forEach((item, index) => {
ranks.set(item.studentId, index + 1);
});
return ranks;
}
// ─── Déterminer la mention ────────────────────────────────
getMention(moyenne: number): string {
if (moyenne >= 16) return 'Très Bien';
if (moyenne >= 14) return 'Bien';
if (moyenne >= 12) return 'Assez Bien';
if (moyenne >= 10) return 'Passable';
return 'Insuffisant';
}
// ─── Déterminer l'appréciation d'une note ────────────────
getAppreciation(note: number): string {
if (note >= 16) return 'Excellent';
if (note >= 14) return 'Très bien';
if (note >= 12) return 'Bien';
if (note >= 10) return 'Assez bien';
if (note >= 8) return 'Passable';
return 'Insuffisant';
}
}