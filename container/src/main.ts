import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';
import { loadManifest } from '@angular-architects/module-federation';

const bootstrap = () => bootstrapApplication(AppComponent, appConfig);

if (environment.production) {
  bootstrap();
} else {
  bootstrap();
}

loadManifest("/assets/mf.manifest.json")
  .catch(err => console.error('Error loading manifest:', err))
  .then(() => import('./bootstrap'))
  .catch(err => console.error('Error bootstrapping app:', err));
