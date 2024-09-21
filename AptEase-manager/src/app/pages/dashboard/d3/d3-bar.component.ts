import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { UserService } from '../../../@core/shared/user.service';
import { BillService } from '../../../@core/shared/bill.service';

@Component({
    selector: 'ngx-d3-bar',
    template: `
    <ngx-charts-bar-vertical
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-bar-vertical>
  `,
})
export class D3BarComponent implements OnInit, OnDestroy {

    resultsCount: number = 0;
    results = [];

    showLegend = true;
    showXAxis = true;
    showYAxis = true;
    xAxisLabel = 'Country';
    yAxisLabel = 'Population';
    colorScheme: any;
    themeSubscription: any;

    constructor(private theme: NbThemeService, private userService: UserService, private billService: BillService) {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            const colors: any = config.variables;
            this.colorScheme = {
                domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
            };
        });
    }

    ngOnInit(): void {
        this.billService.getUserDebtAnalisys().subscribe(response => {
            this.results = response;
        });
    }

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }
}