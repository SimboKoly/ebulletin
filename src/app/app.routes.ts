import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'students',
    loadComponent: () => import('./pages/students/students.page').then( m => m.StudentsPage)
  },
  {
    path: 'subjects',
    loadComponent: () => import('./pages/subjects/subjects.page').then( m => m.SubjectsPage)
  },
  {
    path: 'grades',
    loadComponent: () => import('./pages/grades/grades.page').then( m => m.GradesPage)
  },
  {
    path: 'report-cards',
    loadComponent: () => import('./pages/report_cards/report_cards.page').then( m => m.ReportCardsPage)
  },
];
