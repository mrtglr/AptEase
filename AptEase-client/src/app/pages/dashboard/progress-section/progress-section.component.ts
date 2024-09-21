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
      title: 'My Bills',
      value: 0,
      activeProgress: 100
    },
    {
      title: 'My Transections',
      value: 0,
      activeProgress: 100
    },
    {
      title: 'My Completed Bills',
      value: 0,
      activeProgress: 0
    },
  ];

  constructor(private billService: BillService, private transectionService: TransectionService) { }

  ngOnInit(): void {
    this.billService.getBillsForUser().subscribe(response => {
      this.progressInfoData[0].value = response.length;

      response.forEach((e: any) => {
        if (e.isPaid) {
          this.completedBillCount++;
        }
      });

      this.progressInfoData[2].value = this.completedBillCount;
      this.progressInfoData[2].activeProgress = (this.completedBillCount / response.length) * 100;
    });

    this.transectionService.getUserTransections().subscribe(response => {
      this.progressInfoData[1].value = response.length;
    });
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
