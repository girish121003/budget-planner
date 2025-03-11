import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="drawer-backdrop" 
      [class.active]="isOpen"
      (click)="closeDrawer()"
    ></div>
    <div 
      class="drawer" 
      [class.open]="isOpen"
      [@slideAnimation]="isOpen ? 'open' : 'closed'"
    >
      <div class="drawer-header">
        <h2 class="drawer-title">Menu</h2>
        <button class="close-button" (click)="closeDrawer()">
          <img src="assets/shared/icons/close-btn.png" alt="Close" />
        </button>
      </div>
      <div class="drawer-content">
        <nav class="drawer-navigation">
          <ul class="nav-list">
            <li class="nav-item" *ngFor="let item of navigationItems">
              <a 
                [href]="item.route" 
                class="nav-link"
                (click)="navigateTo(item.route, $event)"
              >
                <img 
                  src="assets/shared/icons/{{item.icon}}" 
                  alt="{{item.name}}" 
                  class="nav-icon"
                />
                <span class="nav-text">{{item.name}}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  styles: [`
    .drawer-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease-in-out;
      z-index: 1000;
      pointer-events: none;
    }
    
    .drawer-backdrop.active {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
    
    .drawer {
      position: fixed;
      top: 0;
      right: 0;
      width: 300px;
      height: 100vh;
      background-color: white;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      z-index: 1001;
      overflow-y: auto;
      padding: 1rem;
    }
    
    .drawer.open {
      transform: translateX(0);
    }
    
    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .drawer-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
    }
    
    .close-button {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .close-button img {
      width: 16px;
      height: 16px;
    }
    
    .drawer-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px 0;
    }
    
    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .nav-item {
      margin-bottom: 4px;
    }
    
    .nav-link {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      text-decoration: none;
      color: #333;
      transition: background-color 0.2s ease;
      border-radius: 4px;
    }
    
    .nav-link:hover {
      background-color: #f5f5f5;
    }
    
    .nav-icon {
      width: 24px;
      height: 24px;
      margin-right: 16px;
    }
    
    .nav-text {
      font-size: 1rem;
      font-weight: 500;
    }
  `],
  animations: [
    trigger('slideAnimation', [
      transition('closed => open', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease', style({ transform: 'translateX(0)' }))
      ]),
      transition('open => closed', [
        style({ transform: 'translateX(0)' }),
        animate('300ms ease', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class DrawerComponent {
  @Input() isOpen = false;
  @Input() navigationItems: { name: string; icon: string; route: string }[] = [];
  @Output() drawerClosed = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<string>();

  closeDrawer(): void {
    this.drawerClosed.emit();
  }

  navigateTo(route: string, event: MouseEvent): void {
    event.preventDefault();
    this.navigate.emit(route);
    this.closeDrawer();
  }
} 