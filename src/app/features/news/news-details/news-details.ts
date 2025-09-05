import {Component, input, signal, effect} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {DatePipe} from '@angular/common';
import {NewsItem, DATE_FORMAT} from '../news.model';
import {NewsRepository} from '../news.repository';
import {inject} from '@angular/core';

@Component({
  selector: 'app-news-details',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatChip,
    MatChipSet,
    DatePipe
  ],
  templateUrl: './news-details.html',
  styleUrl: './news-details.scss'
})
export class NewsDetails {
  private newsRepository = inject(NewsRepository);
  itemDetails = signal<NewsItem | null>(null);

  id = input.required<string>();
  dateFormat = DATE_FORMAT;

  constructor() {
    effect(async () => {
      const newsId = this.id();
      if (newsId) {
        const item = await this.newsRepository.getNewsItemById(newsId);
        this.itemDetails.set(item);
      }
    });
  }
}
