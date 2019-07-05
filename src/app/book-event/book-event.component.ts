import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { SearchEventService } from '../navbar/search-event.service';

@Component({
  selector: 'app-book-event',
  templateUrl: './book-event.component.html',
  styleUrls: ['./book-event.component.css']
})
export class BookEventComponent implements OnInit {
  id:number;
  events : IEventListing[];
  seatsAvailable : number=1;
  seatsError:boolean = false;
  event : IEventListing;
  user : IUserBooking;

  userForm :FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required,this.NameValidator]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phoneNumber:new FormControl('',[Validators.required,this.phoneValidator]),
    numberOfSeats:new FormControl('',[Validators.required]),
    nameOfAttendees: this.formBuilder.array([
      this.formBuilder.group({
        attendee : new FormControl('',Validators.required)
      })
    ])
  })
 
  
  constructor(private route:ActivatedRoute,private http:HttpClient,private formBuilder: FormBuilder) { 

  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')) ;
    console.log(this.id);
    (this.userForm.controls.nameOfAttendees as FormArray).removeAt(0);

    this.http.get('http://localhost:4200/assets/events-data.json')
    .subscribe(event =>{
      this.events = <IEventListing[]>event;
      this.events = this.events.filter(event=>event.id==this.id);
    })
  }

  NameValidator(control : AbstractControl): {[key:string]:boolean} | null {
    var RegExpression = /^[a-zA-Z\s]*$/;
    if (!RegExpression.test(control.value)) {
      return {"nameValidation":true};
    } 
    else {
      return null;
    }
  } 
  phoneValidator(control : AbstractControl): {[key:string]:boolean} | null {
    var RegExpression = /^[0-9]*$/;
    if (control.value.length != 10 || !RegExpression.test(control.value)) {
      return {"phone":true};
    } 
    else {
      return null;
    }
  }
  arraySeats=[];
  seatsCheck(){
    this.seatsError = false;
    this.arraySeats =[];    
    if(this.seatsAvailable > this.events[0].seatsAvailable){
      this.seatsError = true;
    }
    while((this.userForm.controls.nameOfAttendees as FormArray).length>0){
      (this.userForm.controls.nameOfAttendees as FormArray).removeAt(0);
    }
    
    for (let index = 0; index < this.seatsAvailable-1; index++) {
      (this.userForm.get('nameOfAttendees') as FormArray).push(this.formBuilder.group({
        attendee : new FormControl('',Validators.required)
      }));
    }
  }
  submit(){
    console.log(this.userForm.get('name').value);
    console.log(this.userForm.get('email').value);
    console.log(this.userForm.get('phoneNumber').value);
    console.log(this.userForm.get('numberOfSeats').value);
    for (let index = 0; index < this.seatsAvailable-1; index++) {
      console.log(((this.userForm.get('nameOfAttendees') as FormArray).controls[index] as FormArray).get('attendee').value)
    }
  }
}
