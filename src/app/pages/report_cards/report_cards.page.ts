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
  IonTextarea
} from '@ionic/angular/standalone';

import { ReportCard } from '../../models/report_card.model';

@Component({
  selector: 'app-reportcards',
  templateUrl: './report_cards.page.html',
  styleUrls: ['./report_cards.page.scss'],
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
    IonTextarea
  ]
})
export class ReportCardsPage implements OnInit {

  reportCardForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.reportCardForm = this.fb.group({
      studentId: ['', Validators.required],
      moyenne: ['', Validators.required],
      rang: ['', Validators.required],
      appreciation: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.reportCardForm.valid) {

      const reportCard: ReportCard = {
        id: Date.now(),
        studentId: Number(this.reportCardForm.value.studentId),
        moyenne: Number(this.reportCardForm.value.moyenne),
        rang: Number(this.reportCardForm.value.rang),
        appreciation: this.reportCardForm.value.appreciation
      };

      console.log('Bulletin enregistré :', reportCard);

      this.reportCardForm.reset();
    }

  }

}