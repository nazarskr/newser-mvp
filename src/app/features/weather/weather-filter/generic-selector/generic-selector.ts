import {Component, computed, input, output} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';

export interface SelectableItem {
  id: string;
  name: string;
}

@Component({
  selector: 'app-generic-selector',
  imports: [
    MatSelect,
    MatFormField,
    MatLabel,
    MatOption
  ],
  templateUrl: './generic-selector.html',
  styleUrl: './generic-selector.scss'
})
export class GenericSelector<T> {
  label = input.required<string>();
  items = input.required<T[]>();
  selected = input.required<T | null>();

  getItemId = input.required<(item: T) => string>();
  getItemName = input.required<(item: T) => string>();

  selectionChange = output<T>();

  readonly selectedId = computed(() => {
    const selectedItem = this.selected();
    return selectedItem ? this.getItemId()(selectedItem) : null;
  });

  readonly isEmpty = computed(() => this.items().length === 0);

  onSelect(id: string) {
    const item = this.items().find(item => this.getItemId()(item) === id);
    if (item) {
      this.selectionChange.emit(item);
    }
  }
}
