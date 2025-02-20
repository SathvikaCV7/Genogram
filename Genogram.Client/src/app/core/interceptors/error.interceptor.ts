import { HttpInterceptorFn } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const toastr = inject(ToastrService);
  return next(req).pipe(
   
    catchError((error) => {
      
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
          default:
          toastr.error("Unexpected Error");
          break;
        }
      }
      return throwError(error);
    })
  );
};
