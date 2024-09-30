import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class TestingComponent implements OnInit {
  reports: Report [] =[];

  center: google.maps.LatLngLiteral = {lat: 40, lng: 140};
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  newReport: Report = new Report();


  constructor(
    private mapReportService : MapReportService,
    private reportService: ReportService,
    private authService: AuthService,
  ){}

  ngOnInit(): void{
    this.reload();        ////  STEP 1

    console.log("line46")
    console.log(this.reports);

  }


  reload() {
    this.reportService.index().subscribe({
      next: (recievedReports) => {
        this.reports=recievedReports;
        this.reloadMarkerPositions();
        this.mapMarker(this.markerPositions);   ////  STEP 1


      },
      error: (err) => {
        console.error('Error loading reports: ', err);
      }
    });
  }
  reloadMarkerPositions(){
    for (let report of this.reports){
      console.log(report.address)
      this.mapReportService.getLongAndLat(report.address).subscribe({
        next:(geoResponse) => {
          this.markerPositions.push({lat: geoResponse.results[0].geometry.location.lat(), lng: geoResponse.results[0].geometry.location.lng()});        }

      })

    }
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
