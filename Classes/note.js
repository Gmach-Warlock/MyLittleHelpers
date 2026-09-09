export class MidiNote {
  notesArray = [
    "A",
    "A#/Bb",
    "B",
    "C",
    "C#/Db",
    "D",
    "D#/Eb",
    "E",
    "F",
    "F#/Gb",
    "G",
    "G#/Ab",
  ];

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

export class MidiKeyboard {
  constructor(refValue, notes) {
    this._refValue = refValue;
    this._notes = notes;
  }
  get refValue() {
    return this._refValue;
  }
  get notes() {
    return this._notes;
  }
  set refValue(newRefValue) {
    this._refValue = newRefValue;
  }
  set notes(newNotes) {
    this._notes = newNotes;
  }
}
