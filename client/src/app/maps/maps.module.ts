import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps.component';
import { HttpClientModule } from '@angular/common/http';
import { MapsService } from './maps.service';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [MapsComponent],
  imports: [CommonModule, BrowserModule, HttpClientModule, FlexModule],
  providers: [MapsService]
})
export class MapsModule {}
