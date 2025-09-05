import {inject, Injectable, computed} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {CitiesRepository} from './weather-filter/data/cities.repository';
import {ReportTypeRepository} from './weather-filter/data/report-type.repository';
import {CurrentWeather, HourlyWeather, DailyWeather, ConditionLabel} from './weather.model';

interface WeatherApiResponse {
  [cityId: string]: {
    location: {
      lat: number;
      lon: number;
      timezone: string;
    };
    current: {
      temperature: number;
      humidity: number;
      precipitation: number;
      weathercode: number;
      hasPrecipitation: boolean;
    };
    hourly: {
      time: string[];
      temperature: number[];
      humidity: number[];
      precipitation: number[];
      precipitationProbability: number[];
      weathercode: number[];
    };
    daily: {
      time: string[];
      tMax: number[];
      tMin: number[];
      precipSum: number[];
      precipProbMax: number[];
      rhMean: number[];
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherRepository {
  private citiesRepo = inject(CitiesRepository);
  private reportTypeRepo = inject(ReportTypeRepository);

  // Reactive URL based on selected city and report type
  private readonly weatherUrl = computed(() => {
    const selectedCity = this.citiesRepo.selected();
    const selectedReportType = this.reportTypeRepo.selected();

    // Only make request if both city and report type are selected
    if (selectedCity && selectedReportType) {
      return '/mock-data/weather.json';
    }
    return undefined;
  });

  // HTTP resource that reacts to URL changes
  private readonly weatherResource = httpResource<WeatherApiResponse>(() => this.weatherUrl());

  // Computed signals for filtered weather data
  readonly currentWeather = computed(() => {
    const data = this.weatherResource.value();
    const selectedCity = this.citiesRepo.selected();
    const selectedReportType = this.reportTypeRepo.selected();

    if (!data || !selectedCity || selectedReportType !== 'current') {
      return null;
    }

    const cityData = data[selectedCity.id];
    if (!cityData) return null;

    return this.transformCurrentWeather(cityData.current);
  });

  readonly hourlyWeather = computed(() => {
    const data = this.weatherResource.value();
    const selectedCity = this.citiesRepo.selected();
    const selectedReportType = this.reportTypeRepo.selected();

    if (!data || !selectedCity || selectedReportType !== 'hourly') {
      return [];
    }

    const cityData = data[selectedCity.id];
    if (!cityData) return [];

    return this.transformHourlyWeather(cityData.hourly);
  });

  readonly dailyWeather = computed(() => {
    const data = this.weatherResource.value();
    const selectedCity = this.citiesRepo.selected();
    const selectedReportType = this.reportTypeRepo.selected();

    if (!data || !selectedCity || selectedReportType !== 'daily') {
      return [];
    }

    const cityData = data[selectedCity.id];
    if (!cityData) return [];

    return this.transformDailyWeather(cityData.daily);
  });

  // Loading and error states
  readonly isLoading = computed(() => this.weatherResource.status() === 'loading');
  readonly error = computed(() => this.weatherResource.error());

  private transformCurrentWeather(current: WeatherApiResponse[string]['current']): CurrentWeather {
    return {
      tempC: current.temperature,
      humidityPct: current.humidity,
      conditionCode: current.weathercode,
      conditionLabel: this.getConditionLabel(current.weathercode),
      hasPrecipitation: current.hasPrecipitation
    };
  }

  private transformHourlyWeather(hourly: WeatherApiResponse[string]['hourly']): HourlyWeather[] {
    return hourly.time.map((time, index) => ({
      timeISO: time,
      hourLabel: new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      tempC: hourly.temperature[index],
      humidityPct: hourly.humidity[index],
      precipMm: hourly.precipitation[index],
      precipProbPct: hourly.precipitationProbability[index],
      conditionCode: hourly.weathercode[index],
      conditionLabel: this.getConditionLabel(hourly.weathercode[index])
    }));
  }

  private transformDailyWeather(daily: WeatherApiResponse[string]['daily']): DailyWeather[] {
    return daily.time.map((date, index) => ({
      dateISO: date,
      weekdayShort: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      tMaxC: daily.tMax[index],
      tMinC: daily.tMin[index],
      humidityMeanPct: daily.rhMean[index],
      precipSumMm: daily.precipSum[index],
      precipProbMaxPct: daily.precipProbMax[index],
      conditionCode: 1, // Default, would need mapping from daily data
      conditionLabel: this.getConditionLabel(1)
    }));
  }

  private getConditionLabel(code: number): ConditionLabel {
    const conditionMap: Record<number, ConditionLabel> = {
      0: 'Sunny',
      1: 'Partly cloudy',
      2: 'Cloudy',
      3: 'Rain',
      // Add more mappings as needed
    };
    return conditionMap[code] || 'Unknown';
  }
}
