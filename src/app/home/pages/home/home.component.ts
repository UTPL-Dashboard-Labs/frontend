import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  file:File;
  @ViewChild('uploadFile', { static: false }) uploadFileModal: ModalDirective;
  constructor(private modalService: BsModalService, private dataservice: DataService) {}

  ngOnInit(): void {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  onSubmit(){
    let formdata = new FormData();
    formdata.append('File', this.file, this.file.name)
    this.dataservice.uploadFile(formdata).subscribe((res:any)=>{
      Swal.fire({
        text:res.message
      }).then(res=>{
        if(res.isConfirmed){
        }
      })
    })

  }

  fileChange(event:any){
    this.file = event.target.files[0];
  }

  deleteFile(){
    this.dataservice.deleteFile().subscribe((res:any)=>{
      Swal.fire({text:res.message})
    })
  }
}
