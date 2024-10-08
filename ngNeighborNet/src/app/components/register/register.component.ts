import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Address } from '../../models/address';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // newUser: User = new User();
  newUser: User = new User();


  constructor(
    private auth: AuthService,
    private router: Router
  ){

  }
  register(user: User) : void {

    console.log("Registering User:" + user);
    console.log(user);
    this.auth.register(user).subscribe({
      next: (registeredUser) => {
        console.log("GOOD SO FAR!!!!");
        this.auth.login(user.username, user.password).subscribe({
          next: (loggedInUser) => {
            this.router.navigateByUrl('/landing');
          },
          error: (problem) => {
            console.error('RegisterComponent.register(): Error loggin in user: ');
            console.error(problem);
          }
        })
      }
    })
  }

}
