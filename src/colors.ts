const grassColors = {
  Badlands: hexToRGBObj("#90814d"),
  "Birch Forest": hexToRGBObj("#88bb67"),
  "Dark Forest": hexToRGBObj("#507a32"),
  Desert: hexToRGBObj("#bfb755"),
  Forest: hexToRGBObj("#79c05a"),
  Jungle: hexToRGBObj("#59c93c"),
  "Jungle Edge": hexToRGBObj("#64c73f"),
  Mountains: hexToRGBObj("#8ab689"),
  "Mushroom Fields": hexToRGBObj("#55c93f"),
  Ocean: hexToRGBObj("#8eb971"),
  Plains: hexToRGBObj("#91bd59"),
  "Snowy Beach": hexToRGBObj("#83b593"),
  "Snowy Tundra": hexToRGBObj("#80b497"),
  "Swamp (Green)": hexToRGBObj("#4C763C"),
  "Swamp (Olive)": hexToRGBObj("#6A7039"),
  Taiga: hexToRGBObj("#86b783"),
};

const foliageColors = {
  Badlands: hexToRGBObj("#9e814d"),
  "Birch Forest": hexToRGBObj("#6ba941"),
  "Dark Forest": hexToRGBObj("#59ae30"),
  Desert: hexToRGBObj("#aea42a"),
  Forest: hexToRGBObj("#59ae30"),
  Jungle: hexToRGBObj("#30bb0b"),
  "Jungle Edge": hexToRGBObj("#3eb80f"),
  Mountains: hexToRGBObj("#6da36b"),
  "Mushroom Fields": hexToRGBObj("#2bbb0f"),
  Ocean: hexToRGBObj("#71a74d"),
  Plains: hexToRGBObj("#77ab2f"),
  "Snowy Beach": hexToRGBObj("#64a278"),
  "Snowy Tundra": hexToRGBObj("#60a17b"),
  "Swamp (Green)": hexToRGBObj("#4C763C"),
  "Swamp (Olive)": hexToRGBObj("#6a7039"),
  Taiga: hexToRGBObj("#68a464"),
};

function hexToRGBObj(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16), // [[1], [2]]
    g: parseInt(hex.slice(3, 5), 16), // [[3], [4]]
    b: parseInt(hex.slice(5, 7), 16), // [[5], [6]]
  };
}

export { grassColors, foliageColors };
