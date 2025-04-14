import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { remoteRoutes } from './entry.routes';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(remoteRoutes)
  ]
})
export class RemoteEntryModule {} 