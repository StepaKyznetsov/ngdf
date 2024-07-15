import { TestBed } from '@angular/core/testing';

import { NgdfService } from './ngdf.service';

describe('NgdfService', () => {
  let service: NgdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
