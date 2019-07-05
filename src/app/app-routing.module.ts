import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListingComponent } from './event-listing/event-listing.component';
import { BookEventComponent } from './book-event/book-event.component';

const routes: Routes = [
  {path:'',component:EventListingComponent},
  {path:'bookEvent/:id',component:BookEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
