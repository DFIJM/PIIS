import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapsService {
  constructor(private http: HttpClient) {}

  zones() {
    return this.http.post('api/zone/get', {}).toPromise();
  }

  zoneBusiness(name) {
    return this.http.post('api/zone/business', { name }).toPromise();
  }

  zoneCreate(zone) {
    return this.http.post('api/zone/create', zone).toPromise();
  }

  zoneRemove(zone) {
    return this.http.post('api/zone/remove', zone).toPromise();
  }

  playTwitter(name) {
    return this.http.post('api/zone/twitter/play', { name }).toPromise();
  }

  stopTwitter(name) {
    return this.http.post('api/zone/twitter/stop', { name }).toPromise();
  }

  getComparatives() {
    return this.http.post('api/comparative/get', {}).toPromise();
  }
}
