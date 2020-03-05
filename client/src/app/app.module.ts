import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapsModule } from './maps/maps.module';
import { AppInitializer } from './app.initializer';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FlexLayoutModule, MapsModule],
  providers: [
    AppInitializer,
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
