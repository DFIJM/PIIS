import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'piis-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit {
  zones: any[] = [];
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  drawingManager: google.maps.drawing.DrawingManager;

  mapOptions: google.maps.MapOptions = {
    zoom: 7,
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false
  };

  ngAfterViewInit() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.setGeolocalization();
    this.setDrawer();
  }

  setGeolocalization() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.map.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => this.defaultLocation()
      );
    } else {
      this.defaultLocation();
    }
  }

  defaultLocation() {
    this.map.setCenter({
      lat: 40.4183083,
      lng: -3.70275
    });
  }

  setDrawer() {
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.RECTANGLE]
      },
      rectangleOptions: {
        clickable: true
      }
    });
    this.drawingManager.setMap(this.map);

    this.loadData();

    this.drawingListener();
  }

  zoneListener(zone) {
    google.maps.event.addListener(zone, 'click', e => {
      this.http
        .post('api/zone/info', this.zoneToData(zone))
        .toPromise()
        .then((info: any) => {
          console.log(info);
          for (const i of info) {
            const lat = i.venue.location.lat;
            const lng = i.venue.location.lng;
            new google.maps.Marker({
              position: { lat, lng },
              map: this.map
            }).setMap(this.map);
          }
        });
    });
  }

  loadData() {
    this.http
      .post('api/zone/get', {})
      .toPromise()
      .then((zones: any[]) => {
        this.zones = zones;
        for (const data of this.zones) {
          const zone = this.dataToZone(data);
          console.log(zone);
          zone.setOptions({
            clickable: true
          });
          this.zoneListener(zone);
          zone.setMap(this.map);
        }
      });
  }

  drawingListener() {
    google.maps.event.addListener(this.drawingManager, 'rectanglecomplete', zone => {
      const data = this.zoneToData(zone);
      const name = prompt('Nombre de la zona');
      if (!name) {
        this.snackBar.open('Nombre obligatorio');
        zone.setMap(null);
      } else {
        data.name = name;
        this.zones.push(data);
        this.zoneListener(zone);
        this.http.post('api/zone/set', data).toPromise();
      }
    });
  }

  zoneToData(zone) {
    const bounds = zone.getBounds();
    const ne = {
      lat: bounds.getNorthEast().lat(),
      lng: bounds.getNorthEast().lng()
    };
    const sw = {
      lat: bounds.getSouthWest().lat(),
      lng: bounds.getSouthWest().lng()
    };
    return {
      name: null,
      // Desde el centro superior, como las agujas del reloj: ne, se, sw, nw
      bounds: [ne, { lat: ne.lat, lng: sw.lng }, sw, { lat: sw.lat, lng: ne.lng }]
    };
  }

  dataToZone(data) {
    return new google.maps.Rectangle({
      map: this.map,
      bounds: new google.maps.LatLngBounds(data.bounds[2], data.bounds[0])
    });
  }
}
