import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/loader';
import { environment } from 'src/environments/environment';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(es);

@Injectable()
export class AppInitializer {
  load() {
    return new Loader({
      apiKey: environment.MAPS_API,
      version: 'weekly',
      libraries: ['drawing']
    }).load();
  }
}
