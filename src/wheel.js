const canvasWidth = 360;
const canvasHeight = canvasWidth;

const originX = canvasWidth / 2;
const originY = canvasHeight / 2;

const radiusOuter = 150;
const diameterOuter = 2 * radiusOuter;

const outerMarginX = (canvasWidth - diameterOuter) / 2;
const outerMarginY = (canvasHeight - diameterOuter) / 2;

const radiusInner = 10;
const diameterInner = 2 * radiusInner;

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch");

  stroke(0);
  strokeWeight(2);

  innerCenterX = originX;
  innerCenterY = originY;
}

function draw() {
  // Draw on "clean" white canvas
  background(255);

  // Draw outer wheel (static)
  ellipse(originX, originY, diameterOuter, diameterOuter);

  // Draw inner marker (dynamic)
  ellipse(innerCenterX, innerCenterY, diameterInner, diameterInner);

  // Distance from mouse to center of inner marker
  distance = dist(mouseX, mouseY, innerCenterX, innerCenterY);

  if (distance < radiusInner) {
    overMarker = true;
  } else {
    overMarker = false;
  }
}

function mousePressed() {
  xOffset = mouseX - innerCenterX;
  yOffset = mouseY - innerCenterY;
}

function mouseDragged() {
  if (overMarker) {
    const newCenterX = mouseX - xOffset;
    const newCenterY = mouseY - yOffset;

    if (isPointOnCircle(newCenterX, newCenterY)) {
      innerCenterX = newCenterX;
      innerCenterY = newCenterY;

      // Compute valence and arousal to fit in [-50, 50] interval and
      // update values accordingly
      valence = int(((innerCenterX - outerMarginX) / diameterOuter) * 100 - 50);
      arousal = int(
        -(((innerCenterY - outerMarginY) / diameterOuter) * 100 - 50)
      );
    }
  }

  // Prevent default
  return false;
}

// ----------
// Draw
// ----------

function drawLabels() {}

// ----------
// Utils
// ----------

function isPointOnCircle(pointX, pointY) {
  return (
    Math.pow(pointX - originX, 2) + Math.pow(pointY - originY, 2) <
    Math.pow(radiusOuter, 2)
  );
}
