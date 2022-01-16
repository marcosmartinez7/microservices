class Vehicle { 

  constructor(public color: string) {}

  protected honk(): void{
    console.log("Pip!")
  }
}


class Car extends Vehicle{

  constructor(color: string, public wheels: number) {
    super(color);
  }

  private drive(): void {
    console.log("Car driving")
  }

  startDriving():void {
    this.drive();
    this.honk();
  }
}



const aCar = new Car('green', 4);
aCar.startDriving();

const vehicle = new Vehicle('yellow');
console.log(vehicle.color);