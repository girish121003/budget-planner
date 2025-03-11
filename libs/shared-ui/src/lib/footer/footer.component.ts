import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <a href="#" class="footer-link">Contact Us</a>
          <a href="#" class="footer-link">Privacy Policy</a>
          <a href="#" class="footer-link">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #FAF5F2;
      border-radius: 36px 36px 0 0;
      padding: 20px 0;
      width: 100%;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
      margin-top: 20px;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 40px;
    }

    .footer-link {
      color: #333;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s;
    }

    .footer-link:hover {
      color: #C26B1B;
    }
  `]
})
export class FooterComponent {} 