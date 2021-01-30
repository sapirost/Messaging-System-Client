import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({ providedIn: 'root' })
export class HttpTokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authorization = this.authService.getToken();

        if (authorization) {
            request = request.clone({
                setHeaders: {
                    authorization,
                },
            });
        }

        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) {
                    this.authService.logout();

                    return;
                }

                return throwError(error);
            })
        );
    }
}
