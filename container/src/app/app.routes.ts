import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:8081/remoteEntry.js',
        exposedModule: './DashboardModule'
      })
      .then(m => m.DashboardModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'mfeSettings',
    loadChildren: () =>
      import('mfeSettings/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'mfeReports',
    loadChildren: () =>
      import('mfeReports/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'mfeBudget',
    loadChildren: () =>
      import('mfeBudget/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
