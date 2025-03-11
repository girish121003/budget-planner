import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="app-header">
      <div class="logo-container">
        <img *ngIf="logoUrl" [src]="logoUrl" alt="App logo" class="app-logo">
        <div *ngIf="!logoUrl" class="logo-placeholder">🪙</div>
        <h1 class="app-title">{{title}}</h1>
      </div>
      <div class="menu-button">
        <button type="button" class="hamburger">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      background-color: white;
      border-bottom: 1px solid var(--border-color, #E5E7EB);
    }
    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .app-logo {
      height: 2.5rem;
      width: auto;
    }
    .logo-placeholder {
      font-size: 2rem;
      color: var(--brand-primary, #C26B1B);
    }
    .app-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary, #111827);
      margin: 0;
    }
    .menu-button {
      display: flex;
      align-items: center;
    }
    .hamburger {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 1.5rem;
      height: 1.25rem;
      background: transparent;
      border: none;
      padding: 0;
      cursor: pointer;
    }
    .hamburger-line {
      display: block;
      width: 100%;
      height: 2px;
      background-color: var(--brand-primary, #C26B1B);
      border-radius: 1px;
    }
  `]
})
export class HeaderComponent {
  @Input() title = 'Budget Planner';
  @Input() logoUrl?: string;
} 