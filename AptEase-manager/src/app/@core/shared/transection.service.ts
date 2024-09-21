import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TransectionService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  list() {
    return this.http.get<any[]>(this.baseUrl + '/Transection/list');
  }

  approveTransection(transection_id: number) {
    return this.http.post<any[]>(this.baseUrl + '/Transection/approveTransection?transection_id=' + transection_id, null);
  }

  rejectTransection(transection_id: number) {
    return this.http.post<any[]>(this.baseUrl + '/Transection/rejectTransection?transection_id=' + transection_id, null);
  }

}
