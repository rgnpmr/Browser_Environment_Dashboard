const canvas = document.getElementById("circleCanvas");
const ctx = canvas.getContext("2d");

let circles = [];
let selectedCircle = null;
let isDragging = false;
let offsetA, offsetB;

canvas.addEventListener("mousedown", function(e) {
    canvas.focus(); 
  
    const { a, b } = getMousePos(e);
    selectedCircle = null;
  
    for (let i = circles.length - 1; i >= 0; i--) {
      const c = circles[i];
      if (isInsideCircle(a, b, c)) {
        selectedCircle = c;
        offsetA = a-c.a;
        offsetB = b-c.b;
        isDragging = true;
        break;
      }
    }
  
    if (selectedCircle) {
      selectedCircle.color = "red";
    } else {
      circles.push({ a,b, radius: 20, color: "lightblue" });
    }
  
    redraw();
  });
  

canvas.addEventListener("mousemove", function(e) {
  if (isDragging && selectedCircle) {
    const { a,b } = getMousePos(e);
    selectedCircle.a = a-offsetA;
    selectedCircle.b = b-offsetB;
    redraw();
  }
});

canvas.addEventListener("mouseup", function() {
  isDragging = false;
  redraw();
});

canvas.addEventListener("wheel", function(e) {
  if (selectedCircle) {
    e.preventDefault();
    selectedCircle.radius += e.deltaY < 0 ? 2 : -2;
    if (selectedCircle.radius < 5) selectedCircle.radius = 5;
    redraw();
  }
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Delete" && selectedCircle) {
    circles = circles.filter(c => c !== selectedCircle);
    selectedCircle = null;
    redraw();
  }
});

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    a: evt.clientX - rect.left,
    b: evt.clientY - rect.top
  };
}

function isInsideCircle(a,b, circle) {
  const da = a- circle.a;
  const db = b- circle.b;
  return Math.sqrt(da * da + db * db) <= circle.radius;
}

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let c of circles) {
    ctx.beginPath();
    ctx.arc(c.a, c.b, c.radius, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
    ctx.stroke();
  }
}