import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessnameRenderer } from '../cell-renderers/business-name.component';
import { ColDef } from 'ag-grid-community';
import { formatNumber } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'piis-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  isComparative = Boolean(this.data.zone2);

  zone1: any;
  zone2: any;

  frameworkComponents = { businessNameRenderer: BusinessnameRenderer };

  columnsBusiness: ColDef[] = [
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

  columnsTwiter: ColDef[] = [
    { headerName: 'Nombre', field: 'name', flex: 1 },
    {
      headerName: 'Tweets',
      field: 'count',
      valueFormatter: this.numberFormatter(),
      cellClass: 'number',
      headerClass: 'number',
      width: 100,
    },
  ];

  async ngOnInit() {
    this.zone1 = await this.http.post('api/zone/info', { name: this.data.zone1 }).toPromise();
    if (this.isComparative) {
      this.zone2 = await this.http.post('api/zone/info', { name: this.data.zone2 }).toPromise();
    }
  }

  async save() {
    // await this.http.post('api/zone/save-comparative', { zone: this.zone1, zone2: this.zone2 }).toPromise();
    this.dialogRef.close();
  }

  private numberFormatter() {
    return (params) => formatNumber(params.value, 'es');
  }
}
