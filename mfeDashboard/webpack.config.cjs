const { composePlugins, withNx } = require('@nx/webpack');
const { withModuleFederation } = require('@nx/angular/module-federation');

const dashboardConfig = {
  name: 'mfeDashboard',
  exposes: {
    './Module': './mfeDashboard/src/app/remote-entry/entry.module.ts'
  },
  shared: {
    '@angular/core': { singleton: true, strictVersion: true },
    '@angular/common': { singleton: true, strictVersion: true },
    '@angular/router': { singleton: true, strictVersion: true },
    '@angular/forms': { singleton: true, strictVersion: true },
    '@angular/platform-browser': { singleton: true, strictVersion: true },
    '@angular/platform-browser-dynamic': { singleton: true, strictVersion: true }
  }
};

module.exports = composePlugins(withNx(), withModuleFederation(dashboardConfig)); 