import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_services/account.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  if(accountService.currentUser())
  {
    //As req param is mutable so we're modifying it by cloning it
    req = req.clone({
      setHeaders:{
       Authorization:`Bearer ${accountService.currentUser()?.token}`
      }
    });
  }
  return next(req);
};
