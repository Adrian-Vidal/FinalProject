import { ReportService } from './../../services/report.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-report-buttons',
  standalone: true,
  imports: [

  ],
  templateUrl: './report-buttons.component.html',
  styleUrl: './report-buttons.component.css'
})
export class ReportButtonsComponent {

  reports: Report [] = [];
  showUpdateForm: Report | null = null;
  editReport: Report = new Report();

  constructor(
    private auth: AuthService,
    private router: Router,
    private reportService: ReportService
  ){}

  removeReport(){}

  likeReport(){}

  commentReport(){}

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
}
