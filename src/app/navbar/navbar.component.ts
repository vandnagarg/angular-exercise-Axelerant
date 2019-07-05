import { Component, OnInit } from '@angular/core';
import { SearchEventService } from './search-event.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private searchEventservice : SearchEventService) { }
  search(){
    this.searchEventservice.setSearchText(this.searchText);
  }
  searchText:string;
  ngOnInit() {
    this.searchEventservice.currentSearchText.subscribe(data=>{
      this.searchText = data;
    })
  }

}
