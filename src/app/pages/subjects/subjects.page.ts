import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
IonMenuButton, IonButton, IonIcon, IonList, IonItem,
IonLabel, IonFab, IonFabButton, IonModal, IonInput,
IonBadge, AlertController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, createOutline, trashOutline } from 'ionicons/icons';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../models';
@Component({
selector: 'app-subjects',
templateUrl: './subjects.page.html',
standalone: true,
imports: [
CommonModule, FormsModule,
IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
IonMenuButton, IonButton, IonIcon, IonList, IonItem,
IonLabel, IonFab, IonFabButton, IonModal, IonInput, IonBadge
]
})
export class SubjectsPage implements OnInit {
subjects: Subject[] = [];
showModal = false;
isEditing = false;
form: Partial<Subject> = this.emptyForm();
constructor(
private subjectService: SubjectService,
private alertCtrl: AlertController,
private toastCtrl: ToastController
) {
addIcons({ addOutline, createOutline, trashOutline });
}
ngOnInit() { this.load(); }
load() { this.subjects = this.subjectService.getAll(); }
openAdd() {
this.form = this.emptyForm();
this.isEditing = false;
this.showModal = true;
}
openEdit(subject: Subject) {
this.form = { ...subject };
this.isEditing = true;
this.showModal = true;
}
save() {
if (!this.form.libelle || !this.form.code || !this.form.coefficient) {
this.showToast('Tous les champs sont obligatoires', 'warning');
return;
}
if (this.isEditing) {
this.subjectService.update(this.form as Subject);
} else {
this.subjectService.add(this.form as Omit<Subject, 'id'>);
}
this.showModal = false;
this.load();
this.showToast(this.isEditing ? 'Matière modifiée' : 'Matière ajoutée', 'success');
}
async confirmDelete(subject: Subject) {
const alert = await this.alertCtrl.create({
header: 'Supprimer la matière',
message: `Supprimer ${subject.libelle} ?`,
buttons: [
{ text: 'Annuler', role: 'cancel' },
{ text: 'Supprimer', role: 'destructive', handler: () => {
this.subjectService.delete(subject.id);
this.load();
this.showToast('Matière supprimée', 'danger');
}}
]
});
await alert.present();
}
private emptyForm(): Partial<Subject> {
return { code: '', libelle: '', coefficient: 1 };
}
private async showToast(message: string, color: string) {
  const toast = await this.toastCtrl.create({ message, color, duration: 2000, position:
  'bottom' });
  await toast.present();
}
}
