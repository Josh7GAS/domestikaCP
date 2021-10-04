const canvasSketch = require('canvas-sketch');

const settings = {
    dimensions: [1080, 1080]
};

const degToRad = (degrees) => {
    return degrees / 100 * Math.PI;
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        context.fillStyle = 'black';

        const cx = width * 0.5;
        const cy = height * 0.5;

        const w = width * 0.01;
        const h = height * 0.1;
        let x, y;

        const num = 12;
        const radius = width * 0.3;

        for (let count = 0; count < num; count++) {
            const slice = degToRad(3400 / num);
            const angle = slice * count;

            x = cx + radius * Math.sin(angle);
            y = cy + radius * Math.cos(angle);

            context.save();
            context.translate(x, y);
            context.rotate(-angle);

            context.beginPath();
            context.rect(-w * 0.5, -h * 0.5, w, h);
            context.fill();
            context.restore();
        }
        //################## Creating a Circle##########################
        //save state 

        //restore the state

        // context.translate(100, 400);

        // context.beginPath();
        // context.arc(0, 0, 50, 0, Math.PI * 2);
        // context.fill();
        //##############################End of the circle###############
    };
};

canvasSketch(sketch, settings);