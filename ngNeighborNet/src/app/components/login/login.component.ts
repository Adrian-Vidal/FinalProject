import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginUser: User = new User();

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  login(user: User){
        this.auth.login(user.username, user.password).subscribe({
          next: (loggedInUser) => {
            this.router.navigateByUrl('/landing');
          },
          error: (problem) => {
            console.error('LoginComponent.login(): Error logging in user: ');
            console.error(problem);
            this.router.navigateByUrl('/login');
          }
        })
      }
    }





