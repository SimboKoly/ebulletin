import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
IonHeader, IonToolbar, IonTitle, IonContent,
IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
IonCardTitle, IonCardContent,
IonIcon, IonList, IonItem, IonLabel, IonBadge,
IonMenuButton, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { peopleOutline, bookOutline, documentTextOutline, trophyOutline } from
'ionicons/icons';
import { StudentService } from '../../services/student.service';
import { SubjectService } from '../../services/subject.service';
import { GradeService } from '../../services/grade.service';
import { Student } from '../../models';
@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.page.html',
standalone: true,
imports: [
CommonModule,
IonHeader, IonToolbar, IonTitle, IonContent,
IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
IonCardTitle, IonCardContent,
IonIcon, IonList, IonItem, IonLabel, IonBadge,
IonMenuButton, IonButtons
]
})
export class DashboardPage implements OnInit {
// Propriétés affichées dans le template
totalStudents = 0;
totalSubjects = 0;
totalGrades = 0;
recentStudents: Student[] = [];
// Injection des services via le constructeur
constructor(
private studentService: StudentService,
private subjectService: SubjectService,
private gradeService: GradeService
) {
addIcons({ peopleOutline, bookOutline, documentTextOutline, trophyOutline });
}
// ngOnInit est appelé une fois après l'initialisation du composant
ngOnInit() {
this.loadStats();
}
loadStats() {
const students = this.studentService.getAll();
this.totalStudents = students.length;
this.totalSubjects = this.subjectService.getAll().length;
this.totalGrades = this.gradeService.getAll().length;
// Les 5 derniers élèves ajoutés (slice(-5) = 5 derniers éléments)
this.recentStudents = students.slice(-5).reverse();
}
}