import {
  convertToMusicalSymbols,
  findFrequency,
  findMidiValue,
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

export function makeNoteObject(pitch, octave) {
  const cleanedNote = convertToMusicalSymbols(pitch);
  const noteFrequency = findFrequency(cleanedNote, octave);
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
  endOctave,
) {
  const newArray = [];
  newArray.push(makeNoteObject(startPitch, startOctave));
  return newArray;
}

console.log(createMidiNotesArray(440, "C", 3, "C", 6));
