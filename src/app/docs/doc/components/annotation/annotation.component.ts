import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Annotation, AnnotationSize, AnnotationType } from '../../../models/annotation';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnotationComponent implements AfterViewInit {
  @Input() set annotation(data: Annotation) {
    this.uuid = data.uuid;
    if (data.type === AnnotationType.image) {
      this.image = data.content as File;

      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        this.imgSrc$.next(event.target?.result as string);
      });
      reader.readAsDataURL(this.image);
    }
  }
  @Output() deleteAnnotation = new EventEmitter<string>();
  @Output() updateAnnotationContent = new EventEmitter<string>();
  @Output() annotationRendered = new EventEmitter<AnnotationSize>();

  public image?: File;
  public uuid = '';

  public imgSrc$ = new BehaviorSubject('');

  constructor(private el: ElementRef) {}

  public ngAfterViewInit(): void {
    this.updSize();
  }

  public updSize(): void {
    this.annotationRendered.emit(this.dimensions);
  }

  public delete(): void {
    this.deleteAnnotation.emit(this.uuid);
  }

  public changeText(evt: Event): void {
    this.updateAnnotationContent.emit((evt.target as HTMLInputElement).value);
    this.updSize();
  }

  private get dimensions(): AnnotationSize {
    const { width, height } = this.el.nativeElement.querySelector('mat-card').getBoundingClientRect();
    return { width, height };
  }

}
