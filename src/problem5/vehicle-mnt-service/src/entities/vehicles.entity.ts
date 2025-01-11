import { Column, Entity, Unique } from "typeorm";

import { AbstractEntity } from "./abstract.entity";

@Entity()
@Unique(["make", "model", "year"])
export class Vehicle extends AbstractEntity<Vehicle> {
  @Column()
  type: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;
}
