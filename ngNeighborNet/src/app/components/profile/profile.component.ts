import { AuthService } from './../../services/auth.service';
import { Report } from './../../models/report';
import { ReportService } from './../../services/report.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Address } from '../../models/address';
import { Reportcategory } from '../../models/reportcategory';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  reports: Report [] = [];
  newReport: Report = new Report();
  loggedInUser: User | null = null;
  showCreateForm = false;

constructor (
  private AuthService: AuthService,
  private reportService: ReportService
  // private dialogExample: diaglo // TODO - look up prompt dialog > MatDialogRef
){}

ngOnInit(): void {
  this.reload();
}

// Rather than index -> showAllUserReportEnabled
reload() {
  this.reportService.showAllUserReportEnabled().subscribe({
    next: (reports) => {
      this.reports = reports;
    },
    error: (err) => {
      console.error('Error loading reports: ', err);
    }
  });
}

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

displayCreateForm(){
  this.showCreateForm = !this.showCreateForm;
}






}
