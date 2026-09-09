export const notesArray = [
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

export function cleanPitch(pitch) {
  // type guards
  if (typeof pitch !== "string") {
    console.log(`Invalid Type`);
    return;
  }
  let note = pitch[0].toUpperCase();
  let extension = pitch.slice(1).toLowerCase();
  if (extension && extension === "sharp") extension = "#";
  if (extension && extension === "flat") extension = "b";
  // if setup like Csharp/Dflat
  if (extension && extension.includes("/")) {
    let extensionsArray = extension.split("/");
    let firstExtension = extensionsArray[0];
    let secondNote = extensionsArray[1][0].toUpperCase();
    let secondExtension = extensionsArray[1].slice(1);
    if (firstExtension === "sharp") firstExtension = "#";
    if (firstExtension === "flat") firstExtension = "b";
    if (secondExtension === "sharp") secondExtension = "#";
    if (secondExtension === "flat") secondExtension = "b";
    console.log(
      `checking extensions, first: ${firstExtension}, second: ${secondExtension}`
    );
    if (
      !(
        (firstExtension === "#" && secondExtension === "b") ||
        (firstExtension === "b" && secondExtension === "#")
      )
    ) {
      console.log("Invalid note extension");
      return;
    }
    extension = firstExtension + "/" + secondNote + secondExtension;
  }
  return note + extension;
}

export function determineDirection(pitch, octave) {
  const isAboveA = ["A#", "Bb", "A#/Bb", "B"].includes(pitch);
  const direction =
    octave > 4 || (octave === 4 && isAboveA) ? "forward" : "reverse";
  return direction;
}

export function findNumberOfSemitones(pitch, octave) {
  let cleanedPitch = cleanPitch(pitch);
  let direction = determineDirection(pitch, octave);
  let currentIndex = 0;
  let currentOctave = 4;
  let n = 0;
  let len = notesArray.length;
  if (cleanedPitch[1] === "#" || cleanedPitch[1] === "b") {
    while (
      !notesArray[currentIndex].includes(cleanedPitch) ||
      currentOctave !== octave
    ) {
      if (direction === "forward") {
        currentIndex = (currentIndex + 1) % len;
        n++;
        if (notesArray[currentIndex] === "C") currentOctave++;
      } else {
        if (notesArray[currentIndex] === "C") currentOctave--;
        currentIndex = (currentIndex - 1 + len) % len;
        n--;
      }
    }
  } else {
    while (
      notesArray[currentIndex] !== cleanedPitch ||
      currentOctave !== octave
    ) {
      if (direction === "forward") {
        currentIndex = (currentIndex + 1) % len;
        n++;
        if (notesArray[currentIndex] === "C") currentOctave++;
      } else {
        if (notesArray[currentIndex] === "C") currentOctave--;
        currentIndex = (currentIndex - 1 + len) % len;
        n--;
      }
    }
  }

  return n;
}

export function findMidiValue(pitch, octave, numberOfSemitones = undefined) {
  if (numberOfSemitones !== undefined && numberOfSemitones !== null) return 69 + numberOfSemitones;
  let cleanedPitch = cleanPitch(pitch);
  let n = findNumberOfSemitones(cleanedPitch, octave);
  let midiValue = 69 + n;
  return midiValue;
}

console.log(findMidiValue("C", 4));
