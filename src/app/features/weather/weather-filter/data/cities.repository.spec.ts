import { TestBed } from '@angular/core/testing';

import { CitiesRepository } from './cities.repository';

describe('CitiesRepository', () => {
  let service: CitiesRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitiesRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
