class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.life = 1000;
    this.maxLife = 1000;
    this.size = 3;
    this.color = '#ffffff';
    this.alpha = 1;
    this.blendMode = 'lighter';
    this.gravity = 0;
    this.shrink = true;
    this.active = false;
    this.type = 'circle';
    this.rotation = 0;
    this.rotationSpeed = 0;
  }

  update(dt) {
    this.x += this.vx * dt / 16;
    this.y += this.vy * dt / 16;
    this.vy += this.gravity * dt / 16;
    this.life -= dt;
    this.rotation += this.rotationSpeed * dt / 16;
    
    if (this.shrink) {
      this.alpha = Math.max(0, this.life / this.maxLife);
    }
    
    if (this.life <= 0) {
      this.active = false;
    }
  }

  draw(ctx) {
    if (!this.active) return;
    
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.globalCompositeOperation = this.blendMode;
    ctx.fillStyle = this.color;
    
    if (this.type === 'circle') {
      const size = this.shrink ? this.size * this.alpha : this.size;
      ctx.beginPath();
      ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'square') {
      const size = this.shrink ? this.size * this.alpha : this.size;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillRect(-size / 2, -size / 2, size, size);
    } else if (this.type === 'line') {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.vx * 2, this.y - this.vy * 2);
      ctx.stroke();
    }
    
    ctx.restore();
  }
}

const ParticleEmitters = {
  explosion: {
    count: 30,
    speedMin: 2,
    speedMax: 6,
    lifeMin: 300,
    lifeMax: 800,
    sizeMin: 2,
    sizeMax: 6,
    colors: ['#ff6600', '#ffaa00', '#ffffff', '#ff3300'],
    blendMode: 'lighter',
    gravity: 0,
    type: 'circle'
  },
  bigExplosion: {
    count: 80,
    speedMin: 3,
    speedMax: 10,
    lifeMin: 500,
    lifeMax: 1200,
    sizeMin: 3,
    sizeMax: 10,
    colors: ['#ff6600', '#ffaa00', '#ffffff', '#ff3300', '#ffff00'],
    blendMode: 'lighter',
    gravity: 0,
    type: 'circle'
  },
  bulletTrail: {
    count: 1,
    speedMin: 0,
    speedMax: 0,
    lifeMin: 100,
    lifeMax: 200,
    sizeMin: 2,
    sizeMax: 3,
    colors: ['#00f0ff'],
    blendMode: 'lighter',
    gravity: 0,
    type: 'circle'
  },
  shieldHit: {
    count: 20,
    speedMin: 1,
    speedMax: 3,
    lifeMin: 200,
    lifeMax: 500,
    sizeMin: 2,
    sizeMax: 5,
    colors: ['#00aaff', '#00f0ff', '#ffffff'],
    blendMode: 'lighter',
    gravity: 0,
    type: 'circle'
  },
  powerupPickup: {
    count: 15,
    speedMin: 1,
    speedMax: 4,
    lifeMin: 300,
    lifeMax: 600,
    sizeMin: 2,
    sizeMax: 4,
    colors: ['#ffff00', '#ffcc00', '#ffffff'],
    blendMode: 'lighter',
    gravity: 0,
    type: 'circle'
  },
  engineTrail: {
    count: 2,
    speedMin: 0.5,
    speedMax: 2,
    lifeMin: 150,
    lifeMax: 300,
    sizeMin: 2,
    sizeMax: 4,
    colors: ['#00aaff', '#00f0ff', '#ffffff'],
    blendMode: 'lighter',
    gravity: 0,
    type: 'circle'
  },
  graze: {
    count: 5,
    speedMin: 0.5,
    speedMax: 2,
    lifeMin: 200,
    lifeMax: 400,
    sizeMin: 2,
    sizeMax: 3,
    colors: ['#ff0066', '#ff6699'],
    blendMode: 'lighter',
    gravity: 0,
    type: 'circle'
  },
  shockwave: {
    count: 1,
    speedMin: 0,
    speedMax: 0,
    lifeMin: 500,
    lifeMax: 500,
    sizeMin: 10,
    sizeMax: 10,
    colors: ['#00f0ff'],
    blendMode: 'lighter',
    gravity: 0,
    type: 'shockwave'
  }
};

class ParticleManager {
  constructor(maxParticles = 500) {
    this.pool = new ObjectPool(
      () => new Particle(),
      null,
      Math.floor(maxParticles * 0.5)
    );
    this.maxParticles = maxParticles;
  }

  emit(x, y, config) {
    const count = Math.min(config.count, this.maxParticles - this.pool.count);
    
    for (let i = 0; i < count; i++) {
      const p = this.pool.get();
      if (!p) break;
      
      p.x = x;
      p.y = y;
      
      const angle = Utils.random(0, Math.PI * 2);
      const speed = Utils.random(config.speedMin, config.speedMax);
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      
      p.life = Utils.random(config.lifeMin, config.lifeMax);
      p.maxLife = p.life;
      p.size = Utils.random(config.sizeMin, config.sizeMax);
      p.color = Utils.pickRandom(config.colors);
      p.blendMode = config.blendMode || 'lighter';
      p.gravity = config.gravity || 0;
      p.shrink = config.shrink !== false;
      p.type = config.type || 'circle';
      p.alpha = 1;
      p.rotation = Utils.random(0, Math.PI * 2);
      p.rotationSpeed = Utils.random(-0.1, 0.1);
    }
  }

  emitDirectional(x, y, angle, spread, config) {
    const count = Math.min(config.count, this.maxParticles - this.pool.count);
    
    for (let i = 0; i < count; i++) {
      const p = this.pool.get();
      if (!p) break;
      
      p.x = x;
      p.y = y;
      
      const a = angle + Utils.random(-spread / 2, spread / 2);
      const speed = Utils.random(config.speedMin, config.speedMax);
      p.vx = Math.cos(a) * speed;
      p.vy = Math.sin(a) * speed;
      
      p.life = Utils.random(config.lifeMin, config.lifeMax);
      p.maxLife = p.life;
      p.size = Utils.random(config.sizeMin, config.sizeMax);
      p.color = Utils.pickRandom(config.colors);
      p.blendMode = config.blendMode || 'lighter';
      p.gravity = config.gravity || 0;
      p.shrink = config.shrink !== false;
      p.type = config.type || 'circle';
      p.alpha = 1;
    }
  }

  update(dt) {
    this.pool.forEach((p) => {
      p.update(dt);
      if (p.life <= 0) {
        this.pool.release(p);
      }
    });
  }

  draw(ctx) {
    this.pool.forEach((p) => p.draw(ctx));
  }

  clear() {
    this.pool.releaseAll();
  }
}
