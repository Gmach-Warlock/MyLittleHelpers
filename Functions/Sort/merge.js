export function mergeSort(arr) {
  let mid = arr.length / 2;
  if (arr.length < 2) {
    return arr;
  }
  const left = arr.splice(0, mid);
  return merge(mergeSort(left), mergeSort(arr));
}
export function merge(left, right) {
  let arr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  return [...arr, ...left, ...right];
}

let arr1 = Array.from({ length: 100 }, () => Math.floor(Math.random() * 500));
console.log(arr1);
console.log(mergeSort(arr1));
