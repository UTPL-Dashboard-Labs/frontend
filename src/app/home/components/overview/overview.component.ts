import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  chartRef: Highcharts.Chart;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title:{text:'Usage October 2020'},
    chart: {
      events:{
        load:()=>{
          this.getUsagePerImage()
        }
      },
      plotShadow: false,
      type: 'pie',
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: false
          },
          showInLegend: true
      }
  },
    series: [{
      type:'pie',
      name: 'Usage.',
      colorByPoint: true,
      data: []
  }]
  };
  constructor(private dataService: DataService) {}
  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };
  ngOnInit(): void {
    
  }
  getUsagePerImage(){
    this.dataService.getUsagePerImage().subscribe((res:Array<any>)=>{
      this.chartRef.series[0].setData(res.map(point=>({name:point.image, y:point.reservaciones})))
    })
  }
}
