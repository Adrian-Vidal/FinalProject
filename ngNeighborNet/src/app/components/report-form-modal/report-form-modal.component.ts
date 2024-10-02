import { Component, inject, Input, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Report } from './../../models/report';
import { ReportService } from './../../services/report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-form-modal',
  standalone: true,
  imports: [
    NgbModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './report-form-modal.component.html',
  styleUrl: './report-form-modal.component.css'
})
export class ReportFormModalComponent {

  private modalService = inject(NgbModal);
	closeResult = '';

  reports: Report [] = [];
  newReport: Report = new Report();

  constructor(
    private reportService: ReportService,
  ){}

  // Opens 'overlay'
	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {

        // What to do - when Modal is closed.
        console.log('in open (), console logging RESULT next');
        console.log(result);
        this.addReport(result);
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
        // What to do - when Modal is DISMISSED
        console.log(reason);
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  addReport(report: Report): void {
    console.log('report-form-modal - addReport( )');

    this.reportService.create(this.newReport).subscribe({
      next: (createdReport) => {
        // this.reload();
        this.newReport = new Report();
      },
      error: (err) => {
        console.error('report-form.modal.component - addReport(): Error adding report', err);
      }
    });
  }


}
