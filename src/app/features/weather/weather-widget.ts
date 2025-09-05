import {Component, inject} from '@angular/core';
import {WeatherRepository} from './weather.repository';
import {CitiesRepository} from './weather-filter/data/cities.repository';
import {ReportTypeRepository} from './weather-filter/data/report-type.repository';
import {WeatherFilter} from './weather-filter/weather-filter';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-weather-widget',
  imports: [
    WeatherFilter,
    CommonModule
  ],
  templateUrl: './weather-widget.html',
  styleUrl: './weather-widget.scss'
})
export class WeatherWidget {
  private weatherRepo = inject(WeatherRepository);
  private citiesRepo = inject(CitiesRepository);
  private reportTypeRepo = inject(ReportTypeRepository);

  // Expose data for template
  selectedCity = this.citiesRepo.selected;
  selectedReportType = this.reportTypeRepo.selected;

  // Weather data
  currentWeather = this.weatherRepo.currentWeather;
  hourlyWeather = this.weatherRepo.hourlyWeather;
  dailyWeather = this.weatherRepo.dailyWeather;

  // Loading and error states
  isLoading = this.weatherRepo.isLoading;
  error = this.weatherRepo.error;
}
