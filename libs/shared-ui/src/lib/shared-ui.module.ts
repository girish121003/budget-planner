import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { BudgetAllocationComponent } from './components/budget-allocation/budget-allocation.component';
import { HeaderComponent } from './components/header/header.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { LogoComponent } from '../assets/logo';
import { BudgetPlannerApiService } from './services/budget-planner-api.service';

const COMPONENTS = [
  ButtonComponent,
  CardComponent,
  PieChartComponent,
  ProfileHeaderComponent,
  BudgetAllocationComponent,
  HeaderComponent,
  DrawerComponent,
  LogoComponent
];

@NgModule({
  imports: [
    CommonModule,
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [
    BudgetPlannerApiService
  ]
})
export class SharedUiModule {
  // Constructor without style import
} 