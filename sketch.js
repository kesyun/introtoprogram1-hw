let t = 0;
let shapes = [];

function setup() {
  createCanvas(800, 800);
  noStroke();

  for (let i = 0; i < 10; i++) {
    shapes.push(new AbstractShape(random(width), random(height), random(20, 50), randomColor()));
  }
}

function draw() {
  background(20, 30, 50); 

  
  drawAbstractLines();

 
  for (let shape of shapes) {
    shape.update();
    shape.display();
  }


  drawDynamicArcs();

 
  fill(255, 255, 0);
  textSize(24);
  textAlign(LEFT, BOTTOM);
  text("Kesyun Wu", 20, height - 20);

  t++;
}


function drawAbstractLines() {
  stroke(200, 100, 50, 150);
  strokeWeight(2);
  for (let i = 0; i < 8; i++) {
    let x1 = random(width);
    let y1 = random(height);
    let x2 = x1 + sin(t * 0.02 + i) * 100;
    let y2 = y1 + cos(t * 0.02 + i) * 100;
    line(x1, y1, x2, y2);
  }
}


function drawDynamicArcs() {
  noFill();
  stroke(100, 200, 255);
  strokeWeight(3);
  let spacing = 30;
  for (let i = 0; i < 6; i++) {
    let angleOffset = sin(t * 0.03 + i) * PI / 4;
    arc(width / 2, height / 2, spacing * (i + 3), spacing * (i + 3), angleOffset, angleOffset + PI / 2);
  }
}


function randomColor() {
  return color(random(200, 255), random(100, 200), random(50, 150));
}

// AbstractShape class
class AbstractShape {
  constructor(x, y, size, col) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.col = col;
    this.angle = random(TWO_PI);
    this.type = random(['circle', 'triangle', 'rect']);
  }

  update() {
    this.x += cos(this.angle) * 2;
    this.y += sin(this.angle) * 2;

  
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

   
    this.col = color(
      red(this.col) + random(-2, 2),
      green(this.col) + random(-2, 2),
      blue(this.col) + random(-2, 2)
    );
  }

  display() {
    fill(this.col);
    noStroke();

  
    if (this.type === 'circle') {
      ellipse(this.x, this.y, this.size);
    } else if (this.type === 'triangle') {
      let s = this.size / 2;
      triangle(this.x, this.y - s, this.x - s, this.y + s, this.x + s, this.y + s);
    } else if (this.type === 'rect') {
      rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
  }
}


