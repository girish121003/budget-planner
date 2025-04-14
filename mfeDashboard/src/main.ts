// Import core and its submodules early
import * as core from '@angular/core';
import '@angular/core/primitives/signals';

(async () => {
  try {
    // Initialize core modules first
    await Promise.all([
      import('@angular/core'),
      import('@angular/core/primitives/signals')
    ]);

    // Initialize the application
    import('./bootstrap').catch(err => console.error(err));
  } catch (err) {
    console.error('Error bootstrapping app', err);
  }
})();
