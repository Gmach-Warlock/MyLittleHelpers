/*Middle C (C4) is universally standardized as Note 60.
Lower notes drop down in semitones (e.g., B3 is 59, A3 is 57).
Higher notes step up in semitones (e.g., C#4 is 61, D4 is 62).
0 is the bottom and it corresponds to C-2 in most DAWs and hardware setups.
The absolute top is 127 which corresponds to G8.*/
// we need to iterate from C (phase shifted iteration)

const midiMapObject = {
    sharps: {
      "C4": 60,
      "C#4": 61
    },
    flats: {

    },
}

export function findMidiValue(pitch, octave) {
  // change words to symbols and guard
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
  

  
  }
  return midiValue;
}

console.log(findMidiValue("A", 1));
