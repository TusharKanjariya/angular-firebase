import { TestBed } from '@angular/core/testing';

import { ManageDataService } from './manage-data.service';

describe('ManageDataService', () => {
  let service: ManageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
