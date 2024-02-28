import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators, FormGroup } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from  '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit{

  reservationForm: FormGroup = new FormGroup ({});

  constructor(
    private formBuilder: FormBuilder,
    private  reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.reservationForm =  this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['',Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['',[Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');
     if (id) {
      this.reservationService.getReservation(id).subscribe(reservation => {
        if(reservation){
          this.reservationForm.patchValue(reservation);
        }
      })

     }
  }

  onSubmit(){
    if(this.reservationForm.valid){
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        //updating the existing id
        // reservation.id=id;
        this.reservationService.updateReservation(id,reservation).subscribe(()=>{
          alert("Updated Successfully");
        });
      }else{
        //new id creation
        this.reservationService.addReservation(reservation).subscribe(()=>{
          alert("Reservation Added Successfully");
        })
      }


      this.router.navigate(['/list']);
    }
  }

}
