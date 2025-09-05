import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';

import {GenericSelector} from './generic-selector';

interface TestItem {
  id: string;
  name: string;
}

@Component({
  template: `
    <app-generic-selector
      [label]="label"
      [items]="items"
      [selected]="selected"
      [getItemId]="getItemId"
      [getItemName]="getItemName"
      (selectionChange)="onSelectionChange($event)"
    />
  `,
  imports: [GenericSelector]
})
class TestHostComponent {
  label = 'Test Label';
  items: TestItem[] = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' }
  ];
  selected: TestItem | null = null;

  getItemId = (item: TestItem) => item.id;
  getItemName = (item: TestItem) => item.name;

  onSelectionChange(item: TestItem) {
    this.selected = item;
  }
}

describe('GenericSelector', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    const labelElement = fixture.nativeElement.querySelector('mat-label');
    expect(labelElement.textContent.trim()).toBe('Test Label');
  });

  it('should display items in the select', () => {
    const options = fixture.nativeElement.querySelectorAll('mat-option');
    expect(options.length).toBe(2);
    expect(options[0].textContent.trim()).toBe('Item 1');
    expect(options[1].textContent.trim()).toBe('Item 2');
  });
});
