import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
IonMenuButton, IonButton, IonIcon, IonList, IonItem,
IonLabel, IonFab, IonFabButton, IonModal, IonInput,
IonSelect, IonSelectOption, IonTextarea, IonBadge,
AlertController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';
import { GradeService } from '../../services/grade.service';
import { StudentService } from '../../services/student.service';
import { SubjectService } from '../../services/subject.service';
import { Grade, Student, Subject } from '../../models';
@Component({
selector: 'app-grades',
templateUrl: './grades.page.html',
standalone: true,
imports: [
CommonModule, FormsModule,
IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
IonMenuButton, IonButton, IonIcon, IonList, IonItem,
IonLabel, IonFab, IonFabButton, IonModal, IonInput,
IonSelect, IonSelectOption, IonTextarea, IonBadge
]
})
export class GradesPage implements OnInit {
grades: Grade[] = [];
students: Student[] = [];
subjects: Subject[] = [];
showModal = false;
isEditing = false;
form: Partial<Grade> = this.emptyForm();
periodes = ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'];
constructor(
  private gradeService: GradeService,
  private studentService: StudentService,
  private subjectService: SubjectService,
  private alertCtrl: AlertController,
  private toastCtrl: ToastController
  ) {
  addIcons({ addOutline, createOutline, trashOutline });
  }
  ngOnInit() { this.load(); }
  load() {
  this.grades = this.gradeService.getAll();
  this.students = this.studentService.getAll();
  this.subjects = this.subjectService.getAll();
  }
  // Obtient le nom de l'élève à partir de son ID
  getStudentName(id: number): string {
  const s = this.students.find(st => st.id === id);
  return s ? `${s.prenom} ${s.nom}` : 'Inconnu';
  }
  // Obtient le libellé de la matière à partir de son ID
  getSubjectName(id: number): string {
  const s = this.subjects.find(sub => sub.id === id);
  return s ? s.libelle : 'Inconnu';
  }
  // Couleur du badge selon la note
  getNoteColor(note: number): string {
  if (note >= 14) return 'success';
  if (note >= 10) return 'warning';
  return 'danger';
  }
  openAdd() {
  this.form = this.emptyForm();
  this.isEditing = false;
  this.showModal = true;
  }
  openEdit(grade: Grade) {
  this.form = { ...grade };
  this.isEditing = true;
  this.showModal = true;
  }
  save() {
    if (!this.form.studentId || !this.form.subjectId || this.form.note === undefined) {
    this.showToast('Élève, matière et note sont obligatoires', 'warning');
    return;
    }
    if (this.form.note < 0 || this.form.note > 20) {
    this.showToast('La note doit être comprise entre 0 et 20', 'warning');
    return;
    }
    if (this.isEditing) {
    this.gradeService.update(this.form as Grade);
    } else {
    this.gradeService.add(this.form as Omit<Grade, 'id'>);
    }
    this.showModal = false;
    this.load();
    this.showToast('Note enregistrée', 'success');
    }
    async confirmDelete(grade: Grade) {
    const alert = await this.alertCtrl.create({
    header: 'Supprimer la note',
    message: 'Supprimer cette note définitivement ?',
    buttons: [
    { text: 'Annuler', role: 'cancel' },
    { text: 'Supprimer', role: 'destructive', handler: () => {
    this.gradeService.delete(grade.id);
    this.load();
    this.showToast('Note supprimée', 'danger');
    }}
    ]
    });
    await alert.present();
    }
    private emptyForm(): Partial<Grade> {
    return { studentId: undefined, subjectId: undefined, note: undefined,
    appreciation: '', periode: 'Trimestre 1' };
    }
    private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, color, duration: 2000, position:
    'bottom' });
    await toast.present();
    }
    }