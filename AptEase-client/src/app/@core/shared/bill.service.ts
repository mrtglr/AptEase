import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseService {

  billAnalisys = [
    {
      name: 'Dues',
      value: 0,
    },
    {
      name: 'Other Bills',
      value: 0,
    },
    {
      name: 'Interest Amount',
      value: 0,
    },
  ];

  constructor(private http: HttpClient) {
    super();
  }

  getBillsForUser() {
    return this.http.get<any[]>(this.baseUrl + '/Bill/getBillsForUser');
  }
}
