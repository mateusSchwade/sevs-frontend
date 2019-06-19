import { TestBed } from '@angular/core/testing';

import { PdfmakeService } from './pdfmake.service';

describe('PdfmakeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfmakeService = TestBed.get(PdfmakeService);
    expect(service).toBeTruthy();
  });
});
