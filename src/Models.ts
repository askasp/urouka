export interface SleepData {
  summary_date: string;
  period_id: number;
  is_longest: number;
  timezone: number;
  bedtime_start: Date;
  bedtime_end: Date;
  score: number;
  score_total: number;
  score_disturbances: number;
  score_efficiency: number;
  score_latency: number;
  score_rem: number;
  score_deep: number;
  score_alignment: number;
  total: number;
  duration: number;
  awake: number;
  light: number;
  rem: number;
  deep: number;
  onset_latency: number;
  restless: number;
  efficiency: number;
  midpoint_time: number;
  hr_lowest: number;
  hr_average: number;
  rmssd: number;
  breath_average: number;
  temperature_delta: number;
  hypnogram_5min: string;
  hr_5min: number[];
  rmssd_5min: number[];
}

export interface ActivityData {
  summary_date: string;
  day_start: Date;
  day_end: Date;
  timezone: number;
  score: number;
  score_stay_active: number;
  score_move_every_hour: number;
  score_meet_daily_targets: number;
  score_training_frequency: number;
  score_training_volume: number;
  score_recovery_time: number;
  daily_movement: number;
  non_wear: number;
  rest: number;
  inactive: number;
  inactivity_alerts: number;
  low: number;
  medium: number;
  high: number;
  steps: number;
  cal_total: number;
  cal_active: number;
  met_min_inactive: number;
  met_min_low: number;
  met_min_medium_plus: number;
  met_min_medium: number;
  met_min_high: number;
  average_met: number;
  class_5min: string;
  met_1min: number[];
}

export interface ReadinessData {
  summary_date: string;
  period_id: number;
  score: number;
  score_previous_night: number;
  score_sleep_balance: number;
  score_previous_day: number;
  score_activity_balance: number;
  score_resting_hr: number;
  score_recovery_index: number;
  score_temperature: number;
}

export interface Uromaker {
  img:string;
  readiness: ReadinessData[];
  activity: ActivityData[];
  sleep: SleepData[];
  token: string;
}
