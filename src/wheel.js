const canvasWidth = 320;
const canvasHeight = canvasWidth;

const originX = canvasWidth / 2;
const originY = canvasHeight / 2;

const radiusOuter = 150;
const diameterOuter = 2 * radiusOuter;

const radiusInner = 10;
const diameterInner = 2 * radiusInner;

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch");

  stroke(0);
  strokeWeight(2);

  innerCenterX = originX + valence;
  innerCenterY = originY - arousal;
}

function draw() {
  background(255);

  // Draw outer wheel
  ellipse(originX, originY, diameterOuter, diameterOuter);

  // Distance from mouse to center of inner marker
  distance = dist(mouseX, mouseY, innerCenterX, innerCenterY);

  if (distance < radiusInner) {
    overMarker = true;
  } else {
    overMarker = false;
  }

  // Draw inner marker
  ellipse(innerCenterX, innerCenterY, diameterInner, diameterInner);
}

function mousePressed() {
  xOffset = mouseX - innerCenterX;
  yOffset = mouseY - innerCenterY;
}

function mouseDragged() {
  if (overMarker) {
    innerCenterX = mouseX - xOffset;
    innerCenterY = mouseY - yOffset;

    // Compute valence and arousal to fit in [-50, 50] interval and
    // update values accordingly
    // TODO: Take diamter instead of canvasWidth
    valence = int((innerCenterX / canvasWidth) * 100 - 50);
    arousal = int(-((innerCenterY / canvasWidth) * 100 - 50));

    console.log("Valence:", valence);
    console.log("Arousal:", arousal);

    // Prevent default
    return false;
  }
}

// ----------
// Draw
// ----------

function drawLabels() {}

// ----------
// Utils
// ----------

function getPointOnCircle(origin, angle) {}
