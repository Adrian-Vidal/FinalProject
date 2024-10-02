import { Component, inject, Input, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-report-form-modal',
  standalone: true,
  imports: [
    NgbModule
  ],
  templateUrl: './report-form-modal.component.html',
  styleUrl: './report-form-modal.component.css'
})
export class ReportFormModalComponent {

  private modalService = inject(NgbModal);
	closeResult = '';

  // Opens 'overlay'
	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        // What to do - when Modal is closed.
        console.log(result);
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


}
