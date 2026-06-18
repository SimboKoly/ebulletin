import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonDatetime
} from '@ionic/angular/standalone';

import { Student } from '../../models/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonDatetime
  ]
})
export class StudentsPage implements OnInit {

  studentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      classe: ['', Validators.required],
      dateNaissance: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.studentForm.valid) {

      const student: Student = {
        id: Date.now(),
        matricule: this.studentForm.value.matricule,
        nom: this.studentForm.value.nom,
        prenom: this.studentForm.value.prenom,
        classe: this.studentForm.value.classe,
        dateNaissance: new Date(this.studentForm.value.dateNaissance)
      };

      console.log('Élève enregistré :', student);

      this.studentForm.reset();
    }

  }

}