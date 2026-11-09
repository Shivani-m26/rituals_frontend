import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { JournalDetailComponent } from './journal-detail.component';

describe('JournalDetailComponent', () => {
  let component: JournalDetailComponent;
  let fixture: ComponentFixture<JournalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalDetailComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1'
              }
            },
            params: of({ id: '1' })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
