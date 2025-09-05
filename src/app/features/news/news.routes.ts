import { Routes } from '@angular/router';
import { NewsList } from './news-list/news-list';
import { NewsDetails } from './news-details/news-details';
import { NewsResolver } from './news.resolver';

export const newsRoutes: Routes = [
  {
    path: '',
    component: NewsList
  },
  {
    path: ':id',
    component: NewsDetails,
    resolve: {
      news: NewsResolver
    }
  }
];
