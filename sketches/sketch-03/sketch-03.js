const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [1080, 1080],
  animate: true
};


/*const animate = () => {
    console.log("domestika");
    requestAnimationFrame(animate);
};
animate();*/

let pointColor = "purple";

const sketch = ({ context, width, height }) => {
  const agents = [];
  const agentsLenght = 40;

  for (let count = 0; count < agentsLenght; count++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    for (let count = 0; count < agents.length; count++) {
      const agent = agents[count];

      for (let countA = count + 1; countA < agents.length; countA++) {
        const other = agents[countA];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 200) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
      agent.wrap(width, height);
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

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.velocity = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }
  wrap(width, height) {
   if(this.pos.x > width) this.pos.x = 0;
   if(this.pos.x < 0) this.pos.x = width;
   if(this.pos.y > height) this.pos.y = 0;
   if(this.pos.y < 0) this.pos.y = height;
  }
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.velocity.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.velocity.y *= -1;
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }
  draw(context) {
    context.fillStyle = pointColor;
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
