import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import  { Buffer } from 'buffer';


@Injectable({
 providedIn: 'root'
})
export class AuthService {
   // Set port number to server's port
   private url = environment.baseUrl;
   private loginSignal = signal(false);
   readonly changeMade = this.loginSignal.asReadonly();


   constructor(private http: HttpClient){}


   register(user: User): Observable<User> {
     // Create POST request to register a new account
     return this.http.post<User>(this.url + 'register', user).pipe(
       catchError((err: any) => {
         console.log(err);
         return throwError(
           () => new Error('AuthService.register(): error registering user.')
         );
       })
     );
   }


   login(username: string, password: string): Observable<User> {
     console.log("In service");
     console.log(username);
     console.log(password);
     // Make credentials
     const credentials = this.generateBasicAuthCredentials(username, password);
     // Send credentials as Authorization header specifying Basic HTTP authentication
     const httpOptions = {
       headers: new HttpHeaders({
         Authorization: `Basic ${credentials}`,
         'X-Requested-With': 'XMLHttpRequest',
       }),
     };


     // Create GET request to authenticate credentials
     return this.http.get<User>(this.url + 'authenticate', httpOptions).pipe(
       tap((newUser) => {
         // While credentials are stored in browser localStorage, we consider
         // ourselves logged in.
         localStorage.setItem('credentials', credentials);
         this.loginSignal.update((v)=> v=true)

         return newUser;
       }),
       catchError((err: any) => {
         console.log(err);
         return throwError(
           () => new Error('AuthService.login(): error logging in user.')
         );
       })
     );
   }


   logout(): void {
     localStorage.removeItem('credentials');
     this.loginSignal.update((v)=> v=false)

   }


   getLoggedInUser(): Observable<User> {
     if (!this.checkLogin()) {
       return throwError(() => {
         new Error('Not logged in.');
       });
     }
     let httpOptions = {
       headers: {
         Authorization: 'Basic ' + this.getCredentials(),
         'X-Requested-with': 'XMLHttpRequest',
       },
     };
     return this.http
       .get<User>(this.url + 'authenticate', httpOptions)
       .pipe(
         catchError((err: any) => {
           console.log(err);
           return throwError(
             () => new Error( 'AuthService.getUserById(): error retrieving user: ' + err )
           );
         })
       );
   }


   checkLogin(): boolean {
    //  console.log("in CheckLogin()")
     if (localStorage.getItem('credentials')) {
      // console.log(this.getCredentials);
      // console.log('in checkLogin() in auth.service.ts');
       return true;
     }
     return false;
   }


   generateBasicAuthCredentials(username: string, password: string): string {
     return Buffer.from(`${username}:${password}`).toString('base64');
   }


   getCredentials(): string | null {
     return localStorage.getItem('credentials');
   }
}





////--------------------------------- ORIGINAL CODE------------------------------------------------------------------------------
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, catchError, throwError, tap } from 'rxjs';
// import { User } from '../models/user';
// import { environment } from '../../environments/environment';
// import  { Buffer } from 'buffer';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//     // Set port number to server's port
//     private baseUrl = 'http://localhost:8080/';
//     private url = environment.baseUrl;

//     constructor(private http: HttpClient){}

//     register(user: User): Observable<User> {
//       // Create POST request to register a new account
//       return this.http.post<User>(this.url + 'register', user).pipe(
//         catchError((err: any) => {
//           console.log(err);
//           return throwError(
//             () => new Error('AuthService.register(): error registering user.')
//           );
//         })
//       );
//     }

//     login(username: string, password: string): Observable<User> {
//       console.log("In service");
//       console.log(username);
//       console.log(password);
//       // Make credentials
//       const credentials = this.generateBasicAuthCredentials(username, password);
//       // Send credentials as Authorization header specifying Basic HTTP authentication
//       const httpOptions = {
//         headers: new HttpHeaders({
//           Authorization: `Basic ${credentials}`,
//           'X-Requested-With': 'XMLHttpRequest',
//         }),
//       };

//       // Create GET request to authenticate credentials
//       return this.http.get<User>(this.url + 'authenticate', httpOptions).pipe(
//         tap((newUser) => {
//           // While credentials are stored in browser localStorage, we consider
//           // ourselves logged in.
//           localStorage.setItem('credentials', credentials);
//           return newUser;
//         }),
//         catchError((err: any) => {
//           console.log(err);
//           return throwError(
//             () => new Error('AuthService.login(): error logging in user.')
//           );
//         })
//       );
//     }

//     logout(): void {
//       localStorage.removeItem('credentials');
//     }

//     getLoggedInUser(): Observable<User> {
//       if (!this.checkLogin()) {
//         return throwError(() => {
//           new Error('Not logged in.');
//         });
//       }
//       let httpOptions = {
//         headers: {
//           Authorization: 'Basic ' + this.getCredentials(),
//           'X-Requested-with': 'XMLHttpRequest',
//         },
//       };
//       return this.http
//         .get<User>(this.url + 'authenticate', httpOptions)
//         .pipe(
//           catchError((err: any) => {
//             console.log(err);
//             return throwError(
//               () => new Error( 'AuthService.getUserById(): error retrieving user: ' + err )
//             );
//           })
//         );
//     }

//     checkLogin(): boolean {
//       console.log("in CheckLogin()")
//       if (localStorage.getItem('credentials')) {
//         return true;
//       }
//       return false;
//     }

//     generateBasicAuthCredentials(username: string, password: string): string {
//       return Buffer.from(`${username}:${password}`).toString('base64');
//     }

//     getCredentials(): string | null {
//       return localStorage.getItem('credentials');
//     }

// }
