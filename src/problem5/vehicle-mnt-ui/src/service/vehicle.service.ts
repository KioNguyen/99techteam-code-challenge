import axios from "axios";
import { Vehicle } from "../types/vehicle";
const serviceHost = import.meta.env.VITE_SERVICE_HOST;
export const getVehicle = async (id: string) => {
  return axios.get(`${serviceHost}/vehicles/${id}`);
};
export const getVehicles = async (searchKey?: string) => {
  return axios.get(
    `${serviceHost}/vehicles` + (searchKey ? `?searchKey=${searchKey}` : "")
  );
};

export const createVehicle = async (vehicle: Vehicle) => {
  return axios.post(serviceHost, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicle),
  });
};

export const updateVehicle = async (vehicle: Vehicle) => {
  return axios.put(`${serviceHost}/vehicles/${vehicle.id}`, vehicle);
};

export const deleteVehicle = async (id: string) => {
  return axios.delete(`${serviceHost}/vehicles/${id}`);
};
