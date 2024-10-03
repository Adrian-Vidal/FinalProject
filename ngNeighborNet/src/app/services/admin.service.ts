import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = environment.baseUrl+ 'api/admin'

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

  disableReportAdmin(reportId: number): Observable<void> {
    console.log(reportId)
    return this.http.delete<void>(this.url + '/'+ reportId, this.getHttpOptions()).pipe(
    catchError((err: any) => {
      console.error(err);
      return throwError(
         () => new Error( 'ReportService.disableReport(): error disabling report: ' + err )
      );
    })
  );
}
}
