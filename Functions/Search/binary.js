export function binarySearch(item, arr) {
  let start = 0;
  let end = arr.length - 1;
  let mid;
  while (start <= end) {
    mid = Math.round((start + end) / 2);
    console.log(mid);
    if (arr[mid] === item) {
      return `Item found at ${mid}!`;
    }
    if (arr[mid] > item) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return "Item not found!";
}
