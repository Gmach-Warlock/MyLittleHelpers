// There are two intervals represented by the same distance
// Major, minor Perfect Intervals ans Diminished Augmented Intervals

export function findInterval(distance, intervalType) {
  /*   if (
    (distance !== "number" && distance !== "string") ||
    (intervalType !== "majMin" && intervalType !== "dimAug")
  ) {
    console.log(`Invalid parameter type`);
    return;
  } */
  let propName = "d" + String(distance);
  const intervalMap = {
    majMin: {
      d0: {
        name: "Perfect Unison",
        abbrev: "P1/O",
      },
      d1: {
        name: "minor 2nd",
        abbrev: "m2",
      },
      d2: {
        name: "Major 2nd",
        abbrev: "M2",
      },
      d3: {
        name: "minor 3rd",
        abbrev: "m3",
      },
      d4: {
        name: "Major 3rd",
        abbrev: "M3",
      },
      d5: {
        name: "Perfect 4th",
        abbrev: "P4",
      },
      d6: {
        name: "Tritone",
        abbrev: "Tritone",
      },
      d7: {
        name: "Perfect 5th",
        abbrev: "P5",
      },
      d8: {
        name: "minor 6th",
        abbrev: "m6",
      },
      d9: {
        name: "Major 6th",
        abbrev: "M6",
      },
      d10: {
        name: "minor 7th",
        abbrev: "m7",
      },
      d11: {
        name: "Major 7th",
        abbrev: "M7",
      },
      d12: {
        name: "Perfect Octave",
        abbrev: "P8/O",
      },
    },
    dimAug: {
      d0: {
        name: "Diminished 2nd",
        abbrev: "dim2",
      },
      d1: {
        name: "Augmented Unison",
        abbrev: "AugU/Aug1",
      },
      d2: {
        name: "Diminished 3rd",
        abbrev: "dim3",
      },
      d3: {
        name: "Augmented 2nd",
        abbrev: "Aug2",
      },
      d4: {
        name: "Diminished 4th",
        abbrev: "dim4",
      },
      d5: {
        name: "Augmented 3rd",
        abbrev: "Aug3",
      },
      d6: {
        name: "Diminished 5th/Augmented 4th",
        abbrev: "dim5/Aug4",
      },
      d7: {
        name: "Diminished 6th",
        abbrev: "dim6",
      },
      d8: {
        name: "Augmented 5th",
        abbrev: "Aug5",
      },
      d9: {
        name: "Diminished 7th",
        abbrev: "dim7",
      },
      d10: {
        name: "Augmented 6th",
        abbrev: "Aug6",
      },
      d11: {
        name: "Diminished Octave",
        abbrev: "dim8/dimO",
      },
      d12: {
        name: "Augmented 7th",
        abbrev: "Aug7",
      },
    },
  };
  console.log(distance, intervalType, propName);
  let keyName = "name";
  return intervalMap[intervalType][propName];
}

console.log(findInterval(3, "dimAug"));
