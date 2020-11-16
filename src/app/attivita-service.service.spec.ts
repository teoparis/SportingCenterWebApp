import { TestBed } from '@angular/core/testing';

import { AttivitaServiceService } from './attivita-service.service';

describe('AttivitaServiceService', () => {
  let service: AttivitaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttivitaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
