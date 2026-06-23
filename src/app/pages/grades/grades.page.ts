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

import { Grade } from '../../models/grade.model';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
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
export class GradesPage implements OnInit {

  gradeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.gradeForm = this.fb.group({
      studentId: ['', Validators.required],
      subjectId: ['', Validators.required],
      note: ['', Validators.required],
      periode: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.gradeForm.valid) {

      const grade: Grade = {
        id: Date.now(),
        studentId: Number(this.gradeForm.value.studentId),
        subjectId: Number(this.gradeForm.value.subjectId),
        note: Number(this.gradeForm.value.note),
        periode: this.gradeForm.value.periode
      };

      console.log('Note ajoutée :', grade);
      this.gradeForm.reset();
    }
  }
}