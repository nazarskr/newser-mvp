import {TestBed} from '@angular/core/testing';

import {ReportTypeRepository} from './report-type.repository';

describe('ReportType', () => {
  let service: ReportTypeRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportTypeRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
