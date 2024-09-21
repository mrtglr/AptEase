import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "../components/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private service: AuthService, private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('AptEase_admin_auth_token') != null) {
            this.service.UserToken = JSON.parse(localStorage.getItem('AptEase_admin_auth_token'));
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.service.UserToken.value)
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        if (err.status == 401) {
                            localStorage.removeItem('AptEase_admin_auth_token');
                            this.router.navigateByUrl('/auth/login');
                        }
                    }
                )
            )
        }
        else {
            this.router.navigateByUrl('/auth/login');
            return next.handle(req.clone());
        }            
    }
}