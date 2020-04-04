import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'piis-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  constructor(public dialogRef: MatDialogRef<InfoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
