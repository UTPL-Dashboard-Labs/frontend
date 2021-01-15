import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as Highcharts from 'highcharts';
import * as _ from 'lodash';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  optionList = [
    { id: 'RI', name: 'Reservaciones por imagen' },
    { id: 'HI', name: 'Horas por imagen' },
    { id: 'FH', name: 'Horas por fecha' },
  ];
  selectedOption = this.optionList[0];
  chartRef: Highcharts.Chart;
  email: any = this.route.snapshot.paramMap.get('mail');
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      events: {
        load: () => {
          this.getNumberOfreservations();
        },
      },
    },
    title: {
      text: '',
    },
    credits: { text: 'By: David Pardo' },
    series: [
      {
        name: 'Reservaciones',
        data: [],
        type: 'column',
      },
    ],
    xAxis: { type: 'category' },
  };
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}
  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };
  ngOnInit(): void {
  }
  getNumberOfreservations() {
    this.dataService.getUserData(this.email).subscribe((res) => {
      this.chartRef.update({
        title: { text: this.selectedOption.name },
        series: [{ type: 'column', name: 'Reservaciones por imagen' }],
      });
      const object = _.groupBy(res.data, 'Imagen');
      this.chartRef.series[0].setData(
        Object.entries(object).map((key) => ({
          name: key[0],
          y: key[1].length,
        }))
      );
    });
  }
  getHour() {
    this.dataService.getUserData(this.email).subscribe((res) => {
      this.chartRef.update({
        title: { text: this.selectedOption.name },
        series: [{ type: 'column', name: 'Hours' }],
      });
      const object = _.groupBy(res.data, 'Imagen');

      this.chartRef.series[0].setData(
        Object.entries(object).map((key) => ({
          name: key[0],
          y: key[1]
            .map((array) => parseInt(array.Horas))
            .reduce((a, b) => a + b),
        }))
      );
    });
  }

  hoursPerdate() {
    this.dataService.getUserData(this.email).subscribe((res) => {
      this.chartRef.update({
        title: { text: this.selectedOption.name },
        series: [{ type: 'column', name: 'Hours' }],
      });
      console.log(res);

      const object = _.groupBy(res.data, 'Fecha inicio de reservación');
      console.log(object);

      this.chartRef.series[0].setData(Object.entries(object).map((key) => ({
        name: key[0],
        y: parseInt(key[1][0].Horas),
      })))

    });
  }
  changeOption(e: any) {
    console.log(e);
    this.selectedOption = e;
    if (e.id === 'RI') {
      this.getNumberOfreservations();
    }
    if (e.id === 'HI') {
      this.getHour();
    }
    if (e.id === 'FH') {
      this.chartRef.series[0].setData([])
      this.hoursPerdate();
    }
  }
}
