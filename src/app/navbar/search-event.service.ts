import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchEventService {

  searchText = new BehaviorSubject('');
  currentSearchText = this.searchText.asObservable();

  constructor() { }

  setSearchText(text:string){
    this.searchText.next(text);
  }
  _seats:number;
  set seats(value:number){
    this._seats = value;
  }
  get seats(){
    return this._seats;
  }
}
