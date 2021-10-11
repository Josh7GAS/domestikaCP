const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
    dimensions: [1080, 1080],
    animate: true
};

const animate = () => {
    console.log("domestika");
    requestAnimationFrame(animate);
};
//animate();

let pointColor = 'black';

const sketch = ({ context, width, height }) => {

    const agents = [];
    const agentsLenght = 40;

    for (let count = 0; count < agentsLenght; count++) {
        const x = random.range(0, width);
        const y = random.range(0, height);

        agents.push(new Agent(x, y));

    }

    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        agents.forEach(agent => {
            agent.update();
            agent.draw(context);
            agent.bounce(width, height);
        });

    };
};

canvasSketch(sketch, settings);

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;

    }
}

class Agent {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.velocity = new Vector(random.range(-1, 1), random.range(-1, 1));
        this.radius = random.range(4, 12);
    }
    bounce(width, height) {
        if (this.pos.x <= 0 || this.pos.x >= width) { this.velocity.x *= -1; }
        if (this.pos.y <= 0 || this.pos.y >= height) { this.velocity.y *= -1; }
    }

    update() {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
    }
    draw(context) {
        // context.fillStyle = pointColor;
        context.save();
        context.translate(this.pos.x, this.pos.y);

        context.lineWidth = 4;

        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();

        context.restore();
    }

}