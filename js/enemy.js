const ENEMY_TYPES = {
  SCOUT: {
    name: '侦察机',
    hp: 1,
    width: 32,
    height: 32,
    speed: 2,
    score: 100,
    fireRate: 2000,
    color: '#ff6699',
    dropRate: 0.1
  },
  FIGHTER: {
    name: '战斗机',
    hp: 3,
    width: 40,
    height: 40,
    speed: 1.8,
    score: 300,
    fireRate: 1200,
    color: '#ff9933',
    dropRate: 0.15
  },
  BOMBER: {
    name: '轰炸机',
    hp: 8,
    width: 56,
    height: 48,
    speed: 1.2,
    score: 800,
    fireRate: 2500,
    color: '#cc66ff',
    dropRate: 0.25
  },
  ELITE: {
    name: '精英机',
    hp: 15,
    width: 50,
    height: 50,
    speed: 2.2,
    score: 2000,
    fireRate: 800,
    color: '#ff0066',
    dropRate: 0.4
  }
};

class Enemy {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 32;
    this.height = 32;
    this.hp = 1;
    this.maxHp = 1;
    this.speed = 2;
    this.type = 'SCOUT';
    this.score = 100;
    this.fireCooldown = 0;
    this.fireRate = 2000;
    this.pattern = 'straight';
    this.patternData = {};
    this.dropRate = 0.1;
    this.angle = Math.PI / 2;
    this.entryTime = 0;
    this.active = false;
    this.hitFlash = 0;
    this.color = '#ff6699';
    this.startX = 0;
    this.startY = 0;
  }

  init(type, x, y, pattern = 'straight', patternData = {}, difficulty = 1.0) {
    const config = ENEMY_TYPES[type];
    const hpMul = 1 + (difficulty - 1) * 0.6;
    const speedMul = 1 + (difficulty - 1) * 0.15;
    const fireRateMul = 1 - (difficulty - 1) * 0.12;
    const scoreMul = 1 + (difficulty - 1) * 0.3;
    
    this.type = type;
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.width = config.width;
    this.height = config.height;
    this.hp = Math.ceil(config.hp * hpMul);
    this.maxHp = Math.ceil(config.hp * hpMul);
    this.speed = config.speed * speedMul;
    this.score = Math.ceil(config.score * scoreMul);
    this.fireRate = Math.max(300, config.fireRate * fireRateMul);
    this.fireCooldown = Utils.random(500, this.fireRate);
    this.dropRate = Math.min(0.8, config.dropRate * (1 + (difficulty - 1) * 0.1));
    this.color = config.color;
    this.pattern = pattern;
    this.patternData = patternData;
    this.entryTime = 0;
    this.active = true;
    this.hitFlash = 0;
    this.angle = Math.PI / 2;
  }

  update(dt, game) {
    if (!this.active) return;
    
    this.entryTime += dt;
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    this.fireCooldown -= dt;
    
    this.updateMovement(dt, game);
    
    if (this.fireCooldown <= 0 && this.y > 0 && this.y < game.height * 0.7) {
      this.shoot(game);
      this.fireCooldown = this.fireRate + Utils.random(-200, 200);
    }
    
    if (this.y > game.height + 100 || this.y < -100) {
      this.active = false;
    }
  }

  updateMovement(dt, game) {
    const t = this.entryTime / 1000;
    const speed = this.speed * dt / 16;
    
    switch (this.pattern) {
      case 'straight':
        this.y += speed;
        break;
        
      case 'sine':
        const amplitude = this.patternData.amplitude || 80;
        const frequency = this.patternData.frequency || 2;
        this.y += speed;
        this.x = this.startX + Math.sin(t * frequency) * amplitude;
        break;
        
      case 'dive':
        if (this.entryTime < 1000) {
          this.y += speed * 1.5;
        } else if (this.entryTime < 2000) {
          this.y += speed * 0.3;
          this.x += Math.sin(t * 3) * 2;
        } else {
          this.y += speed * 1.5;
        }
        break;
        
      case 'zigzag':
        const zigzagPeriod = this.patternData.period || 2000;
        const zigzagWidth = this.patternData.width || 100;
        const phase = (this.entryTime % zigzagPeriod) / zigzagPeriod;
        this.y += speed;
        if (phase < 0.5) {
          this.x += (zigzagWidth / (zigzagPeriod / 2)) * dt / 16;
        } else {
          this.x -= (zigzagWidth / (zigzagPeriod / 2)) * dt / 16;
        }
        break;
        
      case 'chase':
        if (game.player && game.player.active) {
          const dx = game.player.x - this.x;
          const dist = Math.abs(dx);
          if (dist > 5) {
            this.x += (dx / dist) * speed * 0.5;
          }
        }
        this.y += speed * 0.7;
        break;
        
      case 'circle':
        const circleRadius = this.patternData.radius || 60;
        const circleSpeed = this.patternData.circleSpeed || 2;
        this.x = this.startX + Math.cos(t * circleSpeed) * circleRadius;
        this.y += speed * 0.5;
        break;
        
      default:
        this.y += speed;
    }
    
    this.x = Utils.clamp(this.x, this.width / 2, game.width - this.width / 2);
  }

  shoot(game) {
    if (!game.player || !game.player.active) return;
    
    switch (this.type) {
      case 'SCOUT':
        if (Utils.chance(0.3)) {
          game.bullets.spawnEnemyBulletAngle(
            this.x, this.y + this.height / 2,
            Math.PI / 2, 4,
            { color: this.color, radius: 4 }
          );
        }
        break;
        
      case 'FIGHTER':
        const spread = 0.3;
        for (let i = -1; i <= 1; i++) {
          game.bullets.spawnEnemyBulletAngle(
            this.x, this.y + this.height / 2,
            Math.PI / 2 + i * spread * 0.5,
            3.5,
            { color: this.color, radius: 4 }
          );
        }
        break;
        
      case 'BOMBER':
        for (let i = 0; i < 5; i++) {
          const angle = Math.PI / 2 + Utils.random(-0.4, 0.4);
          game.bullets.spawnEnemyBulletAngle(
            this.x + Utils.random(-this.width / 3, this.width / 3),
            this.y + this.height / 2,
            angle,
            Utils.random(2, 3),
            { color: this.color, radius: 6, type: 'ENEMY_BIG' }
          );
        }
        break;
        
      case 'ELITE':
        const pattern = Math.floor(this.entryTime / 3000) % 3;
        if (pattern === 0) {
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            game.bullets.spawnEnemyBulletAngle(
              this.x, this.y,
              angle, 2.5,
              { color: this.color, radius: 5 }
            );
          }
        } else if (pattern === 1) {
          const dx = game.player.x - this.x;
          const dy = game.player.y - this.y;
          const angle = Math.atan2(dy, dx);
          for (let i = -2; i <= 2; i++) {
            game.bullets.spawnEnemyBulletAngle(
              this.x, this.y + this.height / 2,
              angle + i * 0.15,
              5,
              { color: this.color, radius: 4 }
            );
          }
        } else {
          game.bullets.spawnEnemyBulletAngle(
            this.x, this.y + this.height / 2,
            Math.PI / 2, 3,
            { color: this.color, radius: 7, type: 'ENEMY_BIG' }
          );
        }
        break;
    }
  }

  takeDamage(amount, game) {
    this.hp -= amount;
    this.hitFlash = 100;
    
    game.player.addCharge(amount * 0.2);
    
    if (this.hp <= 0) {
      this.die(game);
      return true;
    }
    return false;
  }

  die(game) {
    this.active = false;
    
    game.addScore(this.score);
    game.addCombo();
    
    const explosionType = this.type === 'BOMBER' || this.type === 'ELITE' 
      ? ParticleEmitters.bigExplosion 
      : ParticleEmitters.explosion;
    game.particles.emit(this.x, this.y, explosionType);
    AudioManager.playExplosion();
    
    game.powerups.spawnRandom(this.x, this.y, this.dropRate);
    
    game.kills++;
  }

  draw(ctx) {
    if (!this.active) return;
    
    ctx.save();
    ctx.translate(this.x, this.y);
    
    if (this.hitFlash > 0) {
      ctx.globalAlpha = 0.5 + Math.sin(this.hitFlash * 0.1) * 0.5;
    }
    
    const w = this.width;
    const h = this.height;
    
    ctx.globalCompositeOperation = 'lighter';
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.7);
    glow.addColorStop(0, this.color + '40');
    glow.addColorStop(1, this.color + '00');
    ctx.fillStyle = glow;
    ctx.fillRect(-w * 0.7, -h * 0.7, w * 1.4, h * 1.4);
    
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = this.hitFlash > 0 ? '#ffffff' : this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    
    this.drawShape(ctx, w, h);
    
    if (this.hp < this.maxHp) {
      const hpBarWidth = w * 0.8;
      const hpBarHeight = 4;
      const hpPercent = this.hp / this.maxHp;
      
      ctx.fillStyle = '#330011';
      ctx.fillRect(-hpBarWidth / 2, -h / 2 - 10, hpBarWidth, hpBarHeight);
      ctx.fillStyle = this.color;
      ctx.fillRect(-hpBarWidth / 2, -h / 2 - 10, hpBarWidth * hpPercent, hpBarHeight);
    }
    
    ctx.restore();
  }

  drawShape(ctx, w, h) {
    switch (this.type) {
      case 'SCOUT':
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(-w / 3, 0);
        ctx.lineTo(-w / 4, -h / 3);
        ctx.lineTo(w / 4, -h / 3);
        ctx.lineTo(w / 3, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, h / 6, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        break;
        
      case 'FIGHTER':
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(-w / 2, 0);
        ctx.lineTo(-w / 3, -h / 4);
        ctx.lineTo(-w / 5, -h / 2);
        ctx.lineTo(w / 5, -h / 2);
        ctx.lineTo(w / 3, -h / 4);
        ctx.lineTo(w / 2, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        break;
        
      case 'BOMBER':
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(-w / 2, h / 4);
        ctx.lineTo(-w / 2.5, -h / 3);
        ctx.lineTo(-w / 5, -h / 2);
        ctx.lineTo(w / 5, -h / 2);
        ctx.lineTo(w / 2.5, -h / 3);
        ctx.lineTo(w / 2, h / 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#331144';
        for (let i = -1; i <= 1; i++) {
          ctx.fillRect(i * w / 4 - 4, -h / 6, 8, h / 3);
        }
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        break;
        
      case 'ELITE':
        ctx.rotate(Math.PI);
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
          const r = i % 2 === 0 ? w / 2 : w / 3;
          const px = Math.cos(angle) * r;
          const py = Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
  }
}

class EnemyManager {
  constructor() {
    this.pool = new ObjectPool(
      () => new Enemy(),
      null,
      50
    );
  }

  spawn(type, x, y, pattern, patternData, difficulty = 1.0) {
    const enemy = this.pool.get();
    if (!enemy) return null;
    enemy.init(type, x, y, pattern, patternData, difficulty);
    return enemy;
  }

  spawnFormation(type, formation, game, data = {}) {
    const enemies = [];
    const count = data.count || 5;
    const startX = data.startX !== undefined ? data.startX : game.width / 2;
    const startY = data.startY !== undefined ? data.startY : -50;
    const spacing = data.spacing || 60;
    const difficulty = data.difficulty || 1.0;
    
    switch (formation) {
      case 'line':
        for (let i = 0; i < count; i++) {
          const x = startX + (i - (count - 1) / 2) * spacing;
          enemies.push(this.spawn(type, x, startY - i * 20, 'straight', {}, difficulty));
        }
        break;
        
      case 'v_shape':
        for (let i = 0; i < count; i++) {
          const offset = Math.abs(i - (count - 1) / 2);
          const x = startX + (i - (count - 1) / 2) * spacing * 0.7;
          const y = startY - offset * 25;
          enemies.push(this.spawn(type, x, y, 'straight', {}, difficulty));
        }
        break;
        
      case 'pair':
        for (let i = 0; i < count; i++) {
          const side = i % 2 === 0 ? -1 : 1;
          const x = startX + side * (40 + Math.floor(i / 2) * 30);
          const y = startY - Math.floor(i / 2) * 80;
          const pattern = i % 2 === 0 ? 'sine' : 'sine';
          enemies.push(this.spawn(type, x, y, pattern, { 
            amplitude: 30, 
            frequency: 1.5 
          }, difficulty));
        }
        break;
        
      case 'rain':
        for (let i = 0; i < count; i++) {
          const x = Utils.random(50, game.width - 50);
          const y = startY - i * Utils.random(30, 80);
          const patterns = ['straight', 'sine', 'zigzag'];
          const pattern = Utils.pickRandom(patterns);
          enemies.push(this.spawn(type, x, y, pattern, {
            amplitude: Utils.random(30, 80),
            frequency: Utils.random(1, 2.5)
          }, difficulty));
        }
        break;
        
      default:
        for (let i = 0; i < count; i++) {
          enemies.push(this.spawn(type, startX + i * 50, startY, 'straight', {}, difficulty));
        }
    }
    
    return enemies;
  }

  update(dt, game) {
    this.pool.forEach((enemy) => {
      enemy.update(dt, game);
      if (!enemy.active) {
        this.pool.release(enemy);
      }
    });
  }

  draw(ctx) {
    this.pool.forEach((enemy) => enemy.draw(ctx));
  }

  clear() {
    this.pool.releaseAll();
  }
}
