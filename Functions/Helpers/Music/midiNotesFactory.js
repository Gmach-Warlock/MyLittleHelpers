import {
  sharpsArray,
  flatsArray,
  convertToMusicalSymbols,
  findFrequency,
  findMidiValue,
  determineArray,
} from "./midiNoteHelpers.js";
import { MidiNote, MidiKeyboard } from "../../../Classes/note.js";

export function makeNoteObject(pitch, octave, refValue = 440) {
  const cleanedNote = convertToMusicalSymbols(pitch);
  const mainArray = determineArray(pitch, octave);
  console.log(mainArray);
  const noteIndex = mainArray.indexOf(cleanedNote);
  // if note has # or b use a combo with both (C#/Db)
  const midiNote = cleanedNote[1]
    ? sharpsArray[noteIndex] + flatsArray[noteIndex]
    : cleanedNote;
  // can still use the original pitch variable for these
  const noteFrequency = findFrequency(cleanedNote, octave, refValue);
  const noteMidiValue = findMidiValue(cleanedNote, octave);
  return new MidiNote(midiNote, octave, noteFrequency, noteMidiValue);
}

console.log(makeNoteObject("D#", 4, 440));
export function makeMidiNotesObject(
  startPitch,
  startOctave,
  endPitch,
  endOctave,
  refValue = 440,
) {
  // type guards
  if (
    typeof startPitch !== "string" ||
    typeof startOctave !== "number" ||
    typeof endPitch !== "string" ||
    typeof endOctave !== "number"
  )
    return;
  // sanitize my pitches
  const cleanedStart = convertToMusicalSymbols(startPitch);
  const cleanedEnd = convertToMusicalSymbols(endPitch);
  const startMidiValue = findMidiValue(cleanedStart, startOctave);
  const endMidiValue = findMidiValue(cleanedEnd, endOctave);
  const distance = endMidiValue - startMidiValue;
  const mainArray =
    cleanedStart[1] === "b" || cleanedEnd[1] === "b" ? flatsArray : sharpsArray;
  const startingIndex = mainArray.indexOf(cleanedStart);
  const len = mainArray.length;
  const newObject = {};
  console.log(
    `start: ${cleanedStart}${startOctave},${startMidiValue}, end: ${cleanedEnd}${endOctave},${endMidiValue}, distance: ${distance}`,
  );
  // let variables
  let currentOctave = startOctave;
  let currentIndex;
  let currentPitch;
  let currentMidiValue = startMidiValue;
  // use distance in for loops
  for (let i = 0; i <= distance; i++) {
    currentIndex = (i + startingIndex) % len;
    currentPitch = mainArray[currentIndex];
    currentIndex = (i + startingIndex) % len;
    console.log(mainArray[currentIndex] + currentOctave);
    if (mainArray[currentIndex] === "C") currentOctave++;
    newObject[currentPitch] = makeNoteObject(
      currentPitch,
      currentOctave,
      refValue,
    );
  }
  return newObject;
}
console.log(makeMidiNotesObject("C", 3, "G", 5));

export function createMidiKeyboard(refValue, notes) {
  return new MidiKeyboard(refValue, notes);
}
