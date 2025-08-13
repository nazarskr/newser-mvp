import { TestBed } from '@angular/core/testing';

import { NewsRepository } from './news.repository';

describe('NewsRepository', () => {
  let service: NewsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
