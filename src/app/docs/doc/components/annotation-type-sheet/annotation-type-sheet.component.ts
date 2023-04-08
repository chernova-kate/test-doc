import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { v4 as uuidv4 } from 'uuid';

import { AnnotationType } from '../../../models/annotation';

@Component({
  selector: 'app-annotation-type-sheet',
  templateUrl: './annotation-type-sheet.component.html',
  styleUrls: ['./annotation-type-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnotationTypeSheetComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<AnnotationTypeSheetComponent>) {}

  public onImageSelected(evt: Event): void {
    this._bottomSheetRef.dismiss({
      uuid: uuidv4(),
      type: AnnotationType.image,
      content: ((evt.target as HTMLInputElement).files as FileList)[0]
    });
  }

  public onTextSelected(): void {
    this._bottomSheetRef.dismiss({
      uuid: uuidv4(),
      type: AnnotationType.text,
      content: ''
    });
  }
}
