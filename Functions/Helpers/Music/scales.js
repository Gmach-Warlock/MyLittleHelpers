import { notesArray } from "./midiNote";

export const scaleMap = {
  // ionian = major
  ionian: [0, 2, 4, 5, 7, 9, 11], // T,T,S,T,T,T,S
  dorian: [0, 2, 3, 5, 7, 9, 10], // T,S,T,T,T,S,T
  phrygian: [0, 1, 3, 5, 7, 8, 10], // T,S,T,T,T,S,T
  lydian: [0, 2, 4, 6, 7, 9, 11], // T,T,T,S,T,T,S
  mixolydian: [0, 2, 4, 5, 7, 9, 10], // T,T,S,T,T,S,T
  // aeolian = minor pure
  aeolian: [0, 2, 3, 5, 7, 8, 10], // T,S,T,T,S,T,T
  locrian: [0, 1, 3, 5, 6, 8, 10], // S,T,T,S,T,T.T
  minorPentatonic: [0, 3, 5, 7, 10], // TS,T,T,TS,T
  majorPentatonic: [0, 2, 4, 7, 9], // T,T,TS,T,TS
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11], // T,S,T,T,S,TS,S
  melodicMinor: [0, 2, 3, 5, 7, 9, 11], // T,S,T,T,T,T,S
};

export function cleanScaleName(scaleName) {
  if (typeof scaleName !== "string") {
    console.log(`Invalid parameter type on scaleName`);
    return;
  }
}

export function composeScaleOject(pitch, octave, scaleType) {
  // guards
  if (
    typeof pitch !== "string" ||
    typeof octave !== "number" ||
    typeof scaleType !== "string"
  ) {
    console.log(`Invalid paramter type`);
    return;
  }
}
