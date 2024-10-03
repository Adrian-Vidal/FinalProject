import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-collapse-basic',
  standalone: true,
  imports: [NgbCollapseModule],
  templateUrl: './collapse-basic.component.html',
  styleUrl: './collapse-basic.component.css'
})
export class CollapseBasicComponent {
  isCollapsed = true;


}
