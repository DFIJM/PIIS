import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessnameRenderer } from '../cell-renderers/business-name.component';
import { ColDef } from 'ag-grid-community';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'piis-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  constructor(public dialogRef: MatDialogRef<InfoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  frameworkComponents = { businessNameRenderer: BusinessnameRenderer };

  columnDefs: ColDef[] = [
    { headerName: 'Negocio', field: 'name', cellRenderer: 'businessNameRenderer', flex: 1 },
    {
      headerName: 'Cantidad',
      field: 'count',
      valueFormatter: this.numberFormatter(),
      cellClass: 'number',
      headerClass: 'number',
      width: 100,
    },
  ];

  private numberFormatter() {
    return (params) => formatNumber(params.value, 'es');
  }
}
