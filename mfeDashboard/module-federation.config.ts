import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfeDashboard',
  exposes: {
    './Routes': 'mfeDashboard/src/app/remote-entry/entry.routes.ts',
  },
  shared: (libraryName: string) => {
    const sharedConfig = {
      singleton: true,
      strictVersion: true,
      eager: true
    };

    switch (libraryName) {
      case '@angular/core':
      case '@angular/common':
      case '@angular/common/http':
      case '@angular/router':
      case '@angular/forms':
      case '@angular/platform-browser':
      case '@angular/platform-browser-dynamic':
      case '@angular/compiler':
      case '@angular/animations':
        return sharedConfig;
      case 'rxjs':
      case 'tslib':
        return sharedConfig;
      default:
        return false;
    }
  },
  library: {
    type: 'module',
    name: 'mfeDashboard'
  }
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
