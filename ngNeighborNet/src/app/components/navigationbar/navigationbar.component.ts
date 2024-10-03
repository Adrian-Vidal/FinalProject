import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LogoutComponent } from "../logout/logout.component";
import { ReportFormModalComponent } from "../report-form-modal/report-form-modal.component";
import { User } from '../../models/user';
import { AdminService } from '../../services/admin.service';
import { ReportService } from '../../services/report.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigationbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    LogoutComponent,
    ReportFormModalComponent
],
  templateUrl: './navigationbar.component.html',
  styleUrl: './navigationbar.component.css'
})
export class NavigationbarComponent implements OnInit {

  loggedInUser: User | null = null;






  // isCollapsed = false;

  constructor(
    private auth: AuthService,
    private reportService: ReportService,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ){
    effect(
      ()=>{
        console.log("effect --- " + this.authService.changeMade());
        if(this.authService.changeMade()){
          this.getLoggedInUser();
        }
        else{
          this.loggedInUser=null;
        }
      }
    )
  }
  ngOnInit(): void {
    this.getLoggedInUser();
  }

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }

  checkAdmin() : boolean{
    let check: boolean = false
    // this.getLoggedInUser();
    if (this.loggedInUser){
      console.log(this.loggedInUser.username);

      console.log(this.loggedInUser.role);

      if (this.loggedInUser.role === 'admin'){
        check = true;
      }
    }
    console.log(check)
    return check;
  }

  getLoggedInUser(){
    // console.log('in report-buttons, reportOwner( ) .');
    let loggedInUser = this.authService.getLoggedInUser().subscribe({
      next: (loggedInUser) =>{
       this.loggedInUser = loggedInUser;
      //  this.checkAdmin();
      },
      error: (err) => {
        console.error("reportOwner() error: ");
        console.error(err);
      }
    });
  }


}
