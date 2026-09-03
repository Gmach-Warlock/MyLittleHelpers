export class MNote {
  constructor(pitch, octave, frequency, midiValue) {
    this._pitch = pitch;
    this._octave = octave;
    this._frequency = frequency;
    this._midiValue = midiValue;
  }
  get pitch() {
    return this._pitch;
  }
  get octave() {
    return this._octave;
  }
  get frequency() {
    return this._frequency;
  }
  get midiValue() {
    return this._midiValue;
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
