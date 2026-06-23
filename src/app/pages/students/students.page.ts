import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
IonMenuButton, IonButton, IonIcon, IonList, IonItem,
IonLabel, IonSearchbar, IonFab, IonFabButton,
IonModal, IonInput, IonSelect, IonSelectOption,
AlertController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models';
@Component({
selector: 'app-students',
templateUrl: './students.page.html',
standalone: true,
imports: [
CommonModule, FormsModule,
IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
IonMenuButton, IonButton, IonIcon, IonList, IonItem,
IonLabel, IonSearchbar, IonFab, IonFabButton,
IonModal, IonInput, IonSelect, IonSelectOption,
]
})
export class StudentsPage implements OnInit {
  students: Student[] = []; // Liste complète
  filteredStudents: Student[] = []; // Liste filtrée par recherche
  showModal = false; // Contrôle l'affichage du modal
  isEditing = false; // Mode ajout ou modification
  // Formulaire vide — sera rempli lors de l'ajout ou de l'édition
  form: Partial<Student> = this.emptyForm();
  // Liste des classes disponibles
  classes = ['6ème', '5ème', '4ème', '3ème', 'Seconde', 'Première', 'Terminale A',
  'Terminale D'];
  constructor(
  private studentService: StudentService,
  private alertCtrl: AlertController,
  private toastCtrl: ToastController
  ) {
  addIcons({ addOutline, createOutline, trashOutline });
  }
  ngOnInit() { this.load(); }
  // Charge les élèves depuis le service
  load() {
  this.students = this.studentService.getAll();
  this.filteredStudents = [...this.students];
  }
  // Filtre en temps réel lors de la saisie dans la barre de recherche
  onSearch(event: CustomEvent) {
  const query = event.detail.value || '';
  this.filteredStudents = query
  ? this.studentService.search(query)
  : [...this.students];
  }
  // Ouvre le modal en mode ajout
  openAdd() {
  this.form = this.emptyForm();
  this.isEditing = false;
  this.showModal = true;
  }
  // Ouvre le modal en mode édition avec les données de l'élève
  openEdit(student: Student) {
  // Spread operator : copie l'objet pour éviter de modifier l'original
  this.form = { ...student };
  this.isEditing = true;
  this.showModal = true;
}
// Sauvegarde (ajout ou modification)
save() {
if (!this.form.nom || !this.form.prenom || !this.form.classe) {
this.showToast('Veuillez remplir tous les champs obligatoires', 'warning');
return;
}
if (this.isEditing) {
this.studentService.update(this.form as Student);
this.showToast('Élève modifié avec succès', 'success');
} else {
this.studentService.add(this.form as Omit<Student, 'id'>);
this.showToast('Élève ajouté avec succès', 'success');
}
this.showModal = false;
this.load();
}
// Demande confirmation avant suppression
async confirmDelete(student: Student) {
const alert = await this.alertCtrl.create({
header: 'Confirmer la suppression',
message: `Supprimer ${student.prenom} ${student.nom} ?`,
buttons: [
{ text: 'Annuler', role: 'cancel' },
{
text: 'Supprimer',
role: 'destructive',
handler: () => {
this.studentService.delete(student.id);
this.showToast('Élève supprimé', 'danger');
this.load();
}
}
]
});
await alert.present();
}
// Retourne un formulaire vide avec des valeurs par défaut
private emptyForm(): Partial<Student> {
return { nom: '', prenom: '', matricule: '', classe: '', dateNaissance: new Date() };
}
// Affiche un toast (message temporaire en bas d'écran)
private async showToast(message: string, color: string) {
const toast = await this.toastCtrl.create({
message, color, duration: 2000, position: 'bottom'
});
await toast.present();
}
}