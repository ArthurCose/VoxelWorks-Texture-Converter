import LayeredBlockTexture, { BlockLayer } from "./LayeredBlockTexture";

const hiddenCanvas = document.createElement("canvas");
const hiddenCtx = hiddenCanvas.getContext("2d");

const defaultBlockSize = 16;

function draw(
  canvas: HTMLCanvasElement,
  layeredTextures: LayeredBlockTexture[],
  defaultTexture: HTMLImageElement
) {
  const textures = layeredTextures
    .flatMap((layered) => layered.map((block) => block.texture))
    .filter((texture) => texture); // filter blanks

  const size = largestSize(textures);

  // based on default terrain texture size
  const w = 512 / defaultBlockSize;
  const h = 512 / defaultBlockSize;

  canvas.width = w * size;
  canvas.height = h * size;

  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  let x = 0;
  let y = 0;

  for (const layers of layeredTextures) {
    const missingATexture = layers.some((layer) => !layer.texture);

    if (missingATexture) {
      ctx.drawImage(
        defaultTexture,
        x * defaultBlockSize,
        y * defaultBlockSize,
        defaultBlockSize,
        defaultBlockSize,
        x * size,
        y * size,
        size,
        size
      );
    } else {
      for (const layer of layers) {
        drawLayer(ctx, layer, x, y, size);
      }
    }

    if (++x == w) {
      x = 0;
      ++y;
    }
  }
}

function drawLayer(
  ctx: CanvasRenderingContext2D,
  layer: BlockLayer,
  x: number,
  y: number,
  size: number
) {
  if (!layer.texture) {
    return;
  }

  if (!layer.color) {
    ctx.drawImage(
      layer.texture,
      0,
      0,
      <number>layer.texture.width,
      <number>layer.texture.height,
      x * size,
      y * size,
      size,
      size
    );
    return;
  }

  hiddenCanvas.width = <number>layer.texture.width;
  hiddenCanvas.height = <number>layer.texture.height;
  hiddenCtx.drawImage(layer.texture, 0, 0);

  const imageData = hiddenCtx.getImageData(
    0,
    0,
    hiddenCanvas.width,
    hiddenCanvas.height
  );

  const scale = size / imageData.width;

  for (let i = 0; i < imageData.width; i++) {
    for (let j = 0; j < imageData.height; j++) {
      const index = i * 4 + imageData.width * j * 4;
      const r = (imageData.data[index] * layer.color.r) / 255;
      const g = (imageData.data[index + 1] * layer.color.g) / 255;
      const b = (imageData.data[index + 2] * layer.color.b) / 255;
      const a = imageData.data[index + 3];

      ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
      ctx.fillRect(x * size + i * scale, y * size + j * scale, scale, scale);
    }
  }
}

function largestSize(textures: CanvasImageSource[]): number {
  let largestSize = 1;

  for (const texture of textures) {
    if (texture.width > largestSize) {
      largestSize = <number>texture.width;
    }
  }

  return largestSize;
}

export default draw;
