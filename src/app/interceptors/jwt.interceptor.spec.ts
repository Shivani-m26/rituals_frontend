import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthService } from '../services/auth.service';

describe('JwtInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtInterceptor,
      AuthService,
      provideHttpClient(),
      provideRouter([])
    ]
  }));

  it('should be created', () => {
    const interceptor: JwtInterceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
