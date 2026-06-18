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
  IonButton
} from '@ionic/angular/standalone';

import { Subject } from '../../models/subject.model';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
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
    IonButton
  ]
})
export class SubjectsPage implements OnInit {

  subjectForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.subjectForm = this.fb.group({
      code: ['', Validators.required],
      libelle: ['', Validators.required],
      coefficient: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.subjectForm.valid) {

      const subject: Subject = {
        id: Date.now(),
        code: this.subjectForm.value.code,
        libelle: this.subjectForm.value.libelle,
        coefficient: Number(this.subjectForm.value.coefficient)
      };

      console.log('Matière ajoutée :', subject);
      this.subjectForm.reset();
    }
  }
}