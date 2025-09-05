import {Injectable, signal, effect, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';

export type ReportType = 'current' | 'hourly' | 'daily';

@Injectable({providedIn: 'root'})
export class ReportTypeRepository {
  private http = inject(HttpClient)

  readonly reportTypes = toSignal(
    this.http.get<ReportType[]>('/mock-data/report-types.json'),
    {initialValue: []}
  );

  private readonly _selected = signal<ReportType | null>(null);
  readonly selected = this._selected.asReadonly();

  constructor() {
    effect(() => {
      const list = this.reportTypes();
      if (list.length > 0 && !this._selected()) {
        this._selected.set(list[0]);
      }
    });
  }

  setSelected(reportType: ReportType) {
    this._selected.set(reportType);
  }
}
