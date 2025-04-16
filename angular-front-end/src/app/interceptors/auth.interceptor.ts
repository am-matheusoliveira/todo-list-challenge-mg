import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { BackendService } from '../services/backend.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private tokenService: TokenService,
    private backendService: BackendService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    const excludedUrls = ['/api/login', '/api/signup'];
    
    const isExcluded = excludedUrls.some(url => req.url.includes(url));

    if (isExcluded) {
      return next.handle(req);
    }

    const token = this.tokenService.get();

    let authReq = req;
    if (token) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401(authReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.backendService.refreshToken().pipe(
        switchMap((data: any) => {
          this.isRefreshing = false;
          this.tokenService.set(data);
          this.refreshTokenSubject.next(data.access_token);
          return next.handle(this.addTokenHeader(request, data.access_token));
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.tokenService.remove();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addTokenHeader(request, token!)))
      );
    }
  }
  
  private addTokenHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${token}`)
        .set('ngrok-skip-browser-warning', 'true')
    });
  }
}