const init = (config) => {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', 500)
  canvas.setAttribute('height', 500)
  document.body.appendChild(canvas);
  return canvas.getContext('2d');
};

const draw = (ctx, ball) => {
  const { clientWidth, clientHeight } = ctx.canvas;
  ctx.clearRect(0, 0, clientWidth, clientHeight);
  const { radius } = ball;
  const { x = radius, y = radius, vx, vy, a, ax } = ball;

  ball.y = (y + vy) < clientHeight ? parseInt(y + vy) : clientHeight;

  getNextStep = (prev, v, canvasEnd) => {
    if (v < 0) {
      const limit = radius
      const nextValue = (prev + v) > limit ? prev + v : limit;
      return parseInt(nextValue);
    }
    const limit = canvasEnd - radius
    const nextValue = (prev + v) < limit ? prev + v : limit;
    return parseInt(nextValue);
  };

  ball.x = getNextStep(x, vx, clientWidth);
  ball.y = getNextStep(y, vy, clientHeight);

  ball.vy = (vy + a);
  ball.vx = (vx + ax);


  const ballPath = new Path2D();
  ballPath.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
  ctx.fill(ballPath);

  ctx.font = 'bold 48px serif';
  ctx.fillText(vy, 300, 50);
  ctx.fillText(vx, 300, 150);

  if (ball.y >= clientHeight - radius) {
    ball.vy = - parseInt(vy * 0.75);
  }

  if (ball.x >= clientWidth - ball.radius
    || ball.x <= radius) {
    ball.vx = - parseInt(vx * 0.75);
  }
  window.requestAnimationFrame(() => draw(ctx, ball));
};

const app = () => {
  const ball = {
    radius: 50,
    vy: 1,
    vx: 15,
    ax: -0.05,
    x: undefined,
    y: undefined,
    a: 1.01,
  };
  const canvas = {
    width: 500,
    height: 500,
  };

  const ctx = init(canvas);
  draw(ctx, ball);
};

document.addEventListener('DOMContentLoaded', app);