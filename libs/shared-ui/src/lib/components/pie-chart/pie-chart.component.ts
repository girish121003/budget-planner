import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ChartData {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-ui-pie-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <canvas #chartCanvas width="300" height="300"></canvas>
      <div class="chart-labels" *ngIf="showLabels">
        <div class="chart-label" *ngFor="let item of data">
          <span class="color-indicator" [style.background-color]="item.color"></span>
          <span class="label-text">{{item.label}}: {{getPercentage(item.value)}}%</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .chart-labels {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }
    .chart-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .color-indicator {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
    .label-text {
      font-size: 0.875rem;
      color: var(--text-secondary, #4B5563);
    }
  `]
})
export class PieChartComponent implements OnChanges, AfterViewInit {
  @Input() data: ChartData[] = [];
  @Input() showLabels = true;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.chartCanvas) {
      this.drawChart();
    }
  }
  
  ngAfterViewInit(): void {
    this.drawChart();
  }
  
  getPercentage(value: number): number {
    const total = this.data.reduce((sum, item) => sum + item.value, 0);
    return total === 0 ? 0 : Math.round((value / total) * 100);
  }
  
  private drawChart(): void {
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx || this.data.length === 0) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.9;
    
    const total = this.data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    this.data.forEach(item => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      
      ctx.fillStyle = item.color;
      ctx.fill();
      
      startAngle += sliceAngle;
    });
  }
} 