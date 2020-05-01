import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'piis-select-zone',
  templateUrl: './select-zone.component.html',
  styleUrls: ['./select-zone.component.scss'],
})
export class SelectZoneComponent {
  constructor(public dialogRef: MatDialogRef<SelectZoneComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  selectedZone1;
  selectedZone2;
}
