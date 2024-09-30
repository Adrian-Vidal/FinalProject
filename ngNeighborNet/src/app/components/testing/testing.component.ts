import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MapReportService } from '../../services/map-report.service';
import { Address } from '../../models/address';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    GoogleMap,
    MapMarker
  ],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent {

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    private mapReportService : MapReportService
  ){}



   //132 Cape Cod Dr, Branson, MO 65616
   testAddress: Address = new Address();

   makeTestAddress(){
     this.testAddress.street="132 Cape Cod Dr";
     this.testAddress.city = "Branson";
     this.testAddress.state = "MO";
   }

  showLongLat(){
    this.makeTestAddress();
    this.mapReportService.getLongAndLat(this.testAddress).subscribe({
      next: (geoResponse) => {
        console.log(geoResponse.results[0].geometry.location.lat());
        console.log(geoResponse.results[0].geometry.location.lng());
      }
    });
  }

  mapMarker(event: google.maps.MapMouseEvent){
    this.markerPositions = this.mapReportService.addMarker(event);

  }

}
