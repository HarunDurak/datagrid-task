import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataGridModel } from 'src/app/shared/models/data-table';
@Injectable({
  providedIn: 'root',
})
export class DataTableService {
  path: string = 'http://localhost:3001/social';

  constructor(private httpClient: HttpClient) {}

  get(): Observable<any> {
    return this.httpClient.get(this.path);
  }
  add(dataGridModel: DataGridModel): Observable<any> {
    return this.httpClient.post(this.path, dataGridModel);
  }
}
