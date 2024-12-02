import { HttpInterceptorFn } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const toastr = inject(ToastrService);
  return next(req).pipe(
   
    catchError((error) => {
      debugger
      if (error) {
        switch (error.status) {
          case 400:      
          toastr.error(error.error.message, error.status);
          break;
          case 401:
          toastr.error(error.statusText, error.status);
          break;
          case 404:
          toastr.error("Not Found",error.status);
          break;
          case 500:
          toastr.error('Internal Server Error');
          break;
         
        }
      }
      return throwError(error);
    })
  );
};
