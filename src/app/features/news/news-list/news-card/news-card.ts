import {Component, input, output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';
import {NewsItemPreview, DATE_FORMAT} from '../../news.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-news-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButton,
    DatePipe,
    RouterLink
  ],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss'
})
export class NewsCard {
  newsItem = input.required<NewsItemPreview>();
  dateFormat = DATE_FORMAT;
}
