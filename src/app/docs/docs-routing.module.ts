import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocComponent } from './doc/doc.component';
import { DocsComponent } from './docs.component';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
  },
  {
    path: ':id',
    component: DocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DocsRoutingModule {}
