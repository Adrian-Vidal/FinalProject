import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigationbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule
    // NgbModule
  ],
  templateUrl: './navigationbar.component.html',
  styleUrl: './navigationbar.component.css'
})
export class NavigationbarComponent {

  // collapsible

  constructor(
    private auth: AuthService
  ){}

}
