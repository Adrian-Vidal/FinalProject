import { Report } from './../../models/report';
import { ReportService } from './../../services/report.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';



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
  showUpdateForm: Report | null = null;
  editReport: any;


constructor (
  private reportService: ReportService,
  private authService: AuthService,
  // private userService: UserService,
){}

ngOnInit(): void {
  this.reload();
}

reload() {
  this.reportService.index().subscribe({
    next: (reports) => {
      this.reports = reports;
      console.log(this.reports)
    },
    error: (err) => {
      console.error('Error loading reports: ', err);
    }
  });
}



addReport(report: Report): void {
  console.log("addReport!!?!?!?");

  this.reportService.create(this.newReport).subscribe({
    next: (createdReport) => {
      this.reload();
      this.newReport = new Report();
    },
    error: (err) => {
      console.error('landing.component - addReport(): Error adding report', err);
    }
  });
}


displayLandingPage(): void {
  this.showUpdateForm = null;
}


displayUpdateForm(report: Report): void {
  this.showUpdateForm = report;
  this.setEditEvent;
}

updateReport(): void{
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
