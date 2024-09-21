import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbCalendarModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'angular2-chartjs';
import { ECommerceProgressSectionComponent } from './progress-section/progress-section.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { D3PieComponent } from './d3/d3-advanced-pie.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    NbCalendarModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbSpinnerModule,
  ],
  declarations: [
    DashboardComponent,
    ECommerceProgressSectionComponent,
    D3PieComponent
  ],
  providers: [],
})
export class DashboardModule { }
