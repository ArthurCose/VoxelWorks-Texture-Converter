import JSZip from "jszip";
import LayeredBlockTexture, { BlockLayer } from "./LayeredBlockTexture";

type Color = { r: number; g: number; b: number };
type Options = {
  foliageColor: Color;
  grassColor: Color;
  rose: string;
  viola: string;
  obsidian: string;
  obsidianBricks: string;
  steel: string;
  craftingTableSide: string;
  glass: string;
  crate: string;
  snowstoneGrass: string; // not a texture name, just options
};

function getSnowStone(
  options: Options,
  grassColor: Color
): LayeredBlockTexture {
  switch (options.snowstoneGrass) {
    case "none":
      return [{ name: "stone" }];
    case "snowy":
      return [{ name: "stone" }, { name: "grass_block_side_overlay" }];
    default:
      return [
        { name: "stone" },
        {
          name: "grass_block_side_overlay",
          color: grassColor,
        },
      ];
  }
}

async function loadBlocks(
  jszip: JSZip,
  options: Options
): Promise<LayeredBlockTexture[]> {
  const foliageColor = options.foliageColor;
  const grassColor = options.grassColor;

  const layers: LayeredBlockTexture[] = [
    [{ name: "dirt" }],
    [{ name: "stone" }],
    [{ name: "grass_block_top", color: grassColor }],
    [{ name: "sand" }],
    [
      { name: "grass_block_side" },
      {
        name: "grass_block_side_overlay",
        color: grassColor,
      },
    ],
    [{ name: "oak_log" }],
    [{ name: "oak_log_top" }],
    [{ name: "oak_leaves", color: foliageColor }],
    [{ name: "snow" }],
    [{ name: "grass_block_snow" }],
    getSnowStone(options, grassColor),
    [{ name: "bedrock" }],
    [{ name: "white_concrete" }], // cloud
    [{ name: "oak_planks" }],
    [{ name: "birch_log" }],
    [{ name: "birch_log_top" }],
    [{ name: "birch_leaves", color: { r: 0x80, g: 0xa7, b: 0x55 } }],
    [{ name: "birch_planks" }],
    [{ name: "acacia_log" }],
    [{ name: "acacia_log_top" }],
    [{ name: "acacia_leaves", color: foliageColor }],
    [{ name: "acacia_planks" }],
    [{ name: "spruce_log" }],
    [{ name: "spruce_log_top" }],
    [{ name: "spruce_leaves", color: { r: 0x61, g: 0x99, b: 0x61 } }],
    [{ name: "spruce_planks" }],
    [{ name: "jungle_log" }],
    [{ name: "jungle_log_top" }],
    [{ name: "jungle_leaves", color: foliageColor }],
    [{ name: "jungle_planks" }],
    [{ name: "coal_ore" }],
    [{ name: "granite" }], // copper

    // next row
    [{ name: "granite" }], // copper extra
    [{ name: "diamond_ore" }],
    [{ name: "gold_ore" }],
    [{ name: "iron_ore" }],
    [{ name: "glowstone" }], // mese
    [{ name: "diorite" }], // tin
    [{ name: "grass", color: grassColor }],
    [{ name: "grass", color: grassColor }],
    [{ name: "grass", color: grassColor }],
    [{ name: "grass", color: grassColor }],
    [{ name: "grass", color: grassColor }],
    [{ name: "dead_bush" }], // dead grass
    [{ name: "dead_bush" }], // dead grass
    [{ name: "dead_bush" }], // dead grass
    [{ name: "dead_bush" }], // dead grass
    [{ name: "dead_bush" }], // dead grass
    [{ name: "oak_sapling" }],
    [{ name: "spruce_sapling" }],
    [{ name: "birch_sapling" }],
    [{ name: "acacia_sapling" }],
    [{ name: "jungle_sapling" }],
    [{ name: "dead_bush" }],
    [{ name: "azure_bluet" }], // white dandelion
    [{ name: "dandelion" }], // yellow dandelion
    [{ name: "blue_orchid" }], // geranium
    [{ name: "brown_mushroom" }],
    [{ name: "red_mushroom" }],
    [{ name: options.rose }],
    [{ name: "red_tulip" }],
    [{ name: options.viola }],
    [{ name: options.viola }], // place holder flower
    [{ name: options.viola }], // place holder flower

    //next row
    [{ name: "bricks" }],
    [{ name: "stone_bricks" }],
    [{ name: "cobblestone" }],
    [{ name: "sandstone_top" }], // sandstone
    [{ name: "chiseled_sandstone" }], // sandstone bricks
    [{ name: options.obsidian }],
    [{ name: options.obsidianBricks }],
    [{ name: "red_sandstone_top" }], // desert sandstone
    [{ name: "chiseled_red_sandstone" }], // desert sandstone bricks
    [{ name: "red_sandstone_bottom" }], // desert sandstone cobble
    [{ name: "red_sand" }], // desert sand
    [{ name: "iron_block" }],
    [{ name: "polished_diorite" }], // tin
    [{ name: options.steel }], // steel
    [{ name: "glowstone" }], // mese
    [{ name: "gold_block" }],
    [{ name: "diamond_block" }],
    [{ name: "polished_granite" }], // copper
    [{ name: "coal_block" }],
    [{ name: "orange_shulker_box" }], // bronze
    [{ name: "gravel" }],
    [{ name: "crafting_table_top" }],
    [{ name: options.craftingTableSide }],
    [{ name: "oak_planks" }], // workbench bottom
    [{ name: "furnace_top" }],
    [{ name: "furnace_side" }],
    [{ name: "furnace_top" }], // furnace bottom
    [{ name: "furnace_front" }],
    [{ name: options.glass }],
    [{ name: options.crate }],
  ];

  const promises = layers.map((layer) => {
    const promises = layer.map(async (block) => {
      const path = `assets/minecraft/textures/block/${block.name}.png`;

      return {
        ...block,
        texture: await jszip.file(path)?.async("blob").then(loadImage),
      };
    });

    return Promise.all(promises);
  });

  return Promise.all(promises);
}

function loadImage(blob: Blob | undefined): Promise<CanvasImageSource> {
  const image = new Image();

  if (!blob) {
    return Promise.resolve(image);
  }

  image.src = URL.createObjectURL(blob);

  return new Promise((resolve) => {
    image.onload = () => resolve(image);
  });
}

export default loadBlocks;
