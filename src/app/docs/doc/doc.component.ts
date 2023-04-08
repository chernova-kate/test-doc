import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ComponentStore } from '@ngrx/component-store';
import { filter, first, fromEvent, throttleTime, withLatestFrom } from 'rxjs';

import { Doc } from '../models/doc';
import { DocsService } from '../services/docs.service';
import { AnnotationTypeSheetComponent } from './components/annotation-type-sheet/annotation-type-sheet.component';
import { Annotation, AnnotationType } from '../models/annotation';
import { isBelowCenterOfTheScreen } from '../../utils/is-on-screen';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ComponentStore],
})
export class DocComponent implements OnInit {

  public doc$ = this.componentStore.select(state => state.doc);
  public annotations$ = this.componentStore.select(state => state.annotations);
  public currentPage$ = this.componentStore.select(state => state.currentPage);

  public scale = 100;
  public step = 10;

  public types = AnnotationType;

  constructor(
    private componentStore: ComponentStore<{
      doc: Doc,
      annotations: { [pageNum: number]: { [uuid: string]: Annotation } },
      currentPage: number
    }>,
    private api: DocsService,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private elRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.api.getDocById(this.route.snapshot.paramMap.get('id') as string)
      .subscribe(doc => this.componentStore.setState({ doc, annotations: {}, currentPage: 0 }));

    fromEvent(window, 'scroll')
      .pipe(throttleTime(100))
      .subscribe(() => this.componentStore.patchState({ currentPage: this.currentPageNum }));
  }

  public zoomIn(): void {
    this.scale += this.step;
  }

  public zoomOut(): void {
    this.scale -= this.step;
  }

  public selectAnnotationType(): void {
    this.bottomSheet
      .open(AnnotationTypeSheetComponent)
      .afterDismissed()
      .pipe(
        filter(result => result),
        withLatestFrom(this.currentPage$)
      )
      .subscribe(([result, page]) => this.updAnnotation(page, result.uuid, {
        ...result,
        page,
        position: {
          x: 0,
          y: 0
        }
      }));
  }

  public deleteAnnotation(page: number, uuid: string): void {
    this.componentStore.patchState((state) => {
      const annotations = { ...state.annotations };
      delete annotations[page][uuid];
      return { annotations }
    });
  }

  public updAnnotation(page: number, uuid: string, args: Partial<Annotation>): void {
    this.componentStore.patchState((state) => {
      const currentPageAnnotations = state.annotations[page] || {};
      return {
        annotations: {
          ...state.annotations,
          [page]: {
            ...currentPageAnnotations,
            [uuid]: {
              ...currentPageAnnotations[uuid],
              ...args
            }
          }
        }
      }
    })
  }

  public trackByFn(index: number, item: KeyValue<string, Annotation>): string {
    return item.value.uuid;
  }

  public saveData(): void {
    this.annotations$.pipe(first()).subscribe(data => console.log(data));
  }

  private get currentPageNum(): number {
    const pages = Array.from(this.elRef.nativeElement.querySelectorAll('.page') as HTMLElement[]);
    return pages.findIndex(page => isBelowCenterOfTheScreen(page));
  }
}
