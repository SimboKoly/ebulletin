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
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      matricule: ['', Validators.required],
      classe: ['', Validators.required],
      periode: ['', Validators.required],
      lines: ['', Validators.required],
      moyenne: ['', Validators.required],
      mention: ['', Validators.required],
      rang: ['', Validators.required],
    });
  }

  onSubmit() {

    if (this.reportCardForm.valid) {

      const reportCard: ReportCard = {
        id: Date.now(),
        student: this.reportCardForm.value.nom + ' ' + this.reportCardForm.value.prenom,
        matricule: this.reportCardForm.value.matricule,
        classe: this.reportCardForm.value.classe,
        periode: this.reportCardForm.value.periode,
        lines: this.reportCardForm.value.lines,
        moyenne: Number(this.reportCardForm.value.moyenne),
        mention: this.reportCardForm.value.mention,
        rang: Number(this.reportCardForm.value.rang),
      };

      console.log('Bulletin enregistré :', reportCard);

      this.reportCardForm.reset();
    }

  }

}