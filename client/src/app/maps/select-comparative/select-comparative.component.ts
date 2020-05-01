import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'piis-select-comparative',
  templateUrl: './select-comparative.component.html',
  styleUrls: ['./select-comparative.component.scss'],
})
export class SelectComparativeComponent {
  constructor(public dialogRef: MatDialogRef<SelectComparativeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  selectedComparative;
}
