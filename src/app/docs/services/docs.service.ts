import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doc } from '../models/doc';

@Injectable()
export class DocsService {
  constructor(private http: HttpClient) {
  }

  public getDocById(id: string): Observable<Doc> {
    return this.http.get<Doc>('/assets/mocks/docs/1.json', {
      params: { id }
    })
  }
}
