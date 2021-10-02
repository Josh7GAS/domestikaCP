const canvasSketch = require('canvas-sketch');

const settings = {
    dimensions: [1080, 1080]

};

const sketch = () => {
    return ({ context, width, height }) => {

        //sketch_page_beg
        context.fillStyle = 'black';
        context.strokeStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;
        //sketch_page_end

        //drawning_beg
        const w = width * 0.10;
        const h = height * 0.10;
        const gap = width * 0.03;
        const ix = width * 0.17;
        const iy = height * 0.17;

        const off = width * 0.02;

        let x, y;

        for (let count = 0; count < 5; count++) {
            for (let countA = 0; countA < 5; countA++) {
                //draw_margin_beg
                let x = ix + (w + gap) * count;
                let y = iy + (h + gap) * countA;
                //draw_margin_end

                context.beginPath(); //begin the path
                context.rect(x, y, w, h); //where to drawn it
                context.stroke(); //Draw on it
                //the border inside the squares
                if (Math.random() > 0.5) {
                    context.beginPath();
                    context.rect(x + 8, y + 8, w - 16, h - 16);
                    context.stroke();
                }


            }

        }

    }; //drawning_end
};

canvasSketch(sketch, settings);