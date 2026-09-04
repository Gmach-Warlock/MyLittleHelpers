import {
  sharpsArray,
  flatsArray,
  convertToMusicalSymbols,
  findFrequency,
  findMidiValue,
  determineArray,
} from "./midiNoteHelpers.js";

export class MidiNote {
  constructor(pitch, octave, frequency, midiValue) {
    this.pitch = pitch;
    this.octave = octave;
    this.frequency = frequency;
    this.midiValue = midiValue;
  }
  get pitch() {
    return this.pitch;
  }
  get octave() {
    return this.octave;
  }
  get frequency() {
    return this.frequency;
  }
  get midiValue() {
    return this.midiValue;
  }
  set pitch(newPitch) {
    this._pitch = newPitch;
  }
  set octave(newOctave) {
    this._octave = newOctave;
  }
  set frequency(newFrequency) {
    this._frequency = newFrequency;
  }
  set midiValue(newMidiValue) {
    this._midiValue = newMidiValue;
  }
}

export function makeNoteObject(pitch, octave, refValue = 440) {
  const cleanedNote = convertToMusicalSymbols(pitch);
  const noteFrequency = findFrequency(cleanedNote, octave, refValue);
  const noteMidiValue = findMidiValue(cleanedNote, octave);
  return new MidiNote(cleanedNote, octave, noteFrequency, noteMidiValue);
}
export class MidiKeyboard {
  constructor(refValue, notesArray) {
    this.refValue = refValue;
    this.notes = notesArray;
  }
}

export function createMidiNotesArray(
  refValue,
  startPitch,
  startOctave,
  endPitch,
  endOctave
) {
  let currentOctave = startOctave;
  let cleanedPitch = convertToMusicalSymbols(startPitch);
  let currentIndex = flatsArray.indexOf(cleanedPitch);
  let arrToUse = determineArray(startPitch);
  let len = arrToUse.length;
  const noteObjectsArray = [];
  console.log(
    `cO: ${currentOctave}, cP: ${cleanedPitch} cI: ${currentIndex} arr: ${arrToUse}`
  );
  if (arrToUse[currentIndex] === "C") currentOctave--;
  while (arrToUse[currentIndex] !== endPitch || currentOctave !== endOctave) {
    if (arrToUse[currentIndex] === "C") currentOctave++;
    noteObjectsArray.push(`check ${currentIndex}`);
    currentIndex = (currentIndex + 1) % len;
  }

  return noteObjectsArray;
}

console.log(createMidiNotesArray(440, "C", 3, "C", 6));
