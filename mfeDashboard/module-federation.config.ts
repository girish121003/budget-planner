import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfeDashboard',
  exposes: {
    './Routes': 'mfeDashboard/src/app/remote-entry/entry.routes.ts',
  },
  shared: (libraryName, sharedConfig) => {
    if (libraryName === 'rxjs') {
      return {
        singleton: true,
        strictVersion: true,
        eager: true,
        requiredVersion: false,
        shareConfig: {
          singleton: true,
          strictVersion: true,
          eager: true,
          requiredVersion: false
        },
        lib: require('rxjs')
      };
    }

    if ([
      '@angular/core',
      '@angular/common',
      '@angular/common/http',
      '@angular/router',
      '@angular/forms',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/compiler',
      '@angular/animations',
      'tslib'
    ].includes(libraryName)) {
      return {
        singleton: true,
        strictVersion: true,
        eager: true
      };
    }

    return false;
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
