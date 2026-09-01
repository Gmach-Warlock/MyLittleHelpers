function buildArray(length) {
  let arr = [];
  for (let i = 1; i <= length; i++) {
    arr.push(Math.floor(Math.random() * 51));
  }
  return arr;
}

export function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
let arr1 = buildArray(100);
console.log(arr1);
console.log(bubbleSort(arr1));

export function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}
let arr2 = buildArray(100);
console.log(arr2);
console.log(selectionSort(arr2));

export function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    let current = arr[i];
    while (j > -1 && current < arr[j]) {
      arr[j] = arr[j + 1];
    }
    arr[j + 1] = current;
  }
  return arr;
}
let arr3 = buildArray(100);
console.log(arr3);
console.log(selectionSort(arr3));
