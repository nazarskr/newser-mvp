import {Component, inject} from '@angular/core';
import {NewsRepository} from '../news.repository';
import {NewsCard} from './news-card/news-card';
import {DateRangeSelector} from './date-range-selector/date-range-selector';
import {DateRange} from '@utils/createDateRange';

@Component({
  selector: 'app-news-list',
  imports: [
    NewsCard,
    DateRangeSelector
  ],
  templateUrl: './news-list.html',
  styleUrl: './news-list.scss'
})
export class NewsList {
  private newsRepository = inject(NewsRepository);
  readonly news = this.newsRepository.news.value;

  onDateRangeChanged(dateRange: DateRange): void {
    this.newsRepository.setDateRange(dateRange);
  }
}
