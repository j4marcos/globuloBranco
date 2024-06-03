import { sendDirection } from "./index.js";

let controlX;
let controlY;

let lastDirection;
let direction;

const defineControlPosition = () => {
  controlX = window.innerWidth / 2;
  controlY = window.innerHeight / 2;
};

export const createControl = () => {
  defineControlPosition();
  const screenProtection = document.createElement("div");
  screenProtection.className = "screen-protection";
  document.body.appendChild(screenProtection);

  const point = document.createElement("div");
  point.className = "point";
  document.body.appendChild(point);

  const arrow = document.createElement("div");
  arrow.className = "arrow";
  document.body.appendChild(arrow);

  window.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const dx = x - controlX;
    const dy = y - controlY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.sqrt(dx * dx + dy * dy);
    arrow.style.top = controlY + Math.sin(angle) * 100 + "px";
    arrow.style.left = controlX + Math.cos(angle) * 100 + "px";
    direction = angle;
    arrow.style.rotate = angle + "rad";
  });

  window.addEventListener("resize", () => {
    defineControlPosition();
  });

  setInterval(() => {
    if (lastDirection != direction) sendDirection(direction);
    lastDirection = direction;
  }, 100);
};

