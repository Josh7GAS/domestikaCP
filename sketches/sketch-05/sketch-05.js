const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const Tweakpane = require("tweakpane");

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const params = {
  text: "a",
  theme_color: "black",
  color: "white",
  animate: false
};

let manager;

let text = params.text;
let fontSize = 1200;
let fontFamily = "Lucida Console";

const url = "https://picsum.photos/id/237/200/300";
const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ width, height }) => {
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height}) => {
    
    typeContext.fillStyle = params.theme_color
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols * 1.2;

    typeContext.fillStyle = params.color;
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
    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    /*getImage()
      .then((img) => typeContext.drawImage(img, img.width, img.height))
      .catch((err) => console.log("Image Not Loaded -> " + err.message));
    */

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = params.theme_color;
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

      context.fillStyle = params.color;

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);
      //context.fillRect(0,0,cell,cell);
      context.fillText(glyph, 0, 0);

      context.restore();
    }
  };
};

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(img);
    img.src = url;
  });
};

const getImage = async () => {
  const img = await loadMeSomeImage(url);
  console.log("fetching image => " + img);
  return img;
};

const getGlyph = (value) => {
  if (value < 50) return "";
  if (value < 100) return ".";
  if (value < 150) return "-";
  if (value < 200) return "+";

  const glyphs = "_*#>".split("");

  return random.pick(glyphs);
};

const onKeyUp = (e) => {
  if (e.key) text = text.toUpperCase();
  console.log("Bot??o apertado => " + e);
  manager.render();
};

//document.addEventListener("keyup", onKeyUp);

const start = async () => {
  manager = await canvasSketch(sketch, settings);

};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: "Grid" });
  folder.addInput(params, "text");
  folder.addInput(params, "theme_color", {min: [0, 0, 0], max: [255, 255, 255], });
  folder.addInput(params, "color", { min: [0, 0, 0], max: [255, 255, 255] });
  folder.addInput(params, "animate");
};
createPane();
start();

/*canvasSketch(sketch, settings);

const url = "https://picsum.photos/200";

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
