import { TestBed } from '@angular/core/testing';

import { ReportCardService } from './report_card.service';

describe('ReportCard', () => {
  let service: ReportCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
