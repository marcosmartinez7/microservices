let apples: number = 5;
let speed: string = 'fast';
let hasName: boolean = true; 

let nothingMuch: null = null; 
let nothing: undefined = undefined;

// built in objects 
let now: Date = new Date();

// Array 
let colors: string[] = ['red', 'green', 'blue'];
let someNumbers: number[] = [1,2,3];
let booleans: boolean[] = [true, false, true];

// Classes 
class Car{

}
let car: Car = new Car();

// Object literal 
let point: {x: number, y: number} = {
  x: 10,
  y: 20
};

// Function 
const logNumber: (i: number) => void = (i: number) =>{ 
  console.log(i);
}

// When to use annotations
// 1) Function that returns the Any type
const json = '{"x:10, "y:20"}';
const coordinates: {x: number, y:number} = JSON.parse(json);

// 2) When we declare a variable on one line and initialize it later
let words = ['blah', 'blah', 'hey'];
let foundWord: string; 
foundWord = words.find((word)=> word === 'hey');

// 3) Variable whose type cannot be inferred correctly 
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;

for(let i= 0; i<numbers.length; i++){
  if(numbers[i]>0){
    numberAboveZero = numbers[i];
  }
}