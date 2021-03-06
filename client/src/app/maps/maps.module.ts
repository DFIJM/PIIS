import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { InfoComponent } from './info/info.component';
import { SelectZoneComponent } from './select-zone/select-zone.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AgGridModule } from 'ag-grid-angular';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ZoneActionsComponent } from './zone-actions/zone-actions.component';
import { ExcludePipe } from './select-zone/exclude.pipe';
import { SelectComparativeComponent } from './select-comparative/select-comparative.component';

@NgModule({
  declarations: [
    MapsComponent,
    SelectZoneComponent,
    SelectComparativeComponent,
    InfoComponent,
    ZoneActionsComponent,
    ExcludePipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
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
  ],
})
export class MapsModule {}
