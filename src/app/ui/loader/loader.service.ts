import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _isLoading = signal(false);
  readonly isLoading = this._isLoading.asReadonly();

  showLoading(): void {
    this._isLoading.set(true);
  }

  hideLoading(): void {
    this._isLoading.set(false);
  }
}
