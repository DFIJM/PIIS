import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/loader';
import { environment } from 'src/environments/environment';

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
