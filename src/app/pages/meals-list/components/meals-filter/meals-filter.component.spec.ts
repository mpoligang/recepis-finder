import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsFilterComponent } from './meals-filter.component';

describe('MealsFilterComponent', () => {
  let component: MealsFilterComponent;
  let fixture: ComponentFixture<MealsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealsFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
