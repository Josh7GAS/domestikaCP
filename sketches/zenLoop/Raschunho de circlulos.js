context.save();
context.translate(x, y);
context.rotate(-angle);
context.scale(randomRange(0.1, 2), random.range(0.2, 0.5));

context.beginPath();
context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
context.fill();
context.restore();

//################## Creating a Circle##########################
//save state 

//restore the state

// context.translate(100, 400);

// context.beginPath();
// context.arc(0, 0, 50, 0, Math.PI * 2);
// context.fill();
//##############################End of the circle###############