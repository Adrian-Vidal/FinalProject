import { TestBed } from '@angular/core/testing';

import { LoginChangeService } from './login-change.service';

describe('LoginChangeService', () => {
  let service: LoginChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
