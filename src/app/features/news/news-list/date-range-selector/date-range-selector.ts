import {Component, output} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatStartDate,
  MatEndDate
} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DateRange, createDateRange} from '@utils/createDateRange';

@Component({
  selector: 'app-date-range-selector',
  imports: [
    MatFormField,
    MatLabel,
    MatDateRangeInput,
    MatStartDate,
    MatEndDate,
    MatDatepickerToggle,
    MatDateRangePicker,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './date-range-selector.html',
  styleUrl: './date-range-selector.scss'
})
export class DateRangeSelector {
  dateRangeChanged = output<DateRange>();

  private today = new Date();

  dateRangeForm = new FormGroup({
    start: new FormControl(this.today),
    end: new FormControl(this.today)
  });

  constructor() {
    this.dateRangeForm.valueChanges.subscribe(() => {
      this.emitDateRange();
    });
  }

  private emitDateRange(): void {
    const start = this.dateRangeForm.get('start')?.value;
    const end = this.dateRangeForm.get('end')?.value;

    if (start && end) {
      const range = createDateRange({start, end});
      this.dateRangeChanged.emit(range);
    }
  }
}
