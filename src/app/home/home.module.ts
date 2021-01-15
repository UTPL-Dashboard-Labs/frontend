import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { OverviewComponent } from './components/overview/overview.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { UsersComponent } from './components/users/users.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserComponent } from './components/user/user.component';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [HomeComponent, OverviewComponent, StatisticsComponent, UsersComponent, UserComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers:[DataService]
})
export class HomeModule { }
