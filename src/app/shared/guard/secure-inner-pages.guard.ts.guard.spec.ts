import { TestBed } from '@angular/core/testing';

import { SecureInnerPagesGuard } from './secure-inner-pages.guard.ts.guard';

describe('SecureInnerPages.Guard.TsGuard', () => {
  let guard: SecureInnerPagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecureInnerPagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
