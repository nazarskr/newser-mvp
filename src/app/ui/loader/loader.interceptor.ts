import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import {delay, finalize} from 'rxjs/operators';
import { LoaderService } from './loader.service';

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  loaderService.showLoading();

  return next(req).pipe(
    finalize(() => loaderService.hideLoading())
  );
};
