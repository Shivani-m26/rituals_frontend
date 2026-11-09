import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { JournalHistoryComponent } from './journal-history.component';

describe('JournalHistoryComponent', () => {
  let component: JournalHistoryComponent;
  let fixture: ComponentFixture<JournalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalHistoryComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
