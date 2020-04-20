import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-zone-actions',
  templateUrl: './zone-actions.component.html',
  styleUrls: ['./zone-actions.component.scss'],
})
export class ZoneActionsComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<ZoneActionsComponent>) {}

  actions = [
    {
      name: 'remove',
      class: 'remove',
      icon: 'delete',
      title: 'Eliminar',
      description: 'Se eliminará la zona, información recopilada y comparativas',
    },
  ];

  choose(selection: string) {
    this._bottomSheetRef.dismiss(selection);
  }
}
