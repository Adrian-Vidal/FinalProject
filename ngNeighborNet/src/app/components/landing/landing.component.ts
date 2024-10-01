import { Report } from './../../models/report';
import { ReportService } from './../../services/report.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Address } from '../../models/address';
import { Reportcategory } from '../../models/reportcategory';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent implements OnInit{

  reports: Report [] = [];
  newReport: Report = new Report();

constructor (
  private reportService: ReportService,
){}

ngOnInit(): void {
  this.reload();
}

// reload() {
//   this.reportService.index().subscribe({
//     next: (reports) => {
//       this.reports = reports;
//     },
//     error: (err) => {
//       console.error('Error loading reports: ', err);
//     }
//   });
// }
reload() {
  this.reportService.showAllEnabled().subscribe({
    next: (reports) => {
      this.reports = reports;
    },
    error: (err) => {
      console.error('Error loading reports: ', err);
    }
  });
}

// loadForeign(){
//   this.newReport = new Report();
//   this.newReport.address = new Address();
//   this.newReport.reportCategory = new Reportcategory();
// }

addReport(report: Report): void {
  this.reportService.create(report).subscribe({
    next: (createdReport) => {
      this.reload();
      this.newReport = new Report();
      // this.loadForeign();
    },
    error: (err) => {
      console.error('landing.component - addReport(): Error adding report', err);
    }
  });
}


}
