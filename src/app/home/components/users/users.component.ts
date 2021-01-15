import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersList:any[] = [];
  filterList:any[]=[];
  userToFind='';
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getusersLis().subscribe(res=>{
      this.usersList = res;
    })
  }
  changeInput(e:any){
    this.userToFind = e.target.value;
    this.filterList = this.usersList.filter(obj=>obj.correo.includes(this.userToFind))
  }
}
