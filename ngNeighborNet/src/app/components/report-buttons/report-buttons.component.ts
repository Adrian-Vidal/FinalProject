import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import { LandingComponent } from '../landing/landing.component';

@Component({
  selector: 'app-report-buttons',
  standalone: true,
  imports: [
    LandingComponent
  ],
  templateUrl: './report-buttons.component.html',
  styleUrl: './report-buttons.component.css'
})
export class ReportButtonsComponent {

  reports: Report [] = [];

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

}
