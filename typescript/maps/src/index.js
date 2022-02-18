function filterNumbersFromArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log('is nan', Number.isNaN(arr[i]));
    if (Number.isNaN(arr[i])) {
      arr.splice(i, i + 1);
    }
  }
}

var arr = [1, 'a', 'b', 2];
filterNumbersFromArray(arr);
console.log(arr);
