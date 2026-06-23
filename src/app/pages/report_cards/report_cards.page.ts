// Formule de la moyenne pondérée :
// Moyenne = Σ(note × coefficient) / Σ(coefficients)
// Exemple :
// Maths : 15/20 × coef.4 = 60
// Français: 12/20 × coef.4 = 48
// Histoire: 14/20 × coef.2 = 28
// Somme points = 60 + 48 + 28 = 136
// Somme coeff = 4 + 4 + 2 = 10
// Moyenne = 136 / 10 = 13.6

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
IonMenuButton, IonButton, IonIcon, IonItem, IonLabel,
IonSelect, IonSelectOption, IonCard, IonCardHeader,
IonCardTitle, IonCardSubtitle, IonCardContent,
IonGrid, IonRow, IonCol, IonBadge, IonList
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { printOutline, refreshOutline } from 'ionicons/icons';
import { ReportCardService } from '../../services/report_card.service';
import { StudentService } from '../../services/student.service';
import { Student, ReportCard } from '../../models';
@Component({
selector: 'appreport_cards',
templateUrl: './report_cards.page.html',
standalone: true,
imports: [
  CommonModule, FormsModule,
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonMenuButton, IonButton, IonIcon, IonItem, IonLabel,
  IonSelect, IonSelectOption, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent,
  IonGrid, IonRow, IonCol, IonBadge, IonList
  ]
  })
  export class ReportCardsPage implements OnInit {
  students: Student[] = [];
  selectedStudentId: number | null = null;
  selectedPeriode = 'Trimestre 1';
  periodes = ['Trimestre 1', 'Trimestre 2', 'Trimestre 3'];
  reportCard: ReportCard | null = null;
  rang: number | null = null;
  constructor(
  private reportCardService: ReportCardService,
  private studentService: StudentService
  ) {
  addIcons({ printOutline, refreshOutline });
  }
  ngOnInit() {
  this.students = this.studentService.getAll();
  }
  // Génère le bulletin lorsque l'élève ou la période change
  generate() {
  if (!this.selectedStudentId) return;
  this.reportCard = this.reportCardService.generate(
  this.selectedStudentId,
  this.selectedPeriode
  );
  // Calculer le rang si la classe est connue
  if (this.reportCard) {
  const ranks = this.reportCardService.getRanks(
  this.reportCard.classe,
  this.selectedPeriode
  );
  this.rang = ranks.get(this.selectedStudentId) ?? null;
  }
  }
  // Retourne la couleur selon la mention
  getMentionColor(mention: string): string {
  const colors: Record<string, string> = {
  'Très Bien': 'success',
  'Bien': 'primary',
'Assez Bien': 'secondary',
'Passable': 'warning',
'Insuffisant': 'danger',
};
return colors[mention] || 'medium';
}
// Export PDF via l'API d'impression du navigateur
printBulletin() {
window.print();
}
}