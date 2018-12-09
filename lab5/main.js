let active = false;
let points = [];
const formated = [];
const M = 50;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('mousemove', (ev) => {
  if (!active) {
    return;
  }
  
  const { x: previousX, y: previousY } = points[points.length - 1];
  currentX = ev.clientX - canvas.offsetLeft;
  currentY = ev.clientY - canvas.offsetTop;
  points.push({x: currentX, y: currentY});

  ctx.beginPath();
  ctx.moveTo(previousX, previousY);
  ctx.lineTo(currentX, currentY);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.closePath();
}, false);

canvas.addEventListener('mousedown', (ev) => {
  currentX = ev.clientX - canvas.offsetLeft;
  currentY = ev.clientY - canvas.offsetTop;
  
  points.push({x: currentX, y: currentY});
  active = true;

  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(currentX, currentY, 1, 1);
  ctx.closePath();
}, false);

canvas.addEventListener('mouseup', (ev) => {
  active = false;
  // formated.push(formatPoints());
  // console.log(formated.length);
  console.log(JSON.stringify(formatPoints().reduce((acc, point) => acc.concat(point), [])))
  points = [];
}, false);

canvas.addEventListener('mouseout', (ev) => {
  active = false;
  points = [];
  // console.log(JSON.stringify(formated));
}, false);

const formatPoints = () => {
  const meanX = points.reduce((acc, {x}) => acc + x, 0) / points.length;
  const meanY = points.reduce((acc, {y}) => acc + y, 0) / points.length;
  const centeredPoints = points.map(({x, y}) => ({x: x - meanX, y: y - meanY}));
  const maxX = Math.max(...centeredPoints.map(({x}) => Math.abs(x)));
  const maxY = Math.max(...centeredPoints.map(({y}) => Math.abs(y)));
  const maxByAxis = Math.max(maxX, maxY);
  const normalizedPoints = centeredPoints.map(({x, y}) => ({x: x / maxByAxis, y: y / maxByAxis}));
  const offset = normalizedPoints.length / (M - 1);
  const representativePoints = Array.from({length: M}).map((_, i) => {
    const index = Math.floor(i * offset);
    const firstValue = normalizedPoints[Math.min(index, points.length - 1)];
    const secondValue = normalizedPoints[Math.min(index + 1, points.length - 1)];
    const alpha = i * offset - index;
    return [
      firstValue.x * (1 - alpha) + secondValue.x * alpha,
      firstValue.y * (1 - alpha) + secondValue.y * alpha
    ]
  });
  return representativePoints;
}
