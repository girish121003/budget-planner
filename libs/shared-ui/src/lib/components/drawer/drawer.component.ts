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
        <div class="drawer-title"></div>
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
                <div class="menu-item">
                  <img 
                    src="assets/shared/icons/{{item.icon}}" 
                    alt="{{item.name}}" 
                    class="nav-icon"
                  />
                  <span class="nav-text">{{item.name}}</span>
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Saira:wght@700&display=swap');
    
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
      background-color: #FAF5F2;
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
      padding: 10px;
      margin-bottom: 20px;
    }
    
    .drawer-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
    }
    
    .close-button {
      background: transparent;
      border: none;
      padding: 8px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
    }
    
    .close-button img {
      width: 20px;
      height: 20px;
    }
    
    .drawer-content {
      flex: 1;
      overflow-y: auto;
    }
    
    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .nav-item {
      margin-bottom: 10px;
    }
    
    .nav-link {
      display: block;
      text-decoration: none;
      color: white;
      transition: transform 0.2s ease;
    }
    
    .nav-link:hover {
      transform: translateY(-2px);
    }
    
    .menu-item {
      display: flex;
      align-items: center;
      background-color: #E67E22;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .nav-icon {
      width: 28px;
      height: 28px;
      margin-right: 16px;
    }
    
    .nav-text {
      font-family: 'Saira', sans-serif;
      font-size: 20px;
      font-weight: 700;
      line-height: 1.2;
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