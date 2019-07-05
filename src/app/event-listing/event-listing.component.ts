import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchEventService } from '../navbar/search-event.service';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.css']
})
export class EventListingComponent implements OnInit {
  searchText:string;

  events:IEventListing[];
  constructor(private http:HttpClient ,private searchEventservice:SearchEventService) { }

  ngOnInit() {
    this.http.get('http://localhost:4200/assets/events-data.json')
    .subscribe(data=> {
      this.events = <IEventListing[]>data;
      this.searchEventservice.currentSearchText.subscribe(data1=>{
        this.events  = <IEventListing[]>data;
        this.searchText = data1;
        this.events = this.events.filter(event=>event.name.indexOf(this.searchText) != -1)
        console.log(this.events); 
      })
    })
    
    
  }

}
