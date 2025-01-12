import { StateCreator } from "zustand";
import { Vehicle } from "../types/vehicle";

export interface VehiclesSlice {
  vehicles: Vehicle[];
  vehiclesLoading: boolean;
  setVehicles: (vehicles: Vehicle[]) => void;
  setVehiclesLoading: (loading: boolean) => void;
}

export const vehiclesSlice: StateCreator<VehiclesSlice> = (set) => {
  const setVehicles = (vehicles: Vehicle[]) => {
    set(() => ({ vehicles: vehicles?.length ? vehicles : [] }));
  };
  const setVehiclesLoading = (loading: boolean) => {
    set(() => ({ vehiclesLoading: loading }));
  };

  return {
    vehicles: [],
    vehiclesLoading: true,
    setVehicles,
    setVehiclesLoading,
  };
};
