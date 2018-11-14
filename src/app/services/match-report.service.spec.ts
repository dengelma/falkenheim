import { TestBed, inject } from '@angular/core/testing';

import { MatchReportService } from './match-report.service';

describe('MatchReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchReportService]
    });
  });

  it('should be created', inject([MatchReportService], (service: MatchReportService) => {
    expect(service).toBeTruthy();
  }));
});
