import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Report } from '../models/report';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = environment.baseUrl + 'api/comments'

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + '/report', this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'CommentService.index(): error retrieving comments: ' + err )
        );
      })
    );
  }

  showCommentsByReportId(reportId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + '/report' + "/" + reportId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'CommentService.showCommentsByReportId(): error retrieving comments: ' + err )
        );
      })
    );
  }

}
