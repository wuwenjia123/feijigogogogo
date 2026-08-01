class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 4;
    this.damage = 1;
    this.color = '#00f0ff';
    this.type = 'NORMAL';
    this.isPlayer = true;
    this.life = 0;
    this.maxLife = 5000;
    this.target = null;
    this.pierce = 0;
    this.active = false;
    this.trailTimer = 0;
    this.homingStrength = 0;
    this.angle = 0;
    this.size = 4;
    this.hitEnemies = [];
    this.gravity = 0;
    this.burn = false;
    this.instakillChance = 0;
    this.trail = false;
    this.beam = false;
    this.lance = false;
    this._trailAccum = 0;
  }

  update(dt, game) {
    if (this.type === 'MISSILE' && this.target && this.target.hp > 0) {
      const targetAngle = Utils.angle(this.x, this.y, this.target.x, this.target.y);
      const currentAngle = Math.atan2(this.vy, this.vx);
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      
      let angleDiff = targetAngle - currentAngle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      
      const turnRate = this.homingStrength * dt / 16;
      const newAngle = currentAngle + Utils.clamp(angleDiff, -turnRate, turnRate);
      
      this.vx = Math.cos(newAngle) * speed;
      this.vy = Math.sin(newAngle) * speed;
    }
    
    if (this.gravity) {
      this.vy += this.gravity * dt / 16;
    }
    
    this.x += this.vx * dt / 16;
    this.y += this.vy * dt / 16;
    this.life += dt;
    this.angle = Math.atan2(this.vy, this.vx);
    
    if (this.isPlayer && game && game.particles && this.type !== 'FLAME') {
      const trailInterval = this.trail ? 8 : 30;
      this._trailAccum += dt;
      if (this._trailAccum >= trailInterval) {
        this._trailAccum = 0;
        const count = this.trail ? (this.lance ? 3 : 2) : 1;
        for (let i = 0; i < count; i++) {
          game.particles.emit(
            this.x + Utils.random(-2, 2),
            this.y + Utils.random(-2, 2),
            {
              count: 1,
              speedMin: 0,
              speedMax: 0,
              lifeMin: this.trail ? 120 : 80,
              lifeMax: this.trail ? 220 : 180,
              sizeMin: this.trail ? (this.lance ? 3 : 2.5) : 2,
              sizeMax: this.trail ? (this.lance ? 5 : 4) : 3,
              colors: [this.color],
              blendMode: 'lighter',
              vx: 0, vy: 0
            }
          );
        }
      }
    }
    
    if (this.life >= this.maxLife) {
      this.active = false;
    }
  }

  draw(ctx) {
    if (!this.active) return;
    
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    
    if (this.type === 'LASER') {
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.fillRect(this.x - this.size / 2, this.y - 15, this.size, 30);
    } else if (this.type === 'RAILGUN') {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 25;
      const w = this.size + 2;
      const h = 90;
      const grad = ctx.createLinearGradient(this.x, this.y - h / 2, this.x, this.y + h / 2);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(0.2, this.color);
      grad.addColorStop(0.5, '#ffffff');
      grad.addColorStop(0.8, this.color);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(this.x - w / 2 - 2, this.y - h / 2, w + 4, h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(this.x - 1, this.y - h / 2, 2, h);
    } else if (this.type === 'FLAME') {
      const lifeRatio = 1 - this.life / this.maxLife;
      const r = Math.max(3, this.radius * (1.2 + lifeRatio * 2.0));
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.2, '#fff4a8');
      grad.addColorStop(0.45, '#ff8822');
      grad.addColorStop(0.75, this.color);
      grad.addColorStop(1, 'rgba(180,20,0,0)');
      ctx.globalAlpha = 0.65 + lifeRatio * 0.3;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'VOID_LANCE') {
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle + Math.PI / 2);
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 28;
      const len = 36;
      const wid = 10;
      const grad = ctx.createLinearGradient(0, -len / 2, 0, len / 2);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.2, '#eeccff');
      grad.addColorStop(0.55, this.color);
      grad.addColorStop(1, 'rgba(80,0,180,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -len / 2);
      ctx.lineTo(wid * 0.45, -len * 0.1);
      ctx.lineTo(wid * 0.2, len / 2);
      ctx.lineTo(-wid * 0.2, len / 2);
      ctx.lineTo(-wid * 0.45, -len * 0.1);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, -len / 2);
      ctx.lineTo(0, len * 0.3);
      ctx.stroke();
    } else if (this.type === 'MISSILE') {
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle + Math.PI / 2);
      
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.lineTo(-4, 6);
      ctx.lineTo(4, 6);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'PLASMA') {
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'ENEMY_BIG') {
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }
}

class BulletManager {
  constructor() {
    this.playerBullets = new ObjectPool(
      () => new Bullet(),
      null,
      100
    );
    this.enemyBullets = new ObjectPool(
      () => new Bullet(),
      null,
      300
    );
  }

  spawnPlayerBullet(x, y, vx, vy, config = {}) {
    const b = this.playerBullets.get();
    if (!b) return null;
    
    b.x = x;
    b.y = y;
    b.vx = vx;
    b.vy = vy;
    b.isPlayer = true;
    b.damage = config.damage || 1;
    b.color = config.color || '#00f0ff';
    b.type = config.type || 'NORMAL';
    b.radius = config.radius || 4;
    b.size = config.size || 4;
    b.maxLife = config.maxLife || 3000;
    b.life = 0;
    b.pierce = config.pierce || 0;
    b.homingStrength = config.homingStrength || 0;
    b.target = config.target || null;
    b.hitEnemies = [];
    b.gravity = config.gravity || 0;
    b.burn = config.burn || false;
    b.instakillChance = config.instakillChance || 0;
    b.trail = config.trail || false;
    b.beam = config.beam || false;
    b.lance = config.lance || false;
    b._trailAccum = 0;
    
    return b;
  }

  spawnEnemyBullet(x, y, vx, vy, config = {}) {
    const b = this.enemyBullets.get();
    if (!b) return null;
    
    b.x = x;
    b.y = y;
    b.vx = vx;
    b.vy = vy;
    b.isPlayer = false;
    b.damage = config.damage || 1;
    b.color = config.color || '#ff0066';
    b.type = config.type || 'NORMAL';
    b.radius = config.radius || 4;
    b.size = config.size || 4;
    b.maxLife = config.maxLife || 8000;
    b.life = 0;
    b.hitEnemies = [];
    
    return b;
  }

  spawnEnemyBulletAngle(x, y, angle, speed, config = {}) {
    return this.spawnEnemyBullet(
      x, y,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
      config
    );
  }

  update(dt, game) {
    this.playerBullets.forEach((b) => {
      b.update(dt, game);
      if (b.life >= b.maxLife || b.y < -50 || b.y > game.height + 50 || 
          b.x < -50 || b.x > game.width + 50) {
        this.playerBullets.release(b);
      }
    });
    
    this.enemyBullets.forEach((b) => {
      b.update(dt, game);
      if (b.life >= b.maxLife || b.y < -50 || b.y > game.height + 50 ||
          b.x < -50 || b.x > game.width + 50) {
        this.enemyBullets.release(b);
      }
    });
  }

  draw(ctx) {
    this.playerBullets.forEach((b) => b.draw(ctx));
    this.enemyBullets.forEach((b) => b.draw(ctx));
  }

  clear() {
    this.playerBullets.releaseAll();
    this.enemyBullets.releaseAll();
  }

  clearEnemyBullets() {
    this.enemyBullets.releaseAll();
  }
}
