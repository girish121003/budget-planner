import { Component } from '@angular/core';

@Component({
  selector: 'app-ui-logo',
  standalone: true,
  template: `
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5ZM20 8C26.627 8 32 13.373 32 20C32 26.627 26.627 32 20 32C13.373 32 8 26.627 8 20C8 13.373 13.373 8 20 8Z" fill="#C26B1B"/>
      <path d="M22 12C18.134 12 15 15.134 15 19C15 22.866 18.134 26 22 26H27.5C28.328 26 29 25.328 29 24.5C29 23.672 28.328 23 27.5 23H22C19.791 23 18 21.209 18 19C18 16.791 19.791 15 22 15H27.5C28.328 15 29 14.328 29 13.5C29 12.672 28.328 12 27.5 12H22Z" fill="#C26B1B"/>
      <circle cx="13.5" cy="19.5" r="1.5" fill="#C26B1B"/>
    </svg>
  `
})
export class LogoComponent {} 