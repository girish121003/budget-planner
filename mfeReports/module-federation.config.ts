import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfeReports',
  exposes: {
    './Routes': 'mfeReports/src/app/remote-entry/entry.routes.ts',
  },
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
    
    return sharedLibraries[libraryName] || sharedConfig;
  }
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
