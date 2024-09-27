import { Component, OnInit } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapGeocoder } from '@angular/google-maps';
import { User } from '../../models/user';
import { Address } from '../../models/address';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-reports',
  standalone: true,
  imports: [
    GoogleMap,
    GoogleMapsModule,
    CommonModule
  ],
  templateUrl: './map-reports.component.html',
  styleUrl: './map-reports.component.css'
})
export class MapReportsComponent implements OnInit {

  user: User | null = null;
  addr: Address | null = null;

  center: google.maps.LatLngLiteral | null = null;
  zoom = 4;
  display: google.maps.LatLngLiteral | null = null;

  constructor(
    private authService: AuthService,
    private geocoder: MapGeocoder
  ){}

  ngOnInit(): void {
    this.loadUserToMap();

  }

  loadUserToMap(): void {
    this.authService.getLoggedInUser().subscribe({
      next: (loggedInUser) => {
        this.user = loggedInUser;
        this.getUserLocation();
      },
      error: (problem) => {
        console.error('MapReportsComponent.loadUserToMap(): Error loading user with map');
        console.error(problem);
      }
    })
  }

  getUserLocation() {
    if (this.user){
      let a = this.user.address;
      let addr = `${a.street}, ${a.city}, ${a.state}, ${a.postalCode}`;
    this.geocoder.geocode({
      address: addr
    }).subscribe(({results}) => {
      console.log(results);
      let loc = results[0].geometry.location;
      this.center = { lat: loc.lat(), lng: loc.lng() }
    });
  }
  }
  // center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  // zoom = 4;
  // display: google.maps.LatLngLiteral;

  // moveMap(event: google.maps.MapMouseEvent) {
  //   this.center = (event.latLng.toJSON());
  // }

  // move(event: google.maps.MapMouseEvent) {
  //   this.display = event.latLng.toJSON();
  // }

}
