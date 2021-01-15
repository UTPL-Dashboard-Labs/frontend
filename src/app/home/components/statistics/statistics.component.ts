import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  chartRef: Highcharts.Chart;
  optionList = [
    { id: 'RI', name: 'Reservaciones por imagen' },
    { id: 'HI', name: 'Horas por imagen' },
    { id: 'HU', name: 'Horas por ususario' },
    { id: 'RU', name: 'Reservaciones por ususario' },
  ];
  selectedOption = this.optionList[0];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      events: {
        load: () => {
          this.getUsePerImage();
        },
      },
    },
    title: {
      text: this.selectedOption.name,
    },
    credits: { text: 'By: David Pardo' },
    series: [
      {
        name: 'Reservaciones',
        data: [],
        type: 'line',
      },
    ],
    xAxis: { type: 'category' },
  };
  constructor(private dataService: DataService) {}
  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };
  ngOnInit(): void {}

  getUsePerImage() {
    this.dataService.getUsagePerImage().subscribe((res: Array<any>) => {
      this.chartRef.update({
        title: { text: this.selectedOption.name },
        series: [{ type: 'line', name: 'Reservaciones' }],
      });
      this.chartRef.series[0].setData(
        res.map((point) => ({ name: point.image, y: point.reservaciones }))
      );
    });
  }

  getHoursPerUser() {
    this.dataService.getHourPerUser().subscribe((res: Array<any>) => {
      this.chartRef.update({
        title: { text: this.selectedOption.name },
        series: [{ type: 'line', name: 'Horas' }],
      });
      res.pop()
      this.chartRef.series[0].setData(
        res.map((point:any) => ({ name: point.user, y: point.hours }))
      );
    });
  }

  getReservationPerUser() {
    this.dataService.getReservationPerUser().subscribe((res: Array<any>) => {
      this.chartRef.update({
        title: { text: this.selectedOption.name },
        series: [{ type: 'line', name: 'Reservaciones' }],
      });
      this.chartRef.series[0].setData(
        res.map((point) => ({ name: point.correo, y: point.reservaciones }))
      );
    });
  }

  getHoursPerImage() {
    this.dataService.getHourPerImage().subscribe((res: Array<any>) => {
      this.chartRef.update({
        title: { text: this.selectedOption.name },
        series: [{ type: 'line', name: 'Hours' }],
      });
      res.pop()
      this.chartRef.series[0].setData(
        res.map((point) => ({ name: point.image, y: point.hours }))
      );
    });
  }

  changeOption(e: any) {
    this.selectedOption = e;
    if (e.id === 'RI') {
      this.getUsePerImage();
    }
    if (e.id === 'HU') {
      this.getHoursPerUser();
    }
    if (e.id === 'RU') {
      this.getReservationPerUser();
    }
    if (e.id === 'HI') {
      this.getHoursPerImage();
    }
  }
}
