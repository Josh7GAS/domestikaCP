const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
    dimensions: [1080, 1080]
};

const degToRad = (degrees) => {
    return degrees / 100 * Math.Pi
};

const randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

const backGroundColor = 'black';
const drawnColor = 'white';
const stickColor = 'white';

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = backGroundColor;
        context.fillRect(0, 0, width, height);

        context.fillStyle = drawnColor;

        const cx = width * 0.5;
        const cy = height * 0.5;

        const w = width * 0.01;
        const h = height * 0.1;
        let x, y;

        const num = 500;
        const radius = width * 1;

        for (let count = 0; count < num; count++) {
            const slice = math.degToRad(360 / num);
            const angle = slice * count;
            x = cx + radius * Math.sin(angle);
            y = cy + radius * Math.cos(angle);

            context.save();
            context.translate(x - 550, y - 500);
            context.rotate(-angle);
            context.scale(randomRange(0.1, 2), random.range(0.2, 0.5));

            context.beginPath();
            context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
            context.fill();
            context.restore();


        };
    };
};

canvasSketch(sketch, settings);