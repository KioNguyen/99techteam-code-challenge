import "reflect-metadata";

// import express from "express";
import * as express from "express";

import { PrismaClient } from "@prisma/client";
import { Vehicle } from "./entities/vehicles.entity";
import { myDataSource } from "./data-source";

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
const prisma = new PrismaClient();
const vehicleRepository = myDataSource.getRepository(Vehicle);

app.use(express.json());

// Create a vehicle
app.post("/vehicles", async function (req, res) {
  const { type, make, model, year } = req.body;
  try {
    const vehicle = vehicleRepository.create({ type, make, model, year });
    const result = await vehicleRepository.save(vehicle);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create vehicle.",
      message: error,
    });
  }
});

// List vehicles with basic filterspx ts-node src/index.ts
app.get("/vehicles", async (req, res) => {
  const { make } = req.query;
  try {
    const query = vehicleRepository.createQueryBuilder("vehicle");
    if (make) {
      query.where("vehicle.make = :make", { make });
    }
    const vehicles = await query.getMany();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles." });
  }
});

// Get details of a vehicle
app.get("/vehicles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await vehicleRepository.findOneBy({ id });
    if (!vehicle) {
      res.status(404).json({ error: "Vehicle not found." });
      return;
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicle." });
  }
});

// Update vehicle details
app.put("/vehicles/:id", async (req, res) => {
  const { id } = req.params;
  const { make, model, year } = req.body;
  try {
    const updatedVehicle = await vehicleRepository.save({
      id,
      make,
      model,
      year,
    });
    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to update vehicle." });
  }
});

// Delete a vehicle
app.delete("/vehicles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await vehicleRepository.findOneBy({ id });
    if (!vehicle) {
      res.status(404).json({ error: "Vehicle not found." });
      return;
    }
    await vehicleRepository.delete({ id });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete vehicle." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
