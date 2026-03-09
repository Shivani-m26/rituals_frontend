import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalWriteComponent } from './journal-write.component';

describe('JournalWriteComponent', () => {
  let component: JournalWriteComponent;
  let fixture: ComponentFixture<JournalWriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalWriteComponent]
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
