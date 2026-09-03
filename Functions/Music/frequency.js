// fn = fo * (a) ** n
// frequency of note = refValue * (2 ** (1 /12)) ** n
// we need to solve for n (find number of semitones from reference note)
// first we need to determine if we are using sharps or flats array
// next we need to determine directional flow
// if the note is above A and octave is 4 we go forward.
// we then iterate until we get to the note, incrementing a variable to use for n, raising or lowering the octave at C, depending on our direction
// once we have n we plug it in and return the answer
const sharpsArray = [
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
const flatsArray = [
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
// helper
function findNumOfSemitones(pitch, octave, arr, direction) {
  let cIndex = 0;
  let cOctave = 4;
  let n = 0;
  let max = 200;
  let len = arr.length;
  // make sure we get forward or reverse!
  if (direction !== "forward" && direction !== "reverse") return;
  if (direction === "forward") {
    while ((arr[cIndex] !== pitch || cOctave !== octave) && n < max) {
      if (arr[cIndex] === "C") cOctave++;
      cIndex = (cIndex + 1) % len;
      n++;
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
// main function
export function findFrequency(pitch, octave, refValue = 440) {
  // return the ref value if note is A4
  if (pitch === "A" && octave === 4) return refValue;
  // convert string version to symbols
  let note = pitch[0].toUpperCase();
  let extension = pitch.slice(1).toLowerCase();
  if (extension === "flat") extension = "b";
  if (extension === "sharp") extension = "#";
  if (extension && extension !== "b" && extension !== "#") {
    console.log(`Invalid note extension`);
    return;
  }
  let cleanedNote = note + extension;
  // set flags and determine logical variables
  let useFlats = cleanedNote[1] === "b";
  let isAboveA =
    cleanedNote === "A#" || cleanedNote === "Bb" || cleanedNote === "B";
  let isForward = octave > 4 || (octave === 4 && isAboveA);
  let direction = isForward ? "forward" : "reverse";
  let arr = useFlats ? flatsArray : sharpsArray;
  let n = findNumOfSemitones(cleanedNote, octave, arr, direction);
  // solve for freqency (frequency = refValue * a ** n)
  let a = 2 ** (1 / 12); //12th root of 2
  let calculatedFrequency = refValue * a ** n;
  return calculatedFrequency;
}

console.log(findFrequency("dsharp", 5));
