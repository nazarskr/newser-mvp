import {TestBed} from '@angular/core/testing';

import {WeatherRepository} from './weather.repository';

describe('WeatherRepository', () => {
  let service: WeatherRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
