const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

let manager;

let text = "7";
let fontSize = 1200;
let fontFamily = "Lucida Console";

const url = "https://picsum.photos/200";
const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(img);
    img.src = url;
  });
};

const getImage = async () => {
  const img = await loadMeSomeImage(url);
  return img;
};

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = "black";
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols * 1.2;

    typeContext.fillStyle = "white";
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = "top";

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();
    typeContext.drawImage(getImage(), 10, 10);
    //typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    context.texBaseline = "middle";
    context.textAlign = "center";

    // context.drawImage(typeCanvas, 0, 0);

    for (let count = 0; count < numCells; count++) {
      const column = count % cols;
      const rowG = Math.floor(count / cols);

      const x = column * cell;
      const y = rowG * cell;

      const rgbR = typeData[count * 4 + 0];
      const rgbG = typeData[count * 4 + 1];
      const rgbB = typeData[count * 4 + 2];
      const rgbA = typeData[count * 4 + 3];

      const glyph = getGlyph(rgbR);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;

      context.fillStyle = "white";

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      context.fillText(glyph, 0, 0);

      context.restore();
    }
  };
};

const getGlyph = (v) => {
  if (v < 50) return "";
  if (v < 100) return ".";
  if (v < 150) return "-";
  if (v < 200) return "+";

  const glyphs = "_=/ -+".split("");

  return random.pick(glyphs);
};

const onKeyUp = (e) => {
  text = e.key.toUpperCase();
  console.log("Botão apertado");
  manager.render();
};

document.addEventListener("keyup", onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};
start();

// canvasSketch(sketch, settings);

/*const url = "https://picsum.photos/200";

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(img);
    img.src = url;
  });
};

const start = async () => {
  const img = await loadMeSomeImage(url);
  console.log("image width", img.widht);
  console.log("this line");
};

const start = () => {
  loadMeSomeImage(url).then(img => {
    console.log("image width", img.widht);
  });
  console.log("this line");
};

start();*/
