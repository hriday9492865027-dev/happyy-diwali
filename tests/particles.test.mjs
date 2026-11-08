import test from "node:test";
import assert from "node:assert/strict";

function createMockParticle(x, y, angle, speed, maxLife) {
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    gravity: 0.12,
    drag: 0.965,
    life: 0,
    maxLife,
    alpha: 1,
  };
}

function updateParticle(p) {
  p.life++;
  p.vx *= p.drag;
  p.vy = p.vy * p.drag + p.gravity;
  p.x += p.vx;
  p.y += p.vy;
  p.alpha = Math.max(0, 1 - p.life / p.maxLife);
}

test("particle initializes with positive velocity and full opacity", () => {
  const p = createMockParticle(100, 100, 0, 5, 50);
  assert.equal(p.x, 100);
  assert.equal(p.y, 100);
  assert.equal(p.vx, 5);
  assert.equal(p.alpha, 1);
});

test("particle decelerates with drag and falls with gravity", () => {
  const p = createMockParticle(100, 100, 0, 10, 50);
  updateParticle(p);
  assert.ok(p.vx < 10, "Horizontal velocity should reduce due to aerodynamic drag");
  assert.ok(p.vy > 0, "Vertical velocity should increase downwards due to gravity");
  assert.ok(p.alpha < 1, "Opacity should begin decaying over particle lifespan");
});

test("particle opacity reaches zero at maximum lifetime", () => {
  const p = createMockParticle(100, 100, Math.PI / 2, 5, 10);
  for (let i = 0; i < 10; i++) {
    updateParticle(p);
  }
  assert.equal(p.life, 10);
  assert.equal(p.alpha, 0);
});
