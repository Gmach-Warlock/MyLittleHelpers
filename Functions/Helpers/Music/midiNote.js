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
// converts sharp to # and flat to b
export function convertToSymbols(string) {
  if (string !== "sharp" && string !== "flat") {
    console.log(`Invalid extension`);
    return;
  }
  const stringMap = {
    sharp: "#",
    flat: "b",
  };
  return stringMap[string];
}
// converts to symbols, and checks for combo versions of the notes as well eg. C#/Db or Csharp/Dflat
export function cleanPitch(pitch) {
  // type guards
  if (typeof pitch !== "string") {
    console.log(`Invalid Type`);
    return;
  }
  let note = pitch[0].toUpperCase();
  let extension = pitch.slice(1).toLowerCase();
  if (extension && (extension === "sharp" || extension === "flat"))
    extension = convertToSymbols(extension);
  // if setup like Csharp/Dflat
  if (extension && extension.includes("/")) {
    let extensionsArray = extension.split("/");
    let firstExtension = extensionsArray[0];
    let secondNote = extensionsArray[1][0].toUpperCase();
    let secondExtension = extensionsArray[1].slice(1);
    if (firstExtension === "sharp" || firstExtension === "flat")
      firstExtension = convertToSymbols(firstExtension);
    if (secondExtension === "sharp" || secondExtension === "flat")
      secondExtension = convertToSymbols(secondExtension);
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
export function cleanOctave(octave) {
  if (typeof octave !== "number" && typeof octave !== "string") {
    console.log(`Invalid octave type`);
    return;
  }
  octave = Number(octave);
  if (octave < 0 || octave > 8) {
    console.log(`Octave is out of range`);
    return;
  }
  return octave;
}
// determine direction a note is from A4. This is used to find frequency in equal temperment scale.
export function determineDirection(pitch, octave) {
  const isAboveA = ["A#", "Bb", "A#/Bb", "B"].includes(pitch);
  const direction =
    octave > 4 || (octave === 4 && isAboveA) ? "forward" : "reverse";
  return direction;
}
// determine number of semitones between two notes. The default starting note is A4. Optional parameters to change the starting note.
export function findNumberOfSemitones(
  targetPitch,
  targetOctave,
  startingPitch = "A",
  startingOctave = 4
) {
  // clean up the pitches and determine directional flow (type guards in the helpers)
  let cleanedTargetPitch = cleanPitch(targetPitch);
  let cleanedStartingPitch = cleanPitch(startingPitch);
  let direction = determineDirection(targetPitch, targetOctave);
  let currentIndex = notesArray.indexOf(cleanedStartingPitch);
  let currentOctave = startingOctave;
  let n = 0;
  let len = notesArray.length;
  // If note has extension need to make sure we iterate past the note without extension (if we have C# we don't want to stop on C)
  if (cleanedTargetPitch[1] === "#" || cleanedTargetPitch[1] === "b") {
    while (
      !notesArray[currentIndex].includes(cleanedTargetPitch) ||
      currentOctave !== targetOctave
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
    // note has no extension so we need to look for exact note in array
    while (
      notesArray[currentIndex] !== cleanedTargetPitch ||
      currentOctave !== targetOctave
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
// default reference value is 440 for standard equal temperment values
export function findFrequency(pitch, octave, refValue = 440) {
  if (
    typeof pitch !== "string" ||
    typeof octave !== "number" ||
    typeof refValue !== "number"
  ) {
    console.log("Invalid parameter type");
    return;
  }
  let cleanedPitch = cleanPitch(pitch);
  let n = findNumberOfSemitones(cleanedPitch, octave);
  let a = 2 ** (1 / 12);
  return refValue * a ** n;
}
// if n is calculated for frequency, we can enter the optional third param and avoid recalculating it in the function (Now the value of n can be recycled in factory functions)
export function findMidiValue(pitch, octave, numberOfSemitones = undefined) {
  if (numberOfSemitones !== undefined && numberOfSemitones !== null)
    return 69 + numberOfSemitones;
  let cleanedPitch = cleanPitch(pitch);
  let n = findNumberOfSemitones(cleanedPitch, octave);
  let midiValue = 69 + n;
  return midiValue;
}

console.log(findMidiValue("C", 4));
