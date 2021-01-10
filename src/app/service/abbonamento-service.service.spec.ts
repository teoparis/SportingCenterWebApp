import { TestBed } from '@angular/core/testing';

import { AbbonamentoServiceService } from './abbonamento-service.service';

describe('AbbonamentoServiceService', () => {
  let service: AbbonamentoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbbonamentoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
