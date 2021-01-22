import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @ViewChild('uploadFile', { static: false }) uploadFileModal: ModalDirective;
  file: File;
  chartRef: Highcharts.Chart;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: { text: 'Usage October 2020' },
    chart: {
      events: {
        load: () => {
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
      type: 'pie',
      name: 'Usage.',
      colorByPoint: true,
      data: []
    }]
  };
  constructor(private dataService: DataService, private router: Router, private toastService: ToastrService) { }
  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };
  ngOnInit(): void {
    this.dataService.getLiveDataStatus().subscribe(data => {

      this.getUsagePerImage()

    })
    this.dataService.socketEvents.asObservable().subscribe(res => {
      this.toastService.success(res)
    })
  }
  getUsagePerImage() {
    this.dataService.getDataStatus().subscribe(res => {
      if (res.data === true) {
        this.dataService.getUsagePerImage().subscribe((res: Array<any>) => {
          this.chartRef.series[0].setData(res.map(point => ({ name: point.image, y: point.reservaciones })))
        })
      } else {
        Swal.fire({
          title: 'No hay datos para mostar',
          text: 'Por favor, sube un documento (.xlsx)',
          icon: 'warning',
          confirmButtonText: 'Subir',
          showCancelButton: true,
          cancelButtonText: 'Cancelar y Salir',
          allowOutsideClick: false
        }).then(res => {
          if (!res.isConfirmed) {
            this.router.navigateByUrl('/login')
          } else {
            this.uploadFileModal.show()
          }
        })
      }
    })

  }

  onSubmit() {
    let formdata = new FormData();
    formdata.append('File', this.file, this.file.name)
    this.uploadFileModal.hide();
    this.dataService.uploadFile(formdata).subscribe((res: any) => {
      this.toastService.info('Nuevos Datos')
    })

  }

  fileChange(event: any) {
    this.file = event.target.files[0];
  }
}
