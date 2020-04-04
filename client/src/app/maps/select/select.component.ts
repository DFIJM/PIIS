import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'piis-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  constructor(public dialogRef: MatDialogRef<SelectComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
