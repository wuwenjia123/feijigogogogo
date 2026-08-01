const Utils = {
  random(min, max) {
    return Math.random() * (max - min) + min;
  },

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  },

  distSq(x1, y1, x2, y2) {
    return (x2 - x1) ** 2 + (y2 - y1) ** 2;
  },

  angle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  },

  lerp(a, b, t) {
    return a + (b - a) * t;
  },

  clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  },

  map(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  },

  degToRad(deg) {
    return deg * Math.PI / 180;
  },

  radToDeg(rad) {
    return rad * 180 / Math.PI;
  },

  pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  hexToRgb(hex) {
    if (!hex) return { r: 0, g: 240, b: 255 };
    let h = hex.replace('#', '');
    if (h.length === 3) {
      h = h.split('').map(c => c + c).join('');
    }
    if (h.length !== 6) return { r: 0, g: 240, b: 255 };
    const num = parseInt(h, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  },

  chance(percent) {
    return Math.random() < percent;
  },

  formatNumber(num) {
    return num.toString().padStart(6, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
};

class ObjectPool {
  constructor(createFn, resetFn, initialSize = 50) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
    this.active = [];

    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn());
    }
  }

  get(...args) {
    const obj = this.pool.pop() || this.createFn();
    if (this.resetFn) {
      this.resetFn(obj, ...args);
    }
    obj.active = true;
    this.active.push(obj);
    return obj;
  }

  release(obj) {
    obj.active = false;
    const idx = this.active.indexOf(obj);
    if (idx > -1) {
      this.active.splice(idx, 1);
    }
    this.pool.push(obj);
  }

  releaseAll() {
    while (this.active.length > 0) {
      const obj = this.active.pop();
      obj.active = false;
      this.pool.push(obj);
    }
  }

  forEach(callback) {
    for (let i = this.active.length - 1; i >= 0; i--) {
      callback(this.active[i], i);
    }
  }

  get count() {
    return this.active.length;
  }
}

class SpatialGrid {
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cols = Math.ceil(width / cellSize);
    this.rows = Math.ceil(height / cellSize);
    this.grid = [];
    this.clear();
  }

  clear() {
    this.grid = [];
    for (let i = 0; i < this.cols * this.rows; i++) {
      this.grid.push([]);
    }
  }

  insert(obj) {
    const col = Math.floor(Utils.clamp(obj.x, 0, this.width - 1) / this.cellSize);
    const row = Math.floor(Utils.clamp(obj.y, 0, this.height - 1) / this.cellSize);
    const idx = row * this.cols + col;
    if (this.grid[idx]) {
      this.grid[idx].push(obj);
    }
  }

  getNearby(obj) {
    const result = [];
    const col = Math.floor(Utils.clamp(obj.x, 0, this.width - 1) / this.cellSize);
    const row = Math.floor(Utils.clamp(obj.y, 0, this.height - 1) / this.cellSize);

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const c = col + dx;
        const r = row + dy;
        if (c >= 0 && c < this.cols && r >= 0 && r < this.rows) {
          const idx = r * this.cols + c;
          if (this.grid[idx]) {
            result.push(...this.grid[idx]);
          }
        }
      }
    }
    return result;
  }
}
