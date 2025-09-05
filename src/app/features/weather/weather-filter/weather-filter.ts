import {Component, inject} from '@angular/core';
import {CitiesRepository, City} from './data/cities.repository';
import {ReportTypeRepository, ReportType} from './data/report-type.repository';
import {GenericSelector} from './generic-selector/generic-selector';

@Component({
  selector: 'app-weather-filter',
  imports: [
    GenericSelector
  ],
  templateUrl: './weather-filter.html',
  styleUrl: './weather-filter.scss'
})
export class WeatherFilter {
  private citiesRepo = inject(CitiesRepository);
  private reportTypeRepo = inject(ReportTypeRepository);

  cities = this.citiesRepo.cities;
  selectedCity = this.citiesRepo.selected;

  reportTypes = this.reportTypeRepo.reportTypes;
  selectedReportType = this.reportTypeRepo.selected;

  getCityId = (city: City) => city.id;
  getCityName = (city: City) => city.name;

  getReportTypeId = (reportType: ReportType) => reportType;
  getReportTypeName = (reportType: ReportType) => {
    const nameMap: Record<ReportType, string> = {
      'current': 'Current',
      'hourly': 'Hourly',
      'daily': 'Daily'
    };
    return nameMap[reportType];
  };

  onCityChange(city: City) {
    this.citiesRepo.setSelected(city);
  }

  onReportTypeChange(reportType: ReportType) {
    this.reportTypeRepo.setSelected(reportType);
  }
}
