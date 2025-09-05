import {Injectable, signal, inject, resource} from '@angular/core';
import {NewsItem, NewsItemPreview} from './news.model';
import {collection, query, where, orderBy, getDocs, doc, getDoc, Timestamp, Firestore} from 'firebase/firestore';
import {FIRESTORE} from '../../firebase.config';
import {createDateRange} from '@utils/createDateRange';
import {DateRange} from '@utils/createDateRange';

@Injectable({providedIn: 'root'})
export class NewsRepository {
  private db = inject(FIRESTORE) as Firestore;

  private selectedDateRange = signal<DateRange>(
    createDateRange({
      start: new Date(),
      end: new Date()
    })
  );

  // @ts-ignore
  private newsResource = resource<NewsItemPreview[]>({
    loader: async () => {
      const dateRange = this.selectedDateRange();
      if (dateRange === null) return [];
      const {start, end} = dateRange;
      const q = query(
        collection(this.db, 'news'),
        where('publishedAt', '>=', Timestamp.fromDate(start)),
        where('publishedAt', '<', Timestamp.fromDate(end)),
        orderBy('publishedAt', 'desc')
      );

      const snap = await getDocs(q);
      return snap.docs.map(d => {
        const data: any = d.data();
        return {
          id: d.id,
          title: data.title,
          originalUrl: data.originalUrl,
          publishedAt: (data.publishedAt as Timestamp).toDate().toISOString(),
        } as NewsItemPreview;
      });
    },
    defaultValue: []
  });

  get news() {
    return this.newsResource.asReadonly();
  }

  setDateRange(dateRange: DateRange): void {
    this.selectedDateRange.set(dateRange);
    this.newsResource.reload();
  }

  async getNewsItemById(id: string): Promise<NewsItem | null> {
    const snap = await getDoc(doc(this.db, 'news', id));
    if (!snap.exists()) return null;

    const data = snap.data() as any;
    return {
      ...data,
      id: snap.id,
      publishedAt: (data.publishedAt as Timestamp).toDate().toISOString()
    };
  }
}
