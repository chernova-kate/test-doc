import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { DocComponent } from './doc/doc.component';
import { DocsRoutingModule } from './docs-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { DocsService } from './services/docs.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AnnotationTypeSheetComponent } from './doc/components/annotation-type-sheet/annotation-type-sheet.component';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AnnotationComponent } from './doc/components/annotation/annotation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    DocsComponent,
    DocComponent,
    AnnotationTypeSheetComponent,
    AnnotationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    DocsRoutingModule,
    MatCardModule,
    MatListModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatInputModule,
    CdkDrag,
    MatToolbarModule
  ],
  providers: [DocsService]
})
export class DocsModule { }
