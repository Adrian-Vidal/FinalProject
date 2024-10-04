import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MapReportService } from '../../services/map-report.service';
import { Address } from '../../models/address';
import { GoogleMap, MapInfoWindow, MapMarker, MapAdvancedMarker } from '@angular/google-maps';
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
    MapMarker,
    MapInfoWindow,
    MapMarker,
    MapAdvancedMarker
  ],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  // @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  reports: Report [] =[];

  center: google.maps.LatLngLiteral = {lat: 36.637, lng: -93.254};
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: { position: google.maps.LatLngLiteral; report: Report}[] = [];
  newReport: Report = new Report();
  infoWindowContent: string='';
  selected: Report | null = null;


  constructor(
    private mapReportService : MapReportService,
    private reportService: ReportService,
    private authService: AuthService,
  ){}

  ngOnInit(): void{
    this.reload();        ////  STEP 1

  }

  reload() {
    this.reportService.index().subscribe({
      next: (recievedReports) => {
        this.reports=recievedReports;    //Loads reports to this.reports
        this.reloadMarkerPositions();   //Loads markerPositions with
        // this.mapMarker(this.markerPositions);   ////  STEP 1

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
          const position = {lat: geoResponse.results[0].geometry.location.lat(), lng: geoResponse.results[0].geometry.location.lng()}
          this.markerPositions.push({position, report});
          // this.markerPositions.push({lat: geoResponse.results[0].geometry.location.lat(), lng: geoResponse.results[0].geometry.location.lng()});
        }
      })
    }
  }

//-------------------map marker info window------------------------

openInfoWindow(marker: MapMarker, report: Report){
  console.log("map marker clicked");
  if(this.infoWindow){
    this.infoWindow.open(marker);
    this.infoWindowContent = report.name;
    console.log(this.infoWindow.getContent)
  }
  this.selected=report;
  console.log("hello???")
  console.log(this.selected);
}

////-------------------Display and Open------------------------
displayAndOpen(){

}





   //132 Cape Cod Dr, Branson, MO 65616
  //  testAddress: Address = new Address();

  // //  makeTestAddress(){
  // //    this.testAddress.street="132 Cape Cod Dr";
  // //    this.testAddress.city = "Branson";
  // //    this.testAddress.state = "MO";
  // //  }
  //  markerPositions: google.maps.LatLngLiteral[] = [];









// ------------------------Dont think this is in use anymore-------------v------------
  // showLongLat(address : Address){
  //   this.mapReportService.getLongAndLat(address).subscribe({
  //     next: (geoResponse) => {
  //       console.log(geoResponse.results[0].geometry.location.lat());

  //       this.markerPositions.push({lat: geoResponse.results[0].geometry.location.lat(), lng: geoResponse.results[0].geometry.location.lng()});

  //       console.log(geoResponse.results[0].geometry.location.lng());
  //     }
  //   });
  // }

//-------------------Add a marker on the map doesnt work i think------------------------
// mapMarker(markerPosition: google.maps.LatLngLiteral[]){

//   for (let marker of markerPosition){

//     this.markerPositions = this.mapReportService.addMarker({lat: marker.lat, lng: marker.lng});
//   }
// }

}
