type BlockLayer = {
  name: string;
  color?: { r: number; g: number; b: number };
  texture?: CanvasImageSource;
};

type LayeredBlockTexture = BlockLayer[];

export { BlockLayer };
export default LayeredBlockTexture;
