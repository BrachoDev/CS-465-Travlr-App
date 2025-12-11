import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css'],
})
export class TripListing implements OnInit {
  trips$: Observable<Trip[]>; // Use observable for reactive updates
  message: string = '';

  constructor(private tripData: TripData, private router: Router, private authenticationService: Authentication) {
    console.log('TripListing constructor');
    this.trips$ = this.tripData.getTrips();
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.trips$.subscribe((trips) => {
      if (trips.length > 0) {
        this.message = `There are ${trips.length} trips available.`;
      } else {
        this.message = 'There are no trips available.';
      }
      console.log(this.message);
    });
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
}

// I HAD TO CREATE A NEW VERSION OF THE CODE BELOW BECAUSE THE CURRENT ONE KEEPS GIVING ERRORS
// AND WON'T SHOW THE TRIPS FROM THE DATABASE IN THE ADMIN INTERFACE.

// OLD CODE BELOW:
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { trips } from '../data/trips';
// import { TripCard } from '../trip-card/trip-card';

// import { Trip } from '../models/trip';
// import { TripData } from '../services/trip-data';

// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-trip-listing',
//   standalone: true,
//   imports: [CommonModule, TripCard],
//   templateUrl: './trip-listing.html',
//   styleUrl: './trip-listing.css',
//   // providers: [TripData]
// })
// export class TripListing implements OnInit {
//   trips: Array<any> = trips;

//   message: string = '';

//   constructor(
//     private TripData: TripData,
//     private router: Router
//   ) {
//     console.log('trip-listing constructor');
//   }
//   public addTrip(): void {
//     this.router.navigate(['add-trip']);
//   }

//   private getStuff(): void {
//     this.TripData.getTrips().subscribe({
//       next: (value: any) => {
//         this.trips = value;
//         if (value.length > 0) {
//           this.message = 'There are ' + value.length + ' trips available.';
//         } else {
//           this.message = 'There were no trips retrieved from the database';
//         }
//         console.log(this.message);
//       },
//       error: (error: any) => {
//         console.log('Error: ' + error);
//       },
//     });
//   }
//   ngOnInit(): void {
//     console.log('ngOnInit');
//     this.getStuff();
//   }
// }
