import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with loggedIn state depending on token', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should clear token and user on logout', () => {
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('user', JSON.stringify({ id: 1, username: 'tester' }));
    service.logout();
    expect(service.getToken()).toBeNull();
    expect(service.getCurrentUser()).toBeNull();
  });
});
