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
    ['mfeSettings', process.env.NODE_ENV === 'production' 
      ? 'https://girish121003.github.io/budget-planner/mfeSettings/remoteEntry.mjs'
      : 'http://localhost:4204/remoteEntry.mjs'],
    ['mfeReports', process.env.NODE_ENV === 'production'
      ? 'https://girish121003.github.io/budget-planner/mfeReports/remoteEntry.mjs'
      : 'http://localhost:4202/remoteEntry.mjs'],
    ['mfeBudget', process.env.NODE_ENV === 'production'
      ? 'https://girish121003.github.io/budget-planner/mfeBudget/remoteEntry.mjs'
      : 'http://localhost:4203/remoteEntry.mjs'],
    ['mfeDashboard', process.env.NODE_ENV === 'production'
      ? 'https://girish121003.github.io/budget-planner/mfeDashboard/remoteEntry.mjs'
      : 'http://localhost:4201/remoteEntry.mjs']
  ],
  shared: {
    '@angular/core': { singleton: true, strictVersion: true, eager: true },
    '@angular/common': { singleton: true, strictVersion: true, eager: true },
    '@angular/common/http': { singleton: true, strictVersion: true, eager: true },
    '@angular/router': { singleton: true, strictVersion: true, eager: true },
    '@angular/platform-browser': { singleton: true, strictVersion: true, eager: true }
  }
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
