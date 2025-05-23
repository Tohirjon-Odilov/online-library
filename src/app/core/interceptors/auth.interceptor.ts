import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoggerService } from '../services/logger.service'; // Logger service import
import { AuthService } from '../authentication/auth.service'; // Auth service import
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private logger: LoggerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger.info('HTTP request intercepted'); // Log HTTP request
    
    // Tokenni localStorage ichidan userData kalitidan olish
    // const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const token = this.authService.getToken(); // Tokenni userData'dan chiqarib olish

    // Agar token mavjud bo'lsa, so'rovga Authorization headerini qo'shish
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `${token}`, // Tokenni qo'shish
        },
      });
    }

    // So'rovni jo'natishda log qilish va xatolarni boshqarish
    return next.handle(req).pipe(
      // Xatolarni boshqarish
      catchError((error: HttpErrorResponse) => {
        // Agar foydalanuvchi avtorizatsiya qilinmagan bo'lsa (401 yoki 403)
        if (error.status === 401 || error.status === 403) {
          this.logger.warn('Unauthorized or Forbidden - redirecting to login'); // Log qilish
          // this.router.navigate(['/auth/login']); // Login sahifasiga yo'naltirish
          // this.toaster.error('Foydalanuvchi email yoki parol noto`g`ri!', 'Xatolik');
        }else if(error.status === 404){
          // this.toaster.error("Foydalanuvchi topilmadi!", "Xatolik");
        }else{
          // this.toaster.error(error.message, "Xatolik");
        }
        // this.logger.error(`HTTP Error: ${error}`); // Xatoni log qilish
        console.log(error);
        return throwError(error); // Xatoni qayta jo'natish
      }),
      finalize(() => {
        this.logger.info('HTTP request completed'); // HTTP so'rov tugaganini log qilish
      })
    );
  }
}
