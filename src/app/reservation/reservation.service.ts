import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = "http://localhost:3001";
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
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations");
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(res=>res.id===id)
  }

  addReservation(reservation: Reservation): void{

    if(typeof localStorage!== 'undefined'){
      reservation.id = Date.now().toString();
      this.reservations.push(reservation);
      // localStorage.setItem('reservations', JSON.stringify(this.reservations));
      console.log(this.reservations);
    }else{
      console.error("Local storage error");
    }

  }

  deleteReservation(id: string): void{
    if(typeof localStorage!== 'undefined'){
      let index = this.reservations.findIndex(r => r.id === id);
      this.reservations.splice(index,1);
      // localStorage.setItem('reservations', JSON.stringify(this.reservations));

    }else{
      console.error("Local storage error");
    }

  }

  updateReservation(id: string, updateReservation: Reservation):void{
    if(typeof localStorage!== 'undefined'){
      let index = this.reservations.findIndex(r =>
        r.id === id);
        updateReservation.id = id;
        this.reservations[index] = updateReservation;
        localStorage.setItem('reservations', JSON.stringify(this.reservations));

    }else{
      console.error("Local storage error");
    }

  }

}
