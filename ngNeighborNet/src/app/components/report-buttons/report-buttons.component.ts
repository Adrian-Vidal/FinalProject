import { ReportService } from './../../services/report.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LandingComponent } from '../landing/landing.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-buttons',
  standalone: true,
  imports: [
    LandingComponent,
    CommonModule,
  ],
  templateUrl: './report-buttons.component.html',
  styleUrl: './report-buttons.component.css'
})
export class ReportButtonsComponent {

  reports: Report [] = [];

  showUpdateForm: Report | null = null;
  // editReport: Report = new Report();

  constructor(
    private auth: AuthService,
    private reportService: ReportService,
    private router: Router
  ){}

  // reportOwner(report: Report): boolean {
  //   console.log('in report-buttons, reportOwner( ) .');
  //   let loggedInUser = this.auth.getLoggedInUser();
  //   if (loggedInUser && report.user){
  //     return loggedInUser.id === report.user.id;
  //   }
  //   return false;
  // }

  editReport(){}


  removeReport(){}

  likeReport(){}

  commentReport(){}

  // reload() {
  //   this.reportService.index().subscribe({
  //     next: (reports) => {
  //       this.reports = reports;
  //       console.log(this.reports)
  //     },
  //     error: (err) => {
  //       console.error('Error loading reports: ', err);
  //     }
  //   });
  // }


  // updateReport(): void{
  //   if (this.editReport) {
  //     this.reportService.update(this.editReport).subscribe({
  //       next: () => {
  //         this.reload();
  //         this.editReport;
  //         this.showUpdateForm = null;

  //       },

  //     });
  //   }
  // }
}
