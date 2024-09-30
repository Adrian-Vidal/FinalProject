import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url = environment.baseUrl + 'api/reports'

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

  index(): Observable<Report[]> {
    return this.http.get<Report[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'ReportService.index(): error retrieving reports: ' + err )
        );
      })
    );
  }

  create(report: Report): Observable<Report> {
    console.log("report.service.ts Firing!!?!?!?");
    console.log(report);
    return this.http.post<Report>(this.url, report, this.getHttpOptions()).pipe(
      catchError(
        (err: any) => {
          console.log(err);
          return throwError(
            () => new Error('report.service.ts - create () : error creating report: ' + err)
          );
        }
      )
    );
  }

  showAllEnabled(): Observable<Report[]> {
    return this.http.get<Report[]>(this.url).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'ReportService.showAllEnabled(): error retrieving all enabled reports: ' + err )
        );
      })
    );
  }





}
