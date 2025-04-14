import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { UserProfileComponent } from '../components/user-profile.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RemoteEntryComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      }
    ]
  }
];
