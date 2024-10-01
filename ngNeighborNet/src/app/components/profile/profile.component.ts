import { AuthService } from './../../services/auth.service';
import { Report } from './../../models/report';
import { ReportService } from './../../services/report.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Address } from '../../models/address';
import { Reportcategory } from '../../models/reportcategory';
import { User } from '../../models/user';
import { ReportButtonsComponent } from '../report-buttons/report-buttons.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReportButtonsComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  reports: Report [] = [];
  newReport: Report = new Report();
  loggedInUser: User | null = null;
  showCreateForm = false;
  showUpdateForm: Report | null = null;
  selected: Report | null = null;
  editReport: Report | null = null;

constructor (
  private authService: AuthService,
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

displayProfilePage(): void {
  this.showUpdateForm = null;
}

displayUpdateForm(report: Report): void {
  this.selected = report;
  this.showUpdateForm = report;
  this.editReport = Object.assign({}, this.selected);
  this.reload();

  console.log("displayUpdateForm????")
  console.log(this.selected)

}

updateReport(report: Report): void{
  console.log("IN UPDATE REPORT !!!");
  console.log(report)
  this.reportService.update(report).subscribe({
    next: (updatedReport) => {
      this.selected=null;
      this.editReport=null;
    },
    error: (oopsy) =>{
      console.error("error editing todo: ");
      console.error(oopsy);
    }
  })
  if (this.editReport) {
    this.reportService.update(this.editReport).subscribe({
      next: () => {
        this.reload();
        this.editReport;
        this.showUpdateForm = null;

      },

    });
  }
}

setEditEvent(): void {
  if (this.showUpdateForm) {
    this.editReport = Object.assign({}, this.showUpdateForm);
  }
}

cancelEdit(): void {
  this.editReport;
}


}
