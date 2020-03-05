import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'piis-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;

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
    new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.CIRCLE,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.CIRCLE]
      },
      circleOptions: {
        fillOpacity: 0,
        strokeWeight: 5,
        strokeColor: '#fafafa',
        clickable: true,
        editable: true,
        zIndex: 1
      }
    }).setMap(this.map);
  }
}
