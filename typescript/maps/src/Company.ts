import faker from "faker";
import { Mappable } from "./CustomMap";

export class Company implements Mappable { 
  name: string;
  catchphrase: string;
  location: {
    lat: number;
    lng: number;
  };
  color: string;

  markerContent(): string{
    return `
      <div>
        <h1>  ${this.name} </h1>
        <h3>  ${this.catchphrase} </h3>

      </div>
    `
  }

  constructor (){
    this.name = faker.company.companyName();
    this.catchphrase = faker.company.catchPhrase();
    this.location = { 
      lat: Number(faker.address.latitude()),
      lng: Number(faker.address.longitude())
    }
    this.color = 'green'
  }
}

