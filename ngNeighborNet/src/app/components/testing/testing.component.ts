import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MapReportService } from '../../services/map-report.service';
import { Address } from '../../models/address';

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent {

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
        console.log(geoResponse);

      }
    });

  }

}
