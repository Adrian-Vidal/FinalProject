import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { ReportTag } from '../models/report-tag';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportTagService {

  private url = environment.baseUrl + 'api/tags'

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

  showTagsByReportId(reportId: number): Observable<ReportTag[]> {
    return this.http.get<ReportTag[]>(this.url + '/report' + "/" + reportId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'ReportTagService.showTagsByReportId(): error retrieving tags: ' + err )
        );
      })
    );
  }


}
