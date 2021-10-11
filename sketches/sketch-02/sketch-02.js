const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
    dimensions: [1080, 1080]
};

const degToRad = (degrees) => {
    return degrees / 100 * Math.PI;
};

const randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

let backgroundColor = 'white';
let stickColor = 'black';
let circleColor = 'red';

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, width, height); //The fillRect() method
        //draws a "filled" rectangle. The default color of the fill is black.


        context.fillStyle = stickColor;

        const cx = width * 0.5;
        const cy = height * 0.5;

        const w = width * 0.01;
        const h = height * 0.1;
        let x, y;

        const num = 500;
        const radius = width * 0.3;

        for (let count = 0; count < num; count++) {
            const slice = math.degToRad(360 / num);
            const angle = slice * count;
            x = cx + radius * Math.sin(angle);
            y = cy + radius * Math.cos(angle);

            context.save();
            context.translate(x, y);
            context.rotate(-angle);
            context.scale(randomRange(0.1, 2), random.range(0.2, 0.5));

            context.beginPath();
            context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
            context.fill();
            context.restore();

            context.save();
            context.translate(cx, cy);
            context.rotate(-angle);

            context.lineWidth = random.range(5, 20);

            context.beginPath();
            context.arc(0, 0, radius * random.range(0.7, 1.3),
                slice * random.range(1, -8), slice * random.range(0, 5));
            context.strokeStyle = circleColor;
            context.stroke();
            context.restore();
        }

    };
};

canvasSketch(sketch, settings);




//################## Creating a Circle##########################
//save state 

//restore the state

// context.translate(100, 400);

// context.beginPath();
// context.arc(0, 0, 50, 0, Math.PI * 2);
// context.fill();
//##############################End of the circle###############