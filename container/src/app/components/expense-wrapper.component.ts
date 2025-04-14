import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  CUSTOM_ELEMENTS_SCHEMA,
  
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-expense-wrapper',
  standalone: true,
  template: `<mfe-expense-tracker></mfe-expense-tracker>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class ExpenseWrapperComponent implements OnInit, AfterViewInit {
  async ngOnInit() {
    console.log('[Angular] ExpenseWrapperComponent initialized');

    // ✅ This will trigger bootstrap.tsx to register <mfe-expense-tracker>
    await loadRemoteModule({
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      remoteName: 'mfeTrackExpenses',
      exposedModule: './ExpenseTrackerWC'
    });

    console.log('[Angular] mfeTrackExpenses loaded from MF');
  }

  ngAfterViewInit() {
    console.log('[Angular] mfe-expense-tracker rendered');
  }
}