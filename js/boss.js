const BOSS_DATA = {
  skyScout: {
    name: '天鹰号',
    maxHp: 1500,
    width: 160,
    height: 120,
    color: '#4a90d9',
    score: 3000,
    phases: [
      { hpPercent: [1.0, 0.6], patterns: ['spread', 'summon'], patternDuration: 5500, moveSpeed: 0.8 },
      { hpPercent: [0.6, 0.0], patterns: ['spiral', 'charge'], patternDuration: 4500, moveSpeed: 1.2 }
    ]
  },
  neonRaider: {
    name: '霓虹突袭者',
    maxHp: 2200,
    width: 180,
    height: 130,
    color: '#00f0ff',
    score: 4000,
    phases: [
      { hpPercent: [1.0, 0.65], patterns: ['spread', 'summon'], patternDuration: 5000, moveSpeed: 1 },
      { hpPercent: [0.65, 0.3], patterns: ['spiral', 'laserCharge'], patternDuration: 4200, moveSpeed: 1.4 },
      { hpPercent: [0.3, 0.0], patterns: ['bulletHell', 'tracker'], patternDuration: 3200, moveSpeed: 1.8, enraged: true }
    ]
  },
  sandWyrm: {
    name: '沙蝎巨虫',
    maxHp: 2800,
    width: 190,
    height: 140,
    color: '#d4854a',
    score: 4500,
    phases: [
      { hpPercent: [1.0, 0.65], patterns: ['spread', 'summon'], patternDuration: 4800, moveSpeed: 1 },
      { hpPercent: [0.65, 0.3], patterns: ['spiral', 'laserCharge'], patternDuration: 4000, moveSpeed: 1.5 },
      { hpPercent: [0.3, 0.0], patterns: ['bulletHell', 'charge', 'tracker'], patternDuration: 3200, moveSpeed: 1.9, enraged: true }
    ]
  },
  dataCore: {
    name: '数据核心',
    maxHp: 3400,
    width: 195,
    height: 145,
    color: '#bf00ff',
    score: 5500,
    phases: [
      { hpPercent: [1.0, 0.7], patterns: ['spread', 'summon'], patternDuration: 4600, moveSpeed: 1.1 },
      { hpPercent: [0.7, 0.35], patterns: ['spiral', 'laserCharge'], patternDuration: 3800, moveSpeed: 1.6 },
      { hpPercent: [0.35, 0.0], patterns: ['bulletHell', 'tracker', 'charge'], patternDuration: 3000, moveSpeed: 2, enraged: true }
    ]
  },
  frostTitan: {
    name: '寒霜泰坦',
    maxHp: 4000,
    width: 200,
    height: 150,
    color: '#88ccff',
    score: 6000,
    phases: [
      { hpPercent: [1.0, 0.65], patterns: ['spread', 'summon'], patternDuration: 4500, moveSpeed: 1.1 },
      { hpPercent: [0.65, 0.3], patterns: ['spiral', 'laserCharge'], patternDuration: 3700, moveSpeed: 1.6 },
      { hpPercent: [0.3, 0.0], patterns: ['bulletHell', 'charge', 'tracker'], patternDuration: 2900, moveSpeed: 2.1, enraged: true }
    ]
  },
  voidCarrier: {
    name: '虚空母舰',
    maxHp: 4800,
    width: 200,
    height: 150,
    color: '#00ff88',
    score: 7000,
    phases: [
      { hpPercent: [1.0, 0.7], patterns: ['spread', 'summon'], patternDuration: 4300, moveSpeed: 1.2 },
      { hpPercent: [0.7, 0.35], patterns: ['spiral', 'laserCharge'], patternDuration: 3500, moveSpeed: 1.7 },
      { hpPercent: [0.35, 0.0], patterns: ['bulletHell', 'charge', 'tracker'], patternDuration: 2800, moveSpeed: 2.2, enraged: true }
    ]
  },
  starDevourer: {
    name: '噬星者',
    maxHp: 5800,
    width: 210,
    height: 160,
    color: '#88aaff',
    score: 8500,
    phases: [
      { hpPercent: [1.0, 0.7], patterns: ['spread', 'summon'], patternDuration: 4000, moveSpeed: 1.3 },
      { hpPercent: [0.7, 0.35], patterns: ['spiral', 'laserCharge'], patternDuration: 3300, moveSpeed: 1.8 },
      { hpPercent: [0.35, 0.0], patterns: ['bulletHell', 'tracker', 'charge'], patternDuration: 2600, moveSpeed: 2.4, enraged: true }
    ]
  },
  apocalypse: {
    name: '启示录·终焉',
    maxHp: 7500,
    width: 220,
    height: 170,
    color: '#ff3366',
    score: 12000,
    phases: [
      { hpPercent: [1.0, 0.75], patterns: ['spread', 'summon'], patternDuration: 3800, moveSpeed: 1.4 },
      { hpPercent: [0.75, 0.45], patterns: ['spiral', 'laserCharge'], patternDuration: 3100, moveSpeed: 1.9 },
      { hpPercent: [0.45, 0.0], patterns: ['bulletHell', 'charge', 'tracker'], patternDuration: 2400, moveSpeed: 2.6, enraged: true }
    ]
  }
};

const BossPatterns = {
  spread(boss, dt, game) {
    boss.patternTimer += dt;
    if (boss.patternTimer >= 600) {
      boss.patternTimer = 0;
      const bulletCount = 7 + boss.currentPhase * 3;
      const spreadAngle = Math.PI / 3;
      const startAngle = Math.PI / 2 - spreadAngle / 2;
      
      for (let i = 0; i < bulletCount; i++) {
        const angle = startAngle + (spreadAngle / (bulletCount - 1)) * i;
        game.bullets.spawnEnemyBulletAngle(
          boss.x, boss.y + boss.height / 2,
          angle, 3,
          { color: boss.color, radius: 5 }
        );
      }
      AudioManager.playShoot();
    }
  },

  summon(boss, dt, game) {
    boss.patternTimer += dt;
    if (boss.patternTimer >= 4000) {
      boss.patternTimer = 0;
      const count = 2 + boss.currentPhase;
      for (let i = 0; i < count; i++) {
        const x = boss.x + (i - (count - 1) / 2) * 80;
        game.enemies.spawn('SCOUT', x, boss.y + boss.height / 2, 'dive');
      }
    }
  },

  spiral(boss, dt, game) {
    boss.spiralAngle = (boss.spiralAngle || 0) + dt * 0.004;
    boss.patternTimer += dt;
    
    if (boss.patternTimer >= 80) {
      boss.patternTimer = 0;
      const arms = 3 + boss.currentPhase;
      for (let i = 0; i < arms; i++) {
        const angle = boss.spiralAngle + (i * Math.PI * 2 / arms);
        game.bullets.spawnEnemyBulletAngle(
          boss.x, boss.y,
          angle, 3.5,
          { color: boss.color, radius: 5 }
        );
      }
    }
  },

  laserCharge(boss, dt, game) {
    boss.patternTimer += dt;
    
    if (!boss.laserCharging) {
      boss.laserCharging = true;
      boss.laserAngle = Math.PI / 2;
      boss.laserChargeTime = 1500;
      boss.laserTimer = 0;
      boss.laserState = 'charging';
    }
    
    if (boss.laserState === 'charging') {
      boss.laserTimer += dt;
      if (boss.laserTimer >= boss.laserChargeTime) {
        boss.laserState = 'firing';
        boss.laserTimer = 0;
        boss.laserDuration = 2000;
        AudioManager.playLaser();
      }
    } else if (boss.laserState === 'firing') {
      boss.laserTimer += dt;
      boss.laserAngle += dt * 0.001 * (boss.currentPhase > 0 ? 1 : 0.5);
      
      if (Math.random() < 0.3) {
        game.bullets.spawnEnemyBulletAngle(
          boss.x + Math.cos(boss.laserAngle) * 100,
          boss.y + boss.height / 2 + Math.sin(boss.laserAngle) * 100,
          boss.laserAngle, 8,
          { color: '#ff3366', radius: 6, type: 'ENEMY_BIG' }
        );
      }
      
      if (boss.laserTimer >= boss.laserDuration) {
        boss.laserState = 'charging';
        boss.laserTimer = 0;
        boss.laserChargeTime = 1000 + Math.random() * 1000;
      }
    }
  },

  bulletHell(boss, dt, game) {
    boss.patternTimer += dt;
    boss.hellAngle = (boss.hellAngle || 0) + dt * 0.002;
    
    if (boss.patternTimer >= 120) {
      boss.patternTimer = 0;
      
      const rings = 2;
      for (let r = 0; r < rings; r++) {
        const bulletCount = 12 + r * 6;
        const offset = r * 0.2;
        for (let i = 0; i < bulletCount; i++) {
          const angle = boss.hellAngle + offset + (i / bulletCount) * Math.PI * 2;
          const speed = 2 + r;
          game.bullets.spawnEnemyBulletAngle(
            boss.x, boss.y + boss.height / 3,
            angle, speed,
            { color: r === 0 ? boss.color : '#ff6699', radius: 4 }
          );
        }
      }
    }
  },

  charge(boss, dt, game) {
    boss.patternTimer += dt;
    
    if (!boss.chargeState) {
      boss.chargeState = 'preparing';
      boss.chargeTimer = 0;
      boss.chargeDuration = 1000;
      boss.chargeTargetX = game.player ? game.player.x : game.width / 2;
    }
    
    if (boss.chargeState === 'preparing') {
      boss.chargeTimer += dt;
      if (boss.chargeTimer >= boss.chargeDuration) {
        boss.chargeState = 'charging';
        boss.chargeTimer = 0;
        boss.chargeDuration = 800;
        game.screenShake = 5;
      }
    } else if (boss.chargeState === 'charging') {
      boss.chargeTimer += dt;
      const dx = boss.chargeTargetX - boss.x;
      boss.x += (dx / Math.abs(dx || 1)) * 6 * dt / 16;
      
      if (boss.chargeTimer >= boss.chargeDuration) {
        boss.chargeState = 'recovering';
        boss.chargeTimer = 0;
        boss.chargeDuration = 1500;
      }
    } else if (boss.chargeState === 'recovering') {
      boss.chargeTimer += dt;
      if (boss.chargeTimer >= boss.chargeDuration) {
        boss.chargeState = null;
        boss.patternTimer = boss.patternDuration;
      }
    }
  },

  tracker(boss, dt, game) {
    boss.patternTimer += dt;
    
    if (boss.patternTimer >= 1000) {
      boss.patternTimer = 0;
      
      const count = 2 + boss.currentPhase;
      for (let i = 0; i < count; i++) {
        const x = boss.x + (i - (count - 1) / 2) * 60;
        const angle = game.player ? Utils.angle(x, boss.y + boss.height / 2, game.player.x, game.player.y) : Math.PI / 2;
        
        const bullet = game.bullets.spawnEnemyBulletAngle(
          x, boss.y + boss.height / 2,
          angle, 2.5,
          { 
            color: '#ffcc00', 
            radius: 6, 
            type: 'ENEMY_BIG',
            maxLife: 5000
          }
        );
        
        if (bullet && game.player) {
          bullet.target = game.player;
          bullet.homingStrength = 0.02;
          bullet.update = function(dt, game) {
            if (this.target && this.target.active && this.life < 2000) {
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
            
            this.x += this.vx * dt / 16;
            this.y += this.vy * dt / 16;
            this.life += dt;
            
            if (this.life >= this.maxLife) this.active = false;
          };
        }
      }
    }
  }
};

class Boss {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 200;
    this.height = 150;
    this.hp = 1000;
    this.maxHp = 1000;
    this.currentPhase = 0;
    this.phases = [];
    this.phaseTimer = 0;
    this.patternIndex = 0;
    this.patternTimer = 0;
    this.patternDuration = 5000;
    this.isEnraged = false;
    this.entryAnimation = true;
    this.entryTimer = 0;
    this.xTarget = 0;
    this.yTarget = 0;
    this.active = false;
    this.hitFlash = 0;
    this.color = '#ff0066';
    this.name = 'BOSS';
    this.score = 5000;
    this.moveSpeed = 1;
    this.moveDirection = 1;
    this.bossData = null;
    this.defeated = false;
  }

  init(bossId, game) {
    const data = BOSS_DATA[bossId];
    if (!data) return;
    
    this.bossData = data;
    this.name = data.name;
    this.maxHp = data.maxHp;
    this.hp = data.maxHp;
    this.width = data.width;
    this.height = data.height;
    this.color = data.color;
    this.score = data.score;
    this.phases = data.phases;
    this.currentPhase = 0;
    this.active = true;
    this.entryAnimation = true;
    this.entryTimer = 0;
    this.x = game.width / 2;
    this.y = -this.height;
    this.xTarget = game.width / 2;
    this.yTarget = 120;
    this.hitFlash = 0;
    this.patternIndex = 0;
    this.patternTimer = 0;
    this.defeated = false;
    this.spiralAngle = 0;
    this.hellAngle = 0;
    this.laserCharging = false;
    this.chargeState = null;
    
    this.updatePhase();
    
    game.ui.showBossWarning();
    AudioManager.playWarning();
  }

  update(dt, game) {
    if (!this.active) return;
    
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    
    if (this.entryAnimation) {
      this.entryTimer += dt;
      this.y = Utils.lerp(-this.height, this.yTarget, Math.min(1, this.entryTimer / 2000));
      
      if (this.entryTimer >= 2000) {
        this.entryAnimation = false;
        this.patternTimer = 0;
        game.ui.showBossHp(this);
      }
      return;
    }
    
    const hpPercent = this.hp / this.maxHp;
    const phase = this.phases[this.currentPhase];
    
    if (phase && hpPercent < phase.hpPercent[1] && this.currentPhase < this.phases.length - 1) {
      this.currentPhase++;
      this.updatePhase();
      game.screenShake = 20;
      game.particles.emit(this.x, this.y, ParticleEmitters.bigExplosion);
      AudioManager.playBossExplosion();
      
      game.powerups.spawn(this.x, this.y, 'POWERUP');
      if (this.currentPhase >= 2) {
        game.powerups.spawn(this.x - 30, this.y, 'SHIELD');
        game.powerups.spawn(this.x + 30, this.y, 'BOMB');
      }
    }
    
    this.updateMovement(dt, game);
    
    const currentPhaseData = this.phases[this.currentPhase];
    if (currentPhaseData) {
      this.patternTimer += dt;
      
      if (this.patternTimer >= this.patternDuration) {
        this.patternTimer = 0;
        this.patternIndex = (this.patternIndex + 1) % currentPhaseData.patterns.length;
        this.laserCharging = false;
        this.chargeState = null;
      }
      
      const patternName = currentPhaseData.patterns[this.patternIndex];
      const patternFn = BossPatterns[patternName];
      if (patternFn) {
        patternFn(this, dt, game);
      }
    }
  }

  updatePhase() {
    const phase = this.phases[this.currentPhase];
    if (phase) {
      this.patternDuration = phase.patternDuration;
      this.moveSpeed = phase.moveSpeed;
      this.isEnraged = !!phase.enraged;
      this.patternIndex = 0;
      this.patternTimer = 0;
    }
  }

  updateMovement(dt, game) {
    this.x += this.moveDirection * this.moveSpeed * dt / 16;
    
    if (this.x < this.width / 2 + 20) {
      this.x = this.width / 2 + 20;
      this.moveDirection = 1;
    }
    if (this.x > game.width - this.width / 2 - 20) {
      this.x = game.width - this.width / 2 - 20;
      this.moveDirection = -1;
    }
    
    this.y = this.yTarget + Math.sin(Date.now() * 0.001) * 15;
  }

  takeDamage(amount, game) {
    if (!this.active || this.defeated) return false;
    
    this.hp -= amount;
    this.hitFlash = 80;
    
    game.player.addCharge(amount * 0.1);
    
    game.ui.updateBossHp(this);
    
    if (this.hp <= 0) {
      this.die(game);
      return true;
    }
    return false;
  }

  die(game) {
    this.defeated = true;
    this.active = false;
    
    game.addScore(this.score);
    game.screenShake = 40;
    AudioManager.playBossExplosion();
    
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        if (!game || !game.particles) return;
        const ex = this.x + Utils.random(-this.width / 2, this.width / 2);
        const ey = this.y + Utils.random(-this.height / 2, this.height / 2);
        game.particles.emit(ex, ey, ParticleEmitters.bigExplosion);
      }, i * 150);
    }
    
    game.powerups.spawn(this.x, this.y, 'HEAL');
    game.powerups.spawn(this.x - 40, this.y, 'POWERUP');
    game.powerups.spawn(this.x + 40, this.y, 'POWERUP');
    
    setTimeout(() => {
      if (game) {
        game.levelComplete();
      }
    }, 3000);
  }

  draw(ctx) {
    if (!this.active) return;
    
    ctx.save();
    ctx.translate(this.x, this.y);
    
    if (this.hitFlash > 0) {
      ctx.globalAlpha = 0.5 + Math.sin(this.hitFlash * 0.2) * 0.5;
    }
    
    const w = this.width;
    const h = this.height;
    
    ctx.globalCompositeOperation = 'lighter';
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.8);
    glow.addColorStop(0, this.color + '30');
    glow.addColorStop(1, this.color + '00');
    ctx.fillStyle = glow;
    ctx.fillRect(-w * 0.8, -h * 0.8, w * 1.6, h * 1.6);
    
    ctx.globalCompositeOperation = 'source-over';
    
    const fillColor = this.hitFlash > 0 ? '#ffffff' : this.color;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(-w / 4, h / 3);
    ctx.lineTo(-w / 2, h / 5);
    ctx.lineTo(-w / 2.5, -h / 4);
    ctx.lineTo(-w / 4, -h / 3);
    ctx.lineTo(-w / 6, -h / 2);
    ctx.lineTo(w / 6, -h / 2);
    ctx.lineTo(w / 4, -h / 3);
    ctx.lineTo(w / 2.5, -h / 4);
    ctx.lineTo(w / 2, h / 5);
    ctx.lineTo(w / 4, h / 3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#1a0a1a';
    ctx.beginPath();
    ctx.moveTo(-w / 5, -h / 4);
    ctx.lineTo(-w / 6, h / 4);
    ctx.lineTo(w / 6, h / 4);
    ctx.lineTo(w / 5, -h / 4);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#ff0033';
    ctx.shadowColor = '#ff0033';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    for (let i = -2; i <= 2; i++) {
      if (i === 0) continue;
      const ex = i * w / 5;
      const ey = h / 4;
      ctx.fillStyle = '#ff6600';
      ctx.shadowColor = '#ff6600';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(ex, ey, 6 + Math.sin(Date.now() * 0.01 + i) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    
    if (this.isEnraged) {
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20);
      ctx.setLineDash([]);
    }
    
    ctx.restore();
  }
}
