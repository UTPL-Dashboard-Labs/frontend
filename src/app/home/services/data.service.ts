import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { Observable, Subject, Subscriber } from 'rxjs';
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  urlApi = environment.urlApi;
  socket: any;
  socketEvents = new Subject<any>();
  constructor(private http: HttpClient) { 
    this.socket = io(this.urlApi)
    this.socket.on('connection',(res:any)=>{
      this.socketEvents.next(res)
    })
  }

  getLiveDataStatus(): Observable<any>{
    return new Observable(subscriber=>{
      this.socket.on('dataStatus', (data:any)=>{
        subscriber.next(data);
      })
    })
   
  }

  getUsagePerImage(): Observable<any>{
    return this.http.get(`${this.urlApi}/reservations-per-image`)
  }

  getHourPerUser(): Observable<any>{
    return this.http.get(`${this.urlApi}/hours-per-user`)
  }

  getReservationPerUser(): Observable<any>{
    return this.http.get(`${this.urlApi}/reservations-per-user`)
  }
  getHourPerImage(): Observable<any>{
    return this.http.get(`${this.urlApi}/hours-per-image`)
  }
  getusersLis(): Observable<any>{
    return this.http.get(`${this.urlApi}/users-list`)
  }

  getUserData(mail:string): Observable<any>{
    return this.http.get(`${this.urlApi}/user-data/${mail}`)
  }

  uploadFile(file:any){
    return this.http.post(`${this.urlApi}/upload`, file )
  }

  getDataStatus(): Observable<any>{
    return this.http.get(`${this.urlApi}/data-status`)
  }
}
