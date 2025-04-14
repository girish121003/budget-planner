import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RemoteEntryComponent } from './app/remote-entry/entry.component';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { remoteRoutes } from './app/remote-entry/entry.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(RemoteEntryComponent, {
  providers: [
    provideRouter(remoteRoutes)
  ]
}).catch((err) => console.error(err));
