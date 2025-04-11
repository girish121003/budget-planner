const { composePlugins, withNx } = require('@nx/webpack');
const { withModuleFederation } = require('@nx/angular/module-federation');
const moduleFederationConfig = require('./module-federation.config');

module.exports = composePlugins(
  withNx(),
  withModuleFederation(moduleFederationConfig)
); 