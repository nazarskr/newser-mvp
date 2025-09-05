import {Injectable, signal, effect, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';

export interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

@Injectable({providedIn: 'root'})
export class CitiesRepository {
  private http = inject(HttpClient)

  readonly cities = toSignal(
    this.http.get<City[]>('/mock-data/cities.json'),
    {initialValue: []}
  );

  private readonly _selected = signal<City | null>(null);
  readonly selected = this._selected.asReadonly();

  constructor() {
    effect(() => {
      const list = this.cities();
      if (list.length > 0 && !this._selected()) {
        this._selected.set(list[0]);
      }
    });
  }

  setSelected(city: City) {
    this._selected.set(city);
  }
}
