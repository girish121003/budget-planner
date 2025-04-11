import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RemoteEntryComponent } from './app/remote-entry/entry.component';

// Import core and its submodules
import * as core from '@angular/core';
import '@angular/core/primitives/signals';

export default async function bootstrap() {
  try {
    // Initialize core modules first
    await Promise.all([
      import('@angular/core'),
      import('@angular/core/primitives/signals'),
      import('@angular/common'),
      import('@angular/common/http'),
      import('@angular/router'),
      import('@angular/platform-browser'),
      import('@angular/platform-browser-dynamic'),
      import('@angular/compiler'),
      import('@angular/animations'),
      import('@angular/forms')
    ]);

    // Initialize additional dependencies
    await Promise.all([
      import('tslib'),
      import('rxjs'),
      import('rxjs/operators')
    ]);

    // Bootstrap the application
    const app = await bootstrapApplication(RemoteEntryComponent, appConfig);
    return app;
  } catch (err) {
    console.error('Error bootstrapping app', err);
    throw err;
  }
}
