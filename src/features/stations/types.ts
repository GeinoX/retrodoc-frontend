export interface Region {
  id: number;
  name_en: string;
  name_fr: string;
}

export interface Station {
  id: number;
  name: string;
  region: number | Region;
  address: string;
  phone: string;
  opening_hours: string;
  is_active: boolean;
}

export interface StationOption {
  id: number;
  name: string;
  regionName?: string;
  address: string;
}