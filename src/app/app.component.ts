import { Component } from '@angular/core';
import { IonApp, IonSplitPane, IonMenu, IonContent,
IonList, IonListHeader, IonNote, IonMenuToggle,
IonItem, IonIcon, IonLabel, IonRouterLink,
IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import {
homeOutline, peopleOutline, bookOutline,
documentTextOutline, statsChartOutline, schoolOutline
} from 'ionicons/icons';
@Component({
selector: 'app-root',
templateUrl: 'app.component.html',
// Standalone : on importe directement les composants Ionic nécessaires
imports: [
IonApp, IonSplitPane, IonMenu, IonContent, IonList,
IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon,
IonLabel, IonRouterLink, RouterLink, RouterLinkActive, IonRouterOutlet
],
standalone: true,
})
export class AppComponent {
// Définition des pages du menu latéral
appPages = [
{ title: 'Tableau de bord', url: '/dashboard', icon: 'home-outline' },
{ title: 'Élèves', url: '/students', icon: 'people-outline' },
{ title: 'Matières', url: '/subjects', icon: 'book-outline' },
{ title: 'Notes', url: '/grades', icon: 'document-text-outline' },
{ title: 'Bulletins', url: '/report-cards', icon: 'stats-chart-outline' },
];
constructor() {
// Enregistrer les icônes utilisées dans le menu
addIcons({
homeOutline, peopleOutline, bookOutline,
documentTextOutline, statsChartOutline, schoolOutline
});
}
}