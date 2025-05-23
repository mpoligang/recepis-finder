import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingMealDetailComponent } from './loading-meal-detail.component';

describe('LoadingMealDetailComponent', () => {
  let component: LoadingMealDetailComponent;
  let fixture: ComponentFixture<LoadingMealDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingMealDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingMealDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
