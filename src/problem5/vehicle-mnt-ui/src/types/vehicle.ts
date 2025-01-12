export interface Vehicle {
  id: string;
  type: string;
  make: string;
  model: string;
  year: number;
}

export interface VehicleFormDataType {
  vehicle: Vehicle;
}
