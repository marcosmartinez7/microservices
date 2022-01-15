const carMakers: string[] = ['ford', 'toyota', 'nissan'];
const dates = [new Date(), new Date()];

const carsByMake : string[][]= [];

// Help with inference when extracting values 

const someCar = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible value types 
// carMakers.push(1);

// Help on built in functions
carMakers.map((c: string): string=>{
  return c.toUpperCase();
})


// Flexible types

const importantDates: (Date|string)[]= [new Date(), '2030-10-10'];
importantDates.push(new Date());
importantDates.push('2022-05-05');