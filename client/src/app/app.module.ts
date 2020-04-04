import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapsModule } from './maps/maps.module';
import { AppInitializer } from './app.initializer';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FlexLayoutModule, MapsModule, BrowserAnimationsModule, MatFabMenuModule],
  providers: [
    AppInitializer,
    { provide: LOCALE_ID, useValue: 'es-ES' },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      }
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (initializer: AppInitializer) => () => initializer.load(),
      deps: [AppInitializer],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
