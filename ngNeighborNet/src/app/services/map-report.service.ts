import { Injectable } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapGeocoder, MapGeocoderResponse } from '@angular/google-maps';
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
    console.log(address);

    let addr = `${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`;
    console.log(addr);

    return this.geocoder.geocode({
      address: addr
    });
    // .subscribe(({results}) => {
    //   console.log("still working?");
    //   let loc = results[0].geometry.location;
    //   longLat.push(loc.lat());
    //   longLat.push(loc.lng());
    // }))

  }



}
