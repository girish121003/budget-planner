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
  }
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
