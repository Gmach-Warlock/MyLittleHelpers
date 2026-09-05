export const sharpsArray = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];
export const flatsArray = [
  "A",
  "Bb",
  "B",
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
];
// fn = fo * (a) ** n
// frequency of note = refValue * (2 ** (1 /12)) ** n
// we need to solve for n (find number of semitones from reference note)
// first we need to determine if we are using sharps or flats array
// next we need to determine directional flow
// octaves above 4 go forward, below 4 and we go reverse
// if the octave is 4 and the note is above A, we go forward.
// we then iterate until we get to the note, incrementing a variable to use for n, raising or lowering the octave at C, depending on our direction
// once we have n, we plug it in and return the answer
// helper
export function findNumOfSemitones(pitch, octave, arr, direction) {
  // type guards
  if (
    typeof pitch !== "string" ||
    typeof octave !== "number" ||
    typeof direction !== "string" ||
    !Array.isArray(arr)
  )
    return;
  // make sure we get forward or reverse!
  if (direction !== "forward" && direction !== "reverse") return;
  let cIndex = 0;
  let cOctave = 0;
  let n = 0;
  const max = 200;
  const len = arr.length;
  cOctave = 4;
  if (direction === "forward") {
    while ((arr[cIndex] !== pitch || cOctave !== octave) && n < max) {
      cIndex = (cIndex + 1) % len;
      n++;
      if (arr[cIndex] === "C") cOctave++;
    }
  } else {
    while ((arr[cIndex] !== pitch || cOctave !== octave) && n > -max) {
      if (arr[cIndex] === "C") cOctave--;
      cIndex = (cIndex - 1 + len) % len;
      n--;
    }
  }
  return n;
}
// convert string version to symbols
export function convertToMusicalSymbols(pitch) {
  if (typeof pitch !== "string") {
    console.log("Invalid type");
    return;
  }
  let note = pitch[0].toUpperCase();
  let extension = pitch.slice(1).toLowerCase();
  if (extension === "flat") extension = "b";
  if (extension === "sharp") extension = "#";
  if (extension && extension !== "b" && extension !== "#") {
    console.log(`Invalid note extension`);
    return;
  }
  const cleanedNote = note + extension;
  return cleanedNote;
}
// determine direction from A4
export function determineDirection(pitch, octave) {
  if (typeof pitch !== "string" || typeof octave !== "number") return;
  const cleanedNote = convertToMusicalSymbols(pitch);
  const isAboveA =
    cleanedNote === "A#" || cleanedNote === "Bb" || cleanedNote === "B";
  const isForward = octave > 4 || (octave === 4 && isAboveA);
  const direction = isForward ? "forward" : "reverse";
  return direction;
}
export function determineArray(pitch) {
  if (typeof pitch !== "string") return;
  const cleanedNote = convertToMusicalSymbols(pitch);
  const arr = cleanedNote[1] === "b" ? flatsArray : sharpsArray;
  return arr;
}
// main function
export function findFrequency(pitch, octave, refValue = 440) {
  if (
    typeof pitch !== "string" ||
    typeof octave !== "number" ||
    typeof refValue !== "number"
  )
    return;
  // return the ref value if note is A4
  if (pitch === "A" && octave === 4) return refValue;
  const cleanedNote = convertToMusicalSymbols(pitch);
  // set flags and determine logical variables
  const direction = determineDirection(cleanedNote, octave);
  const arr = determineArray(cleanedNote);
  const n = findNumOfSemitones(cleanedNote, octave, arr, direction);
  // solve for freqency (frequency = refValue * a ** n)
  const a = 2 ** (1 / 12); // 12th root of 2
  const calculatedFrequency = refValue * a ** n;
  return calculatedFrequency;
}
// A4 is Note 69
// I'm using my helpers for this as well since it's all used together in my factory functions
export function findMidiValue(pitch, octave) {
  if (typeof pitch !== "string" || typeof octave !== "number") return;
  const cleanedNote = convertToMusicalSymbols(pitch);
  const direction = determineDirection(cleanedNote, octave);
  const arr = determineArray(cleanedNote);
  const n = findNumOfSemitones(cleanedNote, octave, arr, direction);
  return 69 + n;
}
