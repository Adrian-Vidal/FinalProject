import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MapReportService } from '../../services/map-report.service';
import { Address } from '../../models/address';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { ReportService } from '../../services/report.service';
import { AuthService } from '../../services/auth.service';
import { Report } from './../../models/report';


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
  //reports: Report [] = [];
  reports: Report [] =[];
  newReport: Report = new Report();


  constructor(
    private mapReportService : MapReportService,
    private reportService: ReportService,
    private authService: AuthService,

  ){}

  ngOnInit(): void{
    //  this.mapMarker({lat: 27, lng: 23});
    this.reload();
    console.log("Hello???")
    console.log(this.reports)
    // this.mapMarker(this.markerPositions);


  }
  reload() {
    this.reportService.showAllEnabled().subscribe({
      next: (reports) => {
        this.reports=reports;
      },
      error: (err) => {
        console.error('Error loading reports: ', err);
      }
    });
  }


   //132 Cape Cod Dr, Branson, MO 65616
   testAddress: Address = new Address();

   makeTestAddress(){
     this.testAddress.street="132 Cape Cod Dr";
     this.testAddress.city = "Branson";
     this.testAddress.state = "MO";
   }
  //  markerPositions: google.maps.LatLngLiteral[] = [];

  showLongLat(address : Address){
    this.makeTestAddress();
    this.mapReportService.getLongAndLat(address).subscribe({
      next: (geoResponse) => {
        console.log(geoResponse.results[0].geometry.location.lat());

        this.markerPositions.push({lat: geoResponse.results[0].geometry.location.lat(), lng: geoResponse.results[0].geometry.location.lng()});

        console.log(geoResponse.results[0].geometry.location.lng());
      }
    });
  }

  // reports: Report [] =[];
  //markerPositions: google.maps.LatLngLiteral[] = [];


  mapMarker(markerPosition: google.maps.LatLngLiteral[]){

    for (let marker of markerPosition){

      this.markerPositions = this.mapReportService.addMarker({lat: marker.lat, lng: marker.lng});

    }


  }

}
