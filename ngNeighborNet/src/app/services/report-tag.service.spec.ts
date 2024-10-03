import { TestBed } from '@angular/core/testing';

import { ReportTagService } from './report-tag.service';

describe('ReportTagService', () => {
  let service: ReportTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
