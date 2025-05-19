import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const isFormData = req.body instanceof FormData;

  const clonedRequest = req.clone({
    setHeaders: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`
    }
  });
  return next(clonedRequest);
};