(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "bgCanvas";
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "-1",
    pointerEvents: "none",
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const cubes = [];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createCube() {
    return {
      x: rand(0, W),
      y: rand(H, H + 300),
      size: rand(10, 80),
      speed: rand(0.2, 1.5),
      rotation: rand(0, Math.PI * 2),
      rotSpeed: rand(0.002, 0.015) * (Math.random() < 0.5 ? 1 : -1),
      opacity: rand(0.1, 0.5),
      drift: rand(-0.4, 0.4),
    };
  }

  // --- 立方体の数を設定・変更する関数 ---
  function setCubeCount(n) {
    while (cubes.length < n) {
      const c = createCube();
      c.y = rand(-100, H + 100);
      cubes.push(c);
    }
    while (cubes.length > n) {
      cubes.pop();
    }
  }

  // 初期数（ここを変えるだけで数を調整可能）
  const INITIAL_COUNT = 40;
  setCubeCount(INITIAL_COUNT);

  // 外部からも変更可能にする
  window.setCubeCount = setCubeCount;

  function drawCube(c) {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rotation);
    ctx.globalAlpha = c.opacity;

    const s = c.size / 2;
    // 前面
    ctx.strokeStyle = "rgba(21, 173, 193, 0.7)";
    ctx.fillStyle = "rgba(21, 173, 193, 0.12)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.rect(-s, -s, c.size, c.size);
    ctx.fill();
    ctx.stroke();

    // 奥行き風のオフセット
    const off = c.size * 0.3;
    ctx.strokeStyle = "rgba(21, 173, 193, 0.45)";
    ctx.fillStyle = "rgba(21, 173, 193, 0.06)";
    ctx.beginPath();
    ctx.rect(-s + off, -s - off, c.size, c.size);
    ctx.fill();
    ctx.stroke();

    // 接続線（4隅）
    ctx.strokeStyle = "rgba(21, 173, 193, 0.3)";
    ctx.beginPath();
    ctx.moveTo(-s, -s);
    ctx.lineTo(-s + off, -s - off);
    ctx.moveTo(s, -s);
    ctx.lineTo(s + off, -s - off);
    ctx.moveTo(s, s);
    ctx.lineTo(s + off, s - off);
    ctx.moveTo(-s, s);
    ctx.lineTo(-s + off, s - off);
    ctx.stroke();

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < cubes.length; i++) {
      const c = cubes[i];
      c.y -= c.speed;
      c.x += c.drift;
      c.rotation += c.rotSpeed;

      // 画面外に出たらリセット
      if (c.y < -c.size * 2) {
        Object.assign(c, createCube());
        c.y = H + c.size;
      }

      drawCube(c);
    }

    requestAnimationFrame(animate);
  }

  animate();
})();
