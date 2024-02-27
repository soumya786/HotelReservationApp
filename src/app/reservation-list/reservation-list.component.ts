import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit{

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();

  }

  deleteReservation(id: string){
    this.reservationService.deleteReservation(id);
  }
  onClickHome(){
    this.reservationService.onClickHome();
  }

  displayedColumns: string[] = ['guestName','guestEmail','roomNumber','checkInDate','checkOutDate', 'actions'];
}
