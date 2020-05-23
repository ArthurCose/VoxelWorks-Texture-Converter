import JSZip from "jszip";
import loadBlocks from "./loadBlocks";
import draw from "./draw";
import { grassColors, foliageColors } from "./colors";
// @ts-ignore
import licenseText from "../licenses.txt";

const defaultTexture = new Image();
defaultTexture.src =
  "https://raw.githubusercontent.com/NeoSpark314/VoxelWorksQuest/master/data/terrain_blocks.png";

const fileInput: HTMLInputElement = document.querySelector("#file-input");
const renderButton: HTMLButtonElement = document.querySelector(
  "#render-button"
);

const elementById = <T extends HTMLElement>(id) =>
  <T>document.getElementById(id);

const biomeSelection = elementById<HTMLSelectElement>("biome-select");
const snowstoneSelection = elementById<HTMLSelectElement>("snowstone-select");
const roseSelection = elementById<HTMLSelectElement>("rose-select");
const violaSelection = elementById<HTMLSelectElement>("viola-select");
const obsidianSelection = elementById<HTMLSelectElement>("obsidian-select");
const obsidianBricksSelection = elementById<HTMLSelectElement>(
  "obsidian-bricks-select"
);
const steelSelection = elementById<HTMLSelectElement>("steel-select");
const workbenchSelection = elementById<HTMLSelectElement>("workbench-select");
const glassSelection = elementById<HTMLSelectElement>("glass-select");
const crateSelection = elementById<HTMLSelectElement>("crate-select");

const canvas = document.querySelector("canvas");

fileInput.addEventListener("change", drawFile);
renderButton.addEventListener("click", drawFile);

function drawFile() {
  const file = fileInput.files[0];

  renderButton.disabled = !file;

  if (!file) {
    return;
  }

  const biome = biomeSelection.value;

  const options = {
    foliageColor: foliageColors[biome],
    grassColor: grassColors[biome],
    snowstoneGrass: snowstoneSelection.value,
    rose: roseSelection.value,
    viola: violaSelection.value,
    obsidian: obsidianSelection.value,
    obsidianBricks: obsidianBricksSelection.value,
    steel: steelSelection.value,
    craftingTableSide: workbenchSelection.value,
    glass: glassSelection.value,
    crate: crateSelection.value,
  };

  JSZip.loadAsync(file)
    .then((jszip) => loadBlocks(jszip, options))
    .then((layeredTextures) => draw(canvas, layeredTextures, defaultTexture))
    .catch((err) => {
      console.error(err);
      alert(err);
    });
}

const licensesButton = document.getElementById("view-licenses");

licensesButton.addEventListener("click", () => {
  const page = open();
  page.document.write(`<pre>${licenseText}</pre>`);
});
