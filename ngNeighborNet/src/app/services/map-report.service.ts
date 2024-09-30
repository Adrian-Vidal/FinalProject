import { Component, Injectable } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapGeocoder, MapGeocoderResponse, MapMarker } from '@angular/google-maps';
import { Address } from '../models/address';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapReportService {

  constructor(
    private authService: AuthService,
    private geocoder: MapGeocoder
  ) { }


  getLongAndLat(address : Address) : Observable <MapGeocoderResponse>  {
    let longLat: number[]=[];
    let addr = `${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`;
    // console.log(addr);
    return this.geocoder.geocode({
      address: addr
    });
  }


  // center: google.maps.LatLngLiteral = {lat: 24, lng: 12}
  // zoom = 4;
  // markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];


  addMarker({lat, lng}: {lat:number, lng:number}) : google.maps.LatLngLiteral[]{

    let newLongLat = {
      lat: 27,
      lng: 23
    }
    this.markerPositions.push(newLongLat);


    ////---------old
    // /////////////////
    // if(event.latLng){
    //  this.markerPositions.push(event.latLng.toJSON());
    //  console.log(event.latLng.toJSON());
    // }
    //-------old

    return this.markerPositions;
}
}

