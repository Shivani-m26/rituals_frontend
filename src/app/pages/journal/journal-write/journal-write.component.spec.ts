import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { JournalWriteComponent } from './journal-write.component';

describe('JournalWriteComponent', () => {
  let component: JournalWriteComponent;
  let fixture: ComponentFixture<JournalWriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalWriteComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
