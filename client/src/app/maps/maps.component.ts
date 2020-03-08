import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getDistance } from 'geolib';
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
    zoom: 9,
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
      lat: 37.9836841,
      lng: -1.1247620999999999
    });
  }

  setDrawer() {
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.CIRCLE,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.CIRCLE]
      },
      circleOptions: {
        clickable: true
      }
    });
    this.drawingManager.setMap(this.map);

    this.loadData();

    this.drawingListener();
  }

  zoneListener(zone) {
    google.maps.event.addListener(zone, 'click', e => {
      console.log(e);
    });
  }

  loadData() {
    this.http
      .post('api/zone/get', {})
      .toPromise()
      .then((zones: any[]) => {
        this.zones = zones;
        for (const data of this.zones) {
          const zone = new google.maps.Circle({
            center: new google.maps.LatLng(data.lat, data.lng),
            map: this.map,
            radius: data.radius
          });
          zone.setOptions({
            clickable: true
          });
          this.zoneListener(zone);
          zone.setMap(this.map);
        }
      });
  }

  drawingListener() {
    google.maps.event.addListener(
      this.drawingManager,
      'circlecomplete',
      zone => {
        const data = {
          name: null,
          lat: zone.center.lat(),
          lng: zone.center.lng(),
          radius: zone.radius
        };
        if (this.checkAllOverlap(data)) {
          const name = prompt('Nombre de la zona');
          if (!name) {
            this.snackBar.open('Nombre obligatorio');
          } else {
            data.name = name;
            this.zones.push(data);
            this.zoneListener(zone);
            this.http.post('api/zone/set', data).toPromise();
            return;
          }
        } else {
          this.snackBar.open('Superposición no permitida');
        }
        zone.setMap(null);
      }
    );
  }

  overlap(circle1, circle2) {
    const distance = getDistance(
      { latitude: circle1.lat, longitude: circle1.lng },
      { latitude: circle2.lat, longitude: circle2.lng }
    );
    // Si la distancia entre los centros es menor que la suma de los radios
    return distance < circle1.radius + circle2.radius;
  }

  checkAllOverlap(zoneToCheck): boolean {
    for (const zone of this.zones) {
      if (this.overlap(zone, zoneToCheck)) {
        return false;
      }
    }
    return true;
  }
}
