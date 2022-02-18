function calcAvgHeight(data: { [name: string]: Person }): number | null {
  // Calculate average height from received data. If no data, return null.
  const peopleQty = Object.entries(data).length;
  if(peopleQty == 0){
      return null;
  }
  let totalHeight = 0;
  Object.entries(data).map(([key, value]) => totalHeight+=value.height)
  return totalHeight/peopleQty;
}

interface Person {
  height: number;
  weight: number;
}

let avgHeight = calcAvgHeight({
Matt: { height: 174, weight: 69 },
Jason: { height: 190, weight: 103 }
});
console.log(avgHeight);