
const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: false,
  summary(): string{
    return this.name;
  }
};

const myDrink = {
  color: 'brown',
  sugar: 40, 
  summary(): string{
    return `my drink has ${this.sugar}`
  }
}

interface Reportable{
  summary(): string
}


const printSummary = (item: Reportable) : void=> {
  console.log(item.summary());
}

printSummary(oldCivic);
printSummary(myDrink);

