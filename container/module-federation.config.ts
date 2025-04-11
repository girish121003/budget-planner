import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'container',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  remotes: [
    ['mfeDashboard', 'http://localhost:4205/remoteEntry.mjs']
  ],
  shared: (libraryName, sharedConfig) => {
    const sharedLibraries = {
      '@angular/core': { singleton: true, strictVersion: true, eager: true },
      '@angular/core/primitives/signals': { singleton: true, strictVersion: true, eager: true },
      '@angular/core/primitives/di': { singleton: true, strictVersion: true, eager: true },
      '@angular/core/primitives/event-dispatch': { singleton: true, strictVersion: true, eager: true },
      '@angular/common': { singleton: true, strictVersion: true, eager: true },
      '@angular/common/http': { singleton: true, strictVersion: true, eager: true },
      '@angular/router': { singleton: true, strictVersion: true, eager: true },
      '@angular/platform-browser': { singleton: true, strictVersion: true, eager: true },
      'tslib': { singleton: true, strictVersion: true, eager: true }
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
  }
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
