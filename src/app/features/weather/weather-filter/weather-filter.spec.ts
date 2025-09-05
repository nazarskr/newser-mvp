import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherFilter } from './weather-filter';

describe('WeatherFilter', () => {
  let component: WeatherFilter;
  let fixture: ComponentFixture<WeatherFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
