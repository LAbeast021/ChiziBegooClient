import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken = null;
    if (isPlatformBrowser(this.platformId) && localStorage) {
      authToken = localStorage.getItem('id_token');
    }
    
    if (authToken) {
      // Clone the request to include the authorization header.
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    } else {
      // If no token, ensure no Authorization header is set
      req = req.clone({
        headers: req.headers.delete('Authorization')
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/index']);  // Navigate to the login page or appropriate route
        }
        return throwError(() => error);
      })
    );
  }
}
