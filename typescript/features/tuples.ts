const drink = {
  color: 'brown',
  carbonated: true, 
  sugar: 40
};

const pepsi: [string, boolean, number] = ['brown', true, 40];

//Type alias
type Drink = [string, boolean, number]; // tupple 

const coca: Drink = ['brown', true, 45];


const carSpecs : [number, number]= [400, 3354];
const carSpecsClear = {
  horsepower: 400,
  weight: 3354
};