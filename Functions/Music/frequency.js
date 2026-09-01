const notesSharps = [
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
const notesFlats = [
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
// next we need to determine if the note is above or below ref value. (If pitch and octave equals A4 we return the ref value)
// we then iterate until we get to the note, incrementing a variable to use for n, raising or lowering the octave at C, depending on our direction
// once we have n we plug it in and return the answer

export function findNoteFrequency(pitch, octave, refValue) {
  let useFlats = false;
  let isAbove = false;
  let currentOctave = 4;

  if (
    pitch === "Ab" ||
    pitch === "Bb" ||
    pitch === "Db" ||
    pitch === "Eb" ||
    pitch === "Gb"
  ) {
    useFlats = true;
  }

  if (pitch === "A#" || pitch === "Bb" || pitch === "B") {
    isAbove = true;
  }

  if (useFlats) {
    // forward rotation
    if (octave >= 5 || (octave === 4 && isAbove)) {
      for (let i = 0; i < notesFlats.length; i++) {
        if (note === "C") {
          currentOctave++;
        }
      }
    } else {
      // reverse rotation
      for (let i = notesFlats.length - 1; i >= 0; i--) {
        if (note === "C") {
          currentOctave--;
        }
      }
    }
  } else {
    // forward rotation
    if (octave >= 5 || (octave === 4 && isAbove)) {
      for (let i = 0; i < notesFlats.length; i++) {
        if (note === "C") {
          currentOctave++;
        }
      }
      if (octave >= 5 || (octave === 4 && isAbove)) {
      } else {
        // reverse rotation
        for (let i = notesFlats.length - 1; i >= 0; i--) {
          if (note === "C") {
            currentOctave--;
          }
        }
      }
    }
  }
}
