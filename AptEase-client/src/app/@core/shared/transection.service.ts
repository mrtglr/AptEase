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

  getUserTransections() {
    return this.http.get<any[]>(this.baseUrl + '/Transection/listForUser');
  }

  createTransection(transection: any) {
    return this.http.post<any[]>(this.baseUrl + '/Transection/createTransection', transection);
  }

}
