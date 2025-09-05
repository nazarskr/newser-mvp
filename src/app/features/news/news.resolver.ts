import {Injectable, inject} from '@angular/core';
import {Router, ActivatedRouteSnapshot} from '@angular/router';
import {NewsRepository} from './news.repository';

@Injectable({
  providedIn: 'root'
})
export class NewsResolver {
  private newsRepository = inject(NewsRepository);
  private router = inject(Router);

  async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
    const id = route.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/news']);
      return false;
    }

    try {
      const item = await this.newsRepository.getNewsItemById(id);

      if (item) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }

    this.router.navigate(['/news']);
    return false;
  }
}
