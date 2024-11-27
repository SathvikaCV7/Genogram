import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGenogramComponent } from './show-genogram.component';

describe('ShowGenogramComponent', () => {
  let component: ShowGenogramComponent;
  let fixture: ComponentFixture<ShowGenogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowGenogramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowGenogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
