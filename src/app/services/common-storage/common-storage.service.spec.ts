import { TestBed } from '@angular/core/testing';

import { CommonStorageService } from './common-storage.service';

describe('CommonStorageService', () => {
  let service: CommonStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
