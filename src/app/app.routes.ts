import { Routes } from '@angular/router';
import { WeatherWidget } from './features/weather/weather-widget';
import { newsRoutes } from './features/news/news.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/weather',
    pathMatch: 'full'
  },
  {
    path: 'weather',
    component: WeatherWidget
  },
  {
    path: 'news',
    children: newsRoutes
  },
  {
    path: '**',
    redirectTo: '/weather'
  }
];
