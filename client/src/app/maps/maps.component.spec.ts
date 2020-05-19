import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MapsComponent } from './maps.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MapsService } from './maps.service';
import { HttpService } from './http.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AgGridModule } from 'ag-grid-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

class MapsServiceMock {
  zones() {
    return Promise.resolve([]);
  }

  zoneBusiness(name) {
    return Promise.resolve([]);
  }

  zoneCreate(zone) {
    return Promise.resolve();
  }

  zoneRemove(zone) {
    return Promise.resolve();
  }

  playTwitter(name) {
    return Promise.resolve();
  }

  stopTwitter(name) {
    return Promise.resolve();
  }

  getComparatives() {
    return Promise.resolve([]);
  }
}

describe('MapsComponent', () => {
  let fixture: ComponentFixture<MapsComponent>;
  let component: MapsComponent;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        FlexModule,
        MatSnackBarModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatFabMenuModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatBottomSheetModule,
        AgGridModule.withComponents([]),
        MatProgressSpinnerModule,
      ],
      declarations: [MapsComponent],
      providers: [HttpService, { provide: MapsServiceMock, useClass: MapsService }, MapsService],
    }).compileComponents();
    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the data', () => {
    const service = TestBed.get(MapsService);
    const spy = spyOn(service, 'zones').and.callThrough();
    fixture.detectChanges();
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalled();
  });
});
