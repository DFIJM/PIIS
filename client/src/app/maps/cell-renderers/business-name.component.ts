import { Component } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'business-name-cell',
  template: `
    <div class="row">
      <img class="col icon" [src]="params.data.icon" />
      <div class="col text">{{ params.value }}</div>
    </div>
  `,
  styles: [
    `
      .row {
        flex-direction: row;
        display: flex;
        align-items: center;
      }
      .col.icon {
        flex: 0 0 24px;
        max-width: 24px;
        min-width: 24px;
        height: 24px;
        margin-right: 10px;
      }
      .col.text {
        flex: 1 1;
      }
      img {
        border: 1px solid #babfc7;
        background-color: #404040;
        border-radius: 3px;
      }
    `,
  ],
})
export class BusinessnameRenderer implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
