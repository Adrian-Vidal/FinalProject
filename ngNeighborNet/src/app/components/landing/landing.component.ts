import { Report } from './../../models/report';
import { ReportService } from './../../services/report.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReportButtonsComponent } from '../report-buttons/report-buttons.component';



@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReportButtonsComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent implements OnInit{

  reports: Report [] = [];
  newReport: Report = new Report();
  showUpdateForm: Report | null = null;
  editReport : Report | null =null;
  selected: Report | null = null;


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

deleteReport(reportId: number){
  console.log(reportId)

  this.reportService.disableReport(reportId).subscribe({
    next: (result) =>{
      this.reload();
      this.newReport = new Report();

    },
    error: (nojoy) => {
      console.error("Error deleting Report");
      console.error(nojoy)
    }
  });

}

displayLandingPage(): void {
  this.showUpdateForm = null;
}


displayUpdateForm(report: Report): void {
  this.selected = report;
  this.showUpdateForm = report;
  this.editReport = Object.assign({}, this.selected);

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
      this.reload();
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

// reportOwner(report: Report): boolean {
  //   console.log('in report-buttons, reportOwner( ) .');
  //   let loggedInUser = this.auth.getLoggedInUser();
  //   if (loggedInUser && report.user){
  //     return loggedInUser.id === report.user.id;
  //   }
  //   return false;
  // }


}
