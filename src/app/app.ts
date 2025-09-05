import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navigation} from './ui/navigation/navigation';
import {Loader} from './ui/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('newser-mvp');
}
