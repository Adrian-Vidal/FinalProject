import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import { Report } from './../../models/report';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  //-----------------------------------FIELDS----------------------------------
  reports: Report [] = [];
  newReport: Report = new Report();
  loggedInUser: User | null = null;




  //-----------------------------------CONSTRUCTOR and ngOnit----------------------------------

  constructor(
    private reportService: ReportService,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ){

  }
  ngOnInit(): void {
    this.reload();
  }

    //-----------------------------------METHODS----------------------------------
    reload() {
      this.reportService.index().subscribe({
        next: (reports) => {
          this.reports = reports;
          // this.checkAdmin();
          this.getLoggedInUser();
        },
        error: (err) => {
          console.error('Error loading reports: ', err);
        }
      });
    }


  checkAdmin(){
    // this.getLoggedInUser();

    if (this.loggedInUser){
      if (this.loggedInUser.role != 'admin'){
        this.router.navigateByUrl('landing');
      }
    }


  }

  getLoggedInUser(){
    // console.log('in report-buttons, reportOwner( ) .');
    let loggedInUser = this.authService.getLoggedInUser().subscribe({
      next: (loggedInUser) =>{
       this.loggedInUser = loggedInUser;
       this.checkAdmin();
      },
      error: (err) => {
        console.error("reportOwner() error: ");
        console.error(err);
      }
    });
  }




  deleteReportAdmin(reportId: number){


    this.adminService.disableReportAdmin(reportId).subscribe({
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

}
