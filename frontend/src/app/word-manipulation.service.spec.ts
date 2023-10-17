import { TestBed } from '@angular/core/testing';

import { WordManipulationService } from './word-manipulation.service';

describe('WordManipulationService', () => {
  let service: WordManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
