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

  getBills() {
    return this.http.get<any[]>(this.baseUrl + '/Bill/list');
  }

  getUserBills(user_id: string) {
    return this.http.get<any[]>(this.baseUrl + '/Bill/getUserBills?user_id=' + user_id);
  }

  createBillsGeneric(billGenericModel: any) {
    return this.http.post<any[]>(this.baseUrl + '/Bill/createBillsGeneric', billGenericModel);
  }

  getBillPaymentRule() {
    return this.http.get<any[]>(this.baseUrl + '/Bill/getBillPaymentRule');
  }

  updateBillPaymentRule(billPaymentRule: any) {
    return this.http.put<any[]>(this.baseUrl + '/Bill/updateBillPaymentRule', billPaymentRule);
  }

  approveBillPayment(bill_id: number) {
    return this.http.post<any[]>(this.baseUrl + '/Bill/approveBillPayment?bill_id=' + bill_id, null);
  }

  addBillForUsers(bill: any) {
    return this.http.post<any[]>(this.baseUrl + '/Bill/addBillForUsers', bill);
  }

  removeBill(bill_id: any) {
    return this.http.delete<any[]>(this.baseUrl + '/Bill/removeBill?bill_id=' + bill_id);
  }

  getUserDebtAnalisys() {
    return this.http.get<any[]>(this.baseUrl + '/Bill/getUserDebtAnalisys');
  }

  getBillAnalisys() {
    return this.http.get<any[]>(this.baseUrl + '/Bill/getBillAnalisys');
  }
}
