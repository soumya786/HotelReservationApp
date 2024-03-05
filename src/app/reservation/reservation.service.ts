import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = "http://localhost:8081/reservation";
  private reservations: Reservation[] = [];

  constructor(private http: HttpClient){}

  // constructor(private route: Router){
  //   if(typeof localStorage !== 'undefined'){
  //     let savedReservations  = localStorage.getItem('reservations');
  //     this.reservations =
  //     savedReservations? JSON.parse(savedReservations) : [];
  //   }else{
  //     console.error("Local storage error");
  //   }

  // }

  getReservations(): Observable<Reservation []>{
    // return this.reservations;
    return this.http.get<Reservation[]>(this.apiUrl + "/allReservations");
  }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + '/reservation/' + id);
  }

  addReservation(reservation: Reservation): Observable<void>{

    return this.http.post<void>(this.apiUrl+'/addReservation', reservation);

  }

  deleteReservation(id: string): Observable<void>{
    return this.http.delete<void>(this.apiUrl+'/deleteReservation/'+id);

  }

  updateReservation(id: string, updateReservation: Reservation): Observable<void>{
    return this.http.put<void>(this.apiUrl+'/updateReservation/'+id,updateReservation);

  }

}
