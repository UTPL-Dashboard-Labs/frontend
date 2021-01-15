import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  urlApi = environment.urlApi;
  constructor(private http: HttpClient) { }
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
}
