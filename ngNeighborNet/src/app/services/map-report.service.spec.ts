import { TestBed } from '@angular/core/testing';

import { MapReportService } from './map-report.service';

describe('MapReportService', () => {
  let service: MapReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
