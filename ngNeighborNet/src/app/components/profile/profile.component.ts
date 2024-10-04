import { CommentService } from './../../services/comment.service';
import { AuthService } from './../../services/auth.service';
import { Report } from './../../models/report';
import { ReportService } from './../../services/report.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Address } from '../../models/address';
import { Reportcategory } from '../../models/reportcategory';
import { User } from '../../models/user';
import { ReportButtonsComponent } from '../report-buttons/report-buttons.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReportButtonsComponent,
    NgbCollapseModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  reports: Report [] = [];
  newReport: Report = new Report();
  loggedInUser: User | null = null;
  showCreateForm = false;
  showUpdateForm: Report | null = null;
  selected: Report | null = null;
  editReport: Report | null = null;
  isCollapsed = true;
  comments: Comment[] = [];
  newComment: Comment = new Comment();


constructor (
  private authService: AuthService,
  private reportService: ReportService,
  private commentService: CommentService,
  // private dialogExample: diaglo // TODO - look up prompt dialog > MatDialogRef
){}

ngOnInit(): void {
  this.reload();
}

// Rather than index -> showAllUserReportEnabled
reload() {
  this.reportService.showAllUserReportEnabled().subscribe({
    next: (reports) => {
      this.reports = reports;
    },
    error: (err) => {
      console.error('Error loading reports: ', err);
    }
  });
}

displayCreateForm(){
  this.showCreateForm = !this.showCreateForm;
}

displayProfilePage(): void {
  this.showUpdateForm = null;
}

displayUpdateForm(report: Report): void {
  this.selected = report;
  this.showUpdateForm = report;
  this.editReport = Object.assign({}, this.selected);
  this.reload();

  console.log("displayUpdateForm????")
  console.log(this.selected)

}

updateReport(report: Report): void{
  console.log("IN UPDATE REPORT !!!");
  console.log(report)
  this.reportService.update(report).subscribe({
    next: (updatedReport) => {
      this.selected=null;
      this.editReport=null;
    },
    error: (oopsy) =>{
      console.error("error editing todo: ");
      console.error(oopsy);
    }
  })
  if (this.editReport) {
    this.reportService.update(this.editReport).subscribe({
      next: () => {
        this.reload();
        this.editReport;
        this.showUpdateForm = null;

      },

    });
  }
}

setEditEvent(): void {
  if (this.showUpdateForm) {
    this.editReport = Object.assign({}, this.showUpdateForm);
  }
}

cancelEdit(): void {
  this.editReport;
}

//------------------------_DELETE REPORT-------------------------------------------------

deleteReport(reportId: number){
  console.log(reportId)

  this.reportService.disableReport(reportId).subscribe({
    next: (result) =>{
      this.newReport = new Report();
      this.reload();
    },
    error: (nojoy) => {
      console.error("Error deleting Report");
      console.error(nojoy)
    }
  });

}

//------------------------COMMENT-------------------------------------------------
loadCommentsToReport(reportId: number) {
  console.log('in loadCommentsToReport( ) .');
  this.commentService.showCommentsByReportId(reportId).subscribe({
    next: (comments) => {
      this.comments = comments;
      console.log(this.comments);
    },
    error: (err) => {
      console.error('Error loading comments: ', err);
    }
  });
}


//------------------------ADD COMMENT-------------------------------------------------
// addComment(commenet: Comment): void {
//   console.log('addComment()');

//   this.commentService.create(this.newComment).subscribe({
//     next: (createdComment) => {
//       // this.reload();
//       this.newComment = new Comment();
//     },
//     error: (err) => {
//       console.error(' Error adding comment', err);
//     }
//   });
// }

addComment(report: Report): void {
  this.newComment.report = report;
  console.log(this.newComment.report);
  this.commentService.create(this.newComment, report.id).subscribe({
    next: (createdComment) => {
      this.newComment = new Comment();
      this.reload();
      this.loadCommentsToReport(report.id);

    },
    error: (err) => {
      console.error('Error adding comment: ', err);
    }
  });
}




}
