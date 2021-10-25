const canvasSketch = require("canvas-sketch");
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = 10;
    const rows = 10;
    const numCells = cols * rows;

    const gridW = width * 0.8;
    const gridH = height * 0.8;
    const cellW = gridW / cols;
    const cellH = gridH / rows;
    const margX = (width - gridW) * 0.5;
    const margY = (height - gridH) * 0.5;

    for (let count = 0; count < numCells; count++) {
      const col = count % cols;
      const row = Math.floor(count / cols);

      const x = col * cellW;
      const y = row * cellH;
      const w = cellW * 0.8;
      const h = cellH * 0.8;

      const noise = random.noise2D(x + frame * 10, y, 0.001);
      const angle = noise *Math.PI * 0.2;
      //const scale = (noise + 1)/2 * 30;
      //const scale = (noise * 0.5 + 0.5) * 30;
      const scale = math.mapRange(noise, -1, 1, 1, 30);
      
      context.save();
      context.translate(x, y);
      context.translate(margX, margY);
      context.translate(cellW  * 0.5, cellH * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
