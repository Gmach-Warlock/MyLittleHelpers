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
  const noteFrequency = findFrequency(cleanedNote, octave, refValue);
  const noteMidiValue = findMidiValue(cleanedNote, octave);
  return new MidiNote(cleanedNote, octave, noteFrequency, noteMidiValue);
}
export function createMidiNotesObject(
  refValue,
  startPitch,
  startOctave,
  endPitch,
  endOctave
) {
  let currentOctave = startOctave;
  let cleanedStartPitch = convertToMusicalSymbols(startPitch);
  let cleanedEndPitch = convertToMusicalSymbols(endPitch);
  let currentIndex = flatsArray.indexOf(cleanedStartPitch);
  let startMidiValue = findMidiValue(cleanedStartPitch, startOctave);
  let endMidiValue = findMidiValue(cleanedEndPitch, endOctave);
  let distance = endMidiValue - startMidiValue;
  const arrToUse = determineArray(startPitch);
  const len = arrToUse.length;
  const notesObject = {};

  //
  if (arrToUse[currentIndex] === "C") currentOctave--;
  while (arrToUse[currentIndex] !== endPitch || currentOctave !== endOctave) {
    if (arrToUse[currentIndex] === "C") {
      currentOctave++;
    }
    notesObject[arrToUse[currentIndex] + currentOctave] = makeNoteObject(
      arrToUse[currentIndex],
      currentOctave,
      refValue
    );
    currentIndex = (currentIndex + 1) % len;
  }
  return notesObject;
}
console.log(makeNoteObject("Gb", 4, 440));
console.log(createMidiNotesObject(440, "C", 3, "C", 6));

export function createMidiKeyboard(refValue, notes) {
  return new MidiKeyboard(refValue, notes);
}
