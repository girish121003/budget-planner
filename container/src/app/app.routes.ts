import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('mfeDashboard/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('mfeDashboard/Routes').then((m) => m.remoteRoutes),
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
