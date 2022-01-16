import faker from "faker";
import { Mappable } from "./CustomMap";

export class User implements Mappable { 
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  color: string;

  markerContent(): string{
    return `
      <div>
        <h1>  ${this.name} </h1>
      </div>
    `
  }

  constructor (){
    this.name = faker.name.firstName();
    this.location = { 
      lat: Number(faker.address.latitude()),
      lng: Number(faker.address.longitude())
    }
    this.color = 'red';
  }
}

