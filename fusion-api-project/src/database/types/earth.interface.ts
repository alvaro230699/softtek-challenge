export interface EarthLocation{
  name: string;
  rotation_period: number; // duración día promedio (en horas)
  orbital_period: number;  // días por año
  diameter: number;        // diámetro en km
  climate: string;
  terrain: string;
};
export interface GetEarthLocation{
  ID: string;
  content: EarthLocation;
  createdAt?: string;
}
export interface SavedEarthLocation extends GetEarthLocation{}