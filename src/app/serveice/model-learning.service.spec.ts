import { TestBed } from '@angular/core/testing';

import { ModelLearningService } from './model-learning.service';

describe('ModelLearningService', () => {
  let service: ModelLearningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelLearningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
