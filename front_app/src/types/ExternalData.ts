export interface City {
  country: string;
  country_name: string;
  name: string;
  altnames: string[];
  lat: number;
  lng: number;
}

export interface Magnet {
  code: string;
  name: string;
}

export interface ApiResponse<T> {
  count: number;
  data: T[];
}
