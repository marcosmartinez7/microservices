import faker from "faker";

export class Company { 
  name: string;
  catchphrase: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor (){
    this.name = faker.company.companyName();
    this.catchphrase = faker.company.catchPhrase();
    this.location = { 
      lat: Number(faker.address.latitude()),
      lng: Number(faker.address.longitude())
    }
  }
}

