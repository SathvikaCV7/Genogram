import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditChildComponent } from './add-or-edit-child.component';

describe('AddOrEditChildComponent', () => {
  let component: AddOrEditChildComponent;
  let fixture: ComponentFixture<AddOrEditChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
