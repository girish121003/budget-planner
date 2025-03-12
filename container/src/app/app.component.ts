import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DrawerComponent, FooterComponent } from '@budget-planner/shared-ui';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, DrawerComponent, FooterComponent],
  selector: 'budget-planner-root',
  template: `
    <div class="app-container" [class.drawer-open]="isDrawerOpen">
      <header class="app-header">
        <div class="logo-container">
          <img src="assets/shared/icons/recieve-cash.png" alt="Budget Planner" class="logo">
          <h1>{{ title }}</h1>
        </div>
        <div class="menu-container">
          <button 
            class="menu-button"
            aria-label="Open menu"
            (click)="toggleDrawer()"
          >
            <img src="assets/shared/icons/hamburger.png" alt="" class="menu-icon">
          </button>
        </div>
      </header>
      
      <app-drawer
        [isOpen]="isDrawerOpen"
        [navigationItems]="navigationItems"
        (drawerClosed)="closeDrawer()"
        (navigate)="navigateTo($event)"
      ></app-drawer>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Arial', sans-serif;
      width: 100%;
      min-height: 100vh;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      width: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .drawer-open {
      /* Ensures content remains scrollable even with drawer open */
      overflow-y: auto !important; 
    }
    
    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #FAF5F2;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      box-sizing: border-box;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .logo-container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .logo {
      height: 40px;
    }
    
    h1 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }
    
    .menu-button {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
    }
    
    .menu-button:focus {
      outline: 2px solid #C26B1B;
      border-radius: 4px;
    }
    
    .menu-icon {
      height: 24px;
    }
    
    .main-content {
      flex: 1;
      width: 100%;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
    }
  `]
})
export class AppComponent {
  title = 'Budget Planner';
  isDrawerOpen = false;
  
  navigationItems = [
    { name: 'Home', icon: 'home-icon.png', route: '/' },
    { name: 'Plan Your Budget', icon: 'budget-icon.png', route: '/budget' },
    { name: 'Analytics & Reports', icon: 'reports-icon.png', route: '/reports' },
    { name: 'Settings', icon: 'settings-icon.png', route: '/settings' },
    { name: 'User Assistance', icon: 'assistance-icon.png', route: '/assistance' },
    { name: 'Track Your Expenses', icon: 'expenses-icon.png', route: '/expenses' },
    { name: 'Summary', icon: 'summary-icon.png', route: '/summary' }
  ];
  
  constructor(private router: Router) {}
  
  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
  
  closeDrawer(): void {
    this.isDrawerOpen = false;
  }
  
  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
