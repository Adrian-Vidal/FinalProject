import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NavigationbarComponent } from "./components/navigationbar/navigationbar.component";
import { ReportFormModalComponent } from "./components/report-form-modal/report-form-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationbarComponent, ReportFormModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'ngNeighborNet';

}
