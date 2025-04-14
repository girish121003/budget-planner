import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssetsService, DrawerComponent, FooterComponent } from '@budget-planner/shared-ui';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, DrawerComponent, FooterComponent],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'budget-planner-root',
  templateUrl: './app.component.html',
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
      position: relative;
    }

    .app-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: 64px;
      background-color: #FAF5F2;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      box-sizing: border-box;
    }

    .content-wrapper {
      padding-top: 64px;
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 64px - 80px);
    }

    .main-content {
      flex: 1;
      width: 100%;
      padding: 1rem;
      box-sizing: border-box;
    }

    app-footer {
      width: 100%;
      margin-top: auto;
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

    .drawer-open {
      overflow-y: auto !important;
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
    { name: 'Expense', icon: 'expense-icon.png', route: '/expense' },
    { name: 'Settings', icon: 'settings-icon.png', route: '/mfeSettings' }
  ];
  
  constructor(private router: Router, private assetsService: AssetsService) {}
  
  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
  
  closeDrawer(): void {
    this.isDrawerOpen = false;
  }
  
  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
  getAssetPath(path: string): string {
    return this.assetsService.getAssetPath(path);
  }
}
