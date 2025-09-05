import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GenericSelector} from './generic-selector';

describe('GenericSelector', () => {
  let component: GenericSelector;
  let fixture: ComponentFixture<GenericSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericSelector]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GenericSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
