import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventListingComponent } from './event-listing/event-listing.component';
import { HttpClientModule } from '@angular/common/http';
import { BookEventComponent } from './book-event/book-event.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventListingComponent,
    BookEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
