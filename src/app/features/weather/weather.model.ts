export type ConditionLabel =
  'Sunny'
  | 'Partly cloudy'
  | 'Cloudy'
  | 'Rain'
  | 'Snow'
  | 'Thunderstorm'
  | 'Fog'
  | 'Unknown';

export interface CurrentWeather {
  tempC: number;
  humidityPct: number;
  conditionCode: number | null;
  conditionLabel: ConditionLabel;
  hasPrecipitation: boolean;
}

export interface HourlyWeather {
  timeISO: string;
  hourLabel: string;
  tempC: number;
  humidityPct: number;
  precipMm: number;
  precipProbPct: number;
  conditionCode: number;
  conditionLabel: ConditionLabel;
}

export interface DailyWeather {
  dateISO: string;
  weekdayShort: string;
  tMaxC: number;
  tMinC: number;
  humidityMeanPct: number;
  precipSumMm: number;
  precipProbMaxPct: number;
  conditionCode: number;
  conditionLabel: ConditionLabel;
}
