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

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  editReport(){}

  removeReport(){}

  likeReport(){}

  commentReport(){}

}
