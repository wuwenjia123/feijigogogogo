const Input = {
  mouse: { x: 0, y: 0, down: false, pressed: false, released: false },
  keys: {},
  keyPressed: {},
  keyReleased: {},
  touch: { active: false, x: 0, y: 0, startX: 0, startY: 0 },
  canvas: null,

  init(canvas) {
    this.canvas = canvas;

    window.addEventListener('keydown', (e) => {
      if (!this.keys[e.code]) {
        this.keyPressed[e.code] = true;
      }
      this.keys[e.code] = true;
      
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
      this.keyReleased[e.code] = true;
    });

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      this.mouse.x = (e.clientX - rect.left) * scaleX;
      this.mouse.y = (e.clientY - rect.top) * scaleY;
    });

    canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.mouse.down = true;
        this.mouse.pressed = true;
      }
    });

    canvas.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        this.mouse.down = false;
        this.mouse.released = true;
      }
    });

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      this.touch.active = true;
      this.touch.x = (touch.clientX - rect.left) * scaleX;
      this.touch.y = (touch.clientY - rect.top) * scaleY;
      this.touch.startX = this.touch.x;
      this.touch.startY = this.touch.y;
      this.mouse.x = this.touch.x;
      this.mouse.y = this.touch.y;
      this.mouse.down = true;
      this.mouse.pressed = true;
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      this.touch.x = (touch.clientX - rect.left) * scaleX;
      this.touch.y = (touch.clientY - rect.top) * scaleY;
      this.mouse.x = this.touch.x;
      this.mouse.y = this.touch.y;
    }, { passive: false });

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.touch.active = false;
      this.mouse.down = false;
      this.mouse.released = true;
    }, { passive: false });

    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  },

  update() {
    this.mouse.pressed = false;
    this.mouse.released = false;
    this.keyPressed = {};
    this.keyReleased = {};
  },

  isKeyDown(code) {
    return !!this.keys[code];
  },

  isKeyPressed(code) {
    return !!this.keyPressed[code];
  },

  getMovementX() {
    let x = 0;
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) x -= 1;
    if (this.keys['ArrowRight'] || this.keys['KeyD']) x += 1;
    return x;
  },

  getMovementY() {
    let y = 0;
    if (this.keys['ArrowUp'] || this.keys['KeyW']) y -= 1;
    if (this.keys['ArrowDown'] || this.keys['KeyS']) y += 1;
    return y;
  }
};
