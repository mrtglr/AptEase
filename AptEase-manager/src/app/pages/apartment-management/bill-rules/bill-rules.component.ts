import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HelperService } from '../../../@core/helper/helper.service';
import { BillService } from '../../../@core/shared/bill.service';

@Component({
  selector: 'ngx-bill-rules',
  templateUrl: './bill-rules.component.html',
  styles: []
})
export class BillRulesComponent implements OnInit {

  constructor(private service: BillService, private helper: HelperService) { }

  loading = false;
  billPaymentRule: any;
  isCheck = false;

  billRuleUpdate = {
    billAmount: 0,
    cutOffDate: null,
    dueDate: null,
  };

  ngOnInit(): void {
    this.getBillRule();
  }

  getBillRule() {
    this.loading = true,
      this.service.getBillPaymentRule()
        .subscribe(
          res => {
            this.loading = false;
            this.billPaymentRule = res;
          },
          err => {
            this.loading = false;
            console.log(err);
          },
        )
  }

  checkValue(event: any) {
    this.isCheck = event.target.checked;
  }

  onSubmit(form: NgForm) {

    if (this.isCheck) {
      this.loading = true;
      this.service.updateBillPaymentRule(form.value).subscribe(
        (res: any) => {
          this.helper.toast('success', 'Bill payment rule updated', '');
          this.loading = false;
          this.getBillRule();
        },
        (err: any) => {
          this.helper.toast('danger', 'Operation failed', '');
          console.log(err);
          this.loading = false;
        }
      )
    }
    else {
      this.helper.toast('danger', 'Please confirm to approve', '');
    }
  }
}
