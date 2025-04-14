import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DrawerComponent, FooterComponent } from '@budget-planner/shared-ui';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, DrawerComponent, FooterComponent],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'budget-planner-root',
  template: `
    <div class="app-container" [class.drawer-open]="isDrawerOpen">
      <header class="app-header">
        <div class="logo-container">
          <img src="assets/shared/icons/recieve-cash.png" alt="Budget Planner" class="logo">
          <h1>{{ title }}</h1>
        </div>
        
        <nav class="main-nav">
          <ul class="nav-links">
            <li>
              <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            </li>
            <li>
              <a routerLink="/mfeBudget" routerLinkActive="active">Budget</a>
            </li>
            <li>
              <a routerLink="/mfeReports" routerLinkActive="active">Reports</a>
            </li>
            <li>
              <a routerLink="/mfeSettings" routerLinkActive="active">Settings</a>
            </li>
          </ul>
        </nav>

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
      
      <div class="content-wrapper">
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>

        <app-footer></app-footer>
      </div>
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
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: 64px;
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

    .main-nav {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 2rem;
    }

    .nav-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 2rem;
    }

    .nav-links li a {
      color: #333;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .nav-links li a:hover {
      color: #ffffff;
      background-color: #C26B1B;
    }

    .nav-links li a.active {
      color: #ffffff;
      background-color: #C26B1B;
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
    
    .content-wrapper {
      padding-top: 64px; /* Same as header height */
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .main-content {
      flex: 1;
      width: 100%;
      box-sizing: border-box;
      position: absolute;
      z-index: 2;
      padding: 1rem;
    }
  `]
})
export class AppComponent {
  title = 'Budget Planner';
  isDrawerOpen = false;
  
  navigationItems = [
    { name: 'Dashboard', icon: 'home-icon.png', route: '/dashboard' },
    { name: 'Budget', icon: 'budget-icon.png', route: '/mfeBudget' },
    { name: 'Reports', icon: 'reports-icon.png', route: '/mfeReports' },
    { name: 'Settings', icon: 'settings-icon.png', route: '/mfeSettings' }
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
