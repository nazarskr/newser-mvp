import {Component, inject} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {LoaderService} from './loader.service';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinner],
  templateUrl: './loader.html',
  styleUrl: './loader.scss'
})
export class Loader {
  private loaderService = inject(LoaderService);

  readonly isLoading = this.loaderService.isLoading;
}
