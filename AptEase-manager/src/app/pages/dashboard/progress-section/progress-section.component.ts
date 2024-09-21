import { Component, OnDestroy, OnInit } from '@angular/core';
import { BillService } from '../../../@core/shared/bill.service';
import { TransectionService } from '../../../@core/shared/transection.service';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent implements OnInit, OnDestroy {

  private alive = true;
  completedBillCount: number = 0;

  progressInfoData: any[] = [
    {
      title: 'Pending Transections',
      value: 0,
      activeProgress: 100
    },
    {
      title: 'Paid Bills',
      value: 0,
      activeProgress: 100
    },
    {
      title: 'Not Paid Bills',
      value: 0,
      activeProgress: 0
    },
  ];

  constructor(private billService: BillService, private transectionService: TransectionService) { }

  ngOnInit(): void {
    this.transectionService.list().subscribe(res => {
      const filteredRes = res.filter((e: any) => e.transectionStatus === 0);

      this.progressInfoData[0].value = filteredRes.length;
    });

    this.billService.getBills().subscribe(res => {
      const paidBills = res.filter((e: any) => e.isPaid);
      const unPaidBills = res.filter((e: any) => !e.isPaid);

      this.progressInfoData[1].value = paidBills.length;
      this.progressInfoData[1].activeProgress = (paidBills.length / res.length) * 100;

      this.progressInfoData[2].value = unPaidBills.length;
      this.progressInfoData[2].activeProgress = (unPaidBills.length / res.length) * 100;
    });
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
