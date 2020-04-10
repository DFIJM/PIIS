import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectionList } from '@angular/material/list';
import { SelectComponent } from './select/select.component';
import { MatDialog } from '@angular/material/dialog';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'piis-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements AfterViewInit {
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  apis = [
    {
      name: 'FourSquare',
      type: 'CIRCLE',
      icon: 'foursquare.png',
    },
    {
      name: 'OpenStreetMap',
      type: 'RECTANGLE',
      icon: 'openstreetmap.png',
    },
    {
      name: 'Twitter',
      type: 'RECTANGLE',
      icon: 'twitter.png',
    },
  ];

  negocios: any[] = [
    {
      icon: 'https://ss3.4sqi.net/img/categories_v2/food/default_bg_32.png',
      name: 'Restaurantes',
      count: 1074,
    },
    {
      icon: 'https://ss3.4sqi.net/img/categories_v2/parks_outdoors/default_bg_32.png',
      name: 'Parques',
      count: 945,
    },
    {
      icon: 'https://ss3.4sqi.net/img/categories_v2/shops/default_bg_32.png',
      name: 'Tiendas',
      count: 670,
    },
    {
      icon: 'https://ss3.4sqi.net/img/categories_v2/arts_entertainment/default_bg_32.png',
      name: 'Cines',
      count: 13,
    },
  ];

  selectedApis = [];
  zones: any[] = [];

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  @ViewChild('apiList', { static: false }) apiList: MatSelectionList;

  map: google.maps.Map;
  drawingManager: google.maps.drawing.DrawingManager;

  mapOptions: google.maps.MapOptions = {
    zoom: 11,
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
  };

  ngAfterViewInit() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.setGeolocalization();
    this.setDrawer();
  }

  apiChange(selection) {
    for (let api of this.apis) {
      if (!selection.option.value) {
        this.changeDrawer();
      } else if (api.name === selection.option.value) {
        if (api.type.toUpperCase() !== this.drawingManager.getDrawingMode()?.toUpperCase()) {
          this.changeDrawer(api.type.toUpperCase());
          this.selectedApis = [api.name];
          break;
        }
      }
    }
  }

  setGeolocalization() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.map.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
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
      lng: -3.70275,
    });
  }

  changeDrawer(type?) {
    if (type) {
      this.drawingManager.setOptions({
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType[type]],
        },
      });
      this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType[type]);
    } else {
      this.drawingManager.setOptions({
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [],
        },
      });
      this.drawingManager.setDrawingMode(null);
    }
  }

  setDrawer() {
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: true,
      rectangleOptions: {
        clickable: true,
      },
      circleOptions: {
        clickable: true,
      },
    });
    this.drawingManager.setMap(this.map);

    this.loadData();

    this.changeDrawer();
    google.maps.event.addListener(this.drawingManager, 'rectanglecomplete', this.drawingListener());
    google.maps.event.addListener(this.drawingManager, 'circlecomplete', this.drawingListener());
  }

  zoneListener(name, gmapsZone, drawing) {
    google.maps.event.addListener(gmapsZone, 'click', (e) => {
      this.http
        .post('api/zone/info', { name, drawing })
        .toPromise()
        .then((info: any) => {
          for (const i of info) {
            const lat = i.venue.location.lat;
            const lng = i.venue.location.lng;
            new google.maps.Marker({
              position: { lat, lng },
              map: this.map,
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
        for (const zone of this.zones) {
          for (const drawing of zone.drawings) {
            this.draw(zone.name, drawing);
          }
        }
      });
  }

  drawingListener() {
    return (drawing) => {
      const name = prompt('Nombre de la zona');
      if (!name) {
        this.snackBar.open('Nombre obligatorio');
        drawing.setMap(null);
      } else {
        let zone = this.parseDrawing(name, drawing);
        this.http
          .post('api/zone/create', zone)
          .toPromise()
          .then(() => {
            for (let _drawing of zone.drawings) {
              this.draw(name, _drawing);
            }
            drawing.setMap(null);
          })
          .catch(({ error }) => {
            this.snackBar.open(error.message);
            drawing.setMap(null);
          });
      }
    };
  }

  parseDrawing(name, drawing) {
    let apis = this.selectedApis.map((api: string) => api.toLowerCase());
    let type;
    let options;
    if (drawing instanceof google.maps.Rectangle) {
      type = 'RECTANGLE';
      const bounds = drawing.getBounds();
      const ne = {
        lat: bounds.getNorthEast().lat(),
        lng: bounds.getNorthEast().lng(),
      };
      const sw = {
        lat: bounds.getSouthWest().lat(),
        lng: bounds.getSouthWest().lng(),
      };
      options = {
        id: null,
        // Desde el centro superior, como las agujas del reloj: ne, se, sw, nw
        bounds: [ne, { lat: ne.lat, lng: sw.lng }, sw, { lat: sw.lat, lng: ne.lng }],
      };
    } else {
      type = 'CIRCLE';
      options = {
        id: null,
        center: { lat: drawing.center.lat(), lng: drawing.center.lng() },
        radius: drawing.radius,
      };
    }
    let drawings = [];
    for (let api of apis) {
      drawings.push({
        type,
        api,
        options,
      });
    }
    return {
      name,
      playing: false,
      drawings,
    };
  }

  draw(name, drawing) {
    let item;
    if (drawing.type.toUpperCase() === 'RECTANGLE') {
      item = new google.maps.Rectangle({
        map: this.map,
        bounds: new google.maps.LatLngBounds(drawing.options.bounds[2], drawing.options.bounds[0]),
      });
    } else {
      item = new google.maps.Circle({
        map: this.map,
        center: new google.maps.LatLng(drawing.options.center.lat, drawing.options.center.lng),
        radius: drawing.options.radius,
      });
    }
    item.setOptions({
      clickable: true,
    });
    this.zoneListener(name, item, drawing);
    item.setMap(this.map);
  }

  resumen(zone) {
    this.http
      .post('api/zone/resumen', zone)
      .toPromise()
      .then((data) => {
        this.dialog.open(InfoComponent, { data }).afterClosed().toPromise();
      })
      .catch((err) => this.snackBar.open('Error consultando ' + err));
  }

  playOrStop(zone) {
    if (zone.playing) {
      this.http
        .post('api/zone/twitter/stop', zone)
        .toPromise()
        .then(() => {
          this.snackBar.open('Recopilación detenida');
          zone.playing = false;
        })
        .catch((err) => this.snackBar.open('La detención ha fallado ' + err));
    } else {
      this.http
        .post('api/zone/twitter/play', zone)
        .toPromise()
        .then(() => {
          this.snackBar.open('Recopilando información...');
          zone.playing = true;
        })
        .catch((err) => this.snackBar.open('La recopilación ha fallado ' + err));
    }
  }

  fabMenuSelect($event) {
    $event === 1 ? this.history() : this.compare();
  }

  async history() {
    let selectedZones = await this.dialog
      .open(SelectComponent, { data: { zones: this.zones } })
      .afterClosed()
      .toPromise();

    if (selectedZones) {
      await this.dialog.open(InfoComponent, { data: { selectedZones } }).afterClosed().toPromise();
    }
  }

  compare() {}
}
