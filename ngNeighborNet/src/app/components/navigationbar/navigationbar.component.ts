import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LogoutComponent } from "../logout/logout.component";
import { ReportFormModalComponent } from "../report-form-modal/report-form-modal.component";
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
export class NavigationbarComponent {

  // isCollapsed = false;

  constructor(
    private auth: AuthService
  ){}

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }


}
