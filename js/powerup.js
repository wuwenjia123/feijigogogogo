const POWERUP_TYPES = {
  POWERUP: {
    id: 'POWERUP',
    name: '武器升级',
    color: '#ffcc00',
    glowColor: '#ffff00',
    letter: 'P',
    effect: 'weaponUpgrade'
  },
  SHIELD: {
    id: 'SHIELD',
    name: '护盾',
    color: '#00aaff',
    glowColor: '#00f0ff',
    letter: 'S',
    effect: 'shield'
  },
  BOMB: {
    id: 'BOMB',
    name: '炸弹',
    color: '#ff3300',
    glowColor: '#ff6600',
    letter: 'B',
    effect: 'bomb'
  },
  HEAL: {
    id: 'HEAL',
    name: '回血',
    color: '#00ff88',
    glowColor: '#00ffaa',
    letter: 'H',
    effect: 'heal'
  },
  SCORE: {
    id: 'SCORE',
    name: '分数加成',
    color: '#ffdd00',
    glowColor: '#ffff66',
    letter: '$',
    effect: 'score'
  },
  WEAPON_SWITCH: {
    id: 'WEAPON_SWITCH',
    name: '武器切换',
    color: '#bf00ff',
    glowColor: '#ff00ff',
    letter: 'W',
    effect: 'weaponSwitch'
  }
};

class PowerUp {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 1.5;
    this.radius = 16;
    this.type = 'POWERUP';
    this.active = false;
    this.rotation = 0;
    this.bobPhase = 0;
    this.pulsePhase = 0;
    this.magnetRange = 100;
    this.magnetSpeed = 4;
  }

  update(dt, player) {
    this.rotation += dt * 0.003;
    this.bobPhase += dt * 0.005;
    this.pulsePhase += dt * 0.008;
    
    if (player && player.active) {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < this.magnetRange) {
        const pullStrength = (1 - dist / this.magnetRange) * this.magnetSpeed;
        this.vx += (dx / dist) * pullStrength * dt / 16;
        this.vy += (dy / dist) * pullStrength * dt / 16;
      }
    }
    
    this.vy += 0.005 * dt / 16;
    this.vy = Math.min(this.vy, 3);
    
    this.x += this.vx * dt / 16;
    this.y += this.vy * dt / 16;
    
    this.vx *= 0.98;
  }

  draw(ctx) {
    if (!this.active) return;
    
    const typeConfig = POWERUP_TYPES[this.type];
    const bobY = Math.sin(this.bobPhase) * 3;
    const pulse = 1 + Math.sin(this.pulsePhase) * 0.15;
    
    ctx.save();
    ctx.translate(this.x, this.y + bobY);
    ctx.rotate(this.rotation);
    
    ctx.globalCompositeOperation = 'lighter';
    ctx.shadowColor = typeConfig.glowColor;
    ctx.shadowBlur = 20 * pulse;
    
    ctx.fillStyle = typeConfig.color;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
      const r = this.radius * pulse;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.rotate(-this.rotation);
    ctx.fillText(typeConfig.letter, 0, 0);
    
    ctx.restore();
  }

  isOffScreen(height) {
    return this.y > height + 50;
  }
}

class PowerUpManager {
  constructor() {
    this.pool = new ObjectPool(
      () => new PowerUp(),
      null,
      20
    );
  }

  spawn(x, y, type) {
    const p = this.pool.get();
    if (!p) return null;
    
    p.x = x;
    p.y = y;
    p.vx = Utils.random(-1, 1);
    p.vy = Utils.random(0.5, 1.5);
    p.type = type;
    p.active = true;
    p.rotation = 0;
    p.bobPhase = Utils.random(0, Math.PI * 2);
    p.pulsePhase = Utils.random(0, Math.PI * 2);
    
    return p;
  }

  spawnRandom(x, y, dropRate = 0.1) {
    if (!Utils.chance(dropRate)) return null;
    
    const roll = Math.random();
    let type;
    
    if (roll < 0.35) {
      type = 'POWERUP';
    } else if (roll < 0.55) {
      type = 'SCORE';
    } else if (roll < 0.70) {
      type = 'SHIELD';
    } else if (roll < 0.82) {
      type = 'BOMB';
    } else if (roll < 0.92) {
      type = 'HEAL';
    } else {
      type = 'WEAPON_SWITCH';
    }
    
    return this.spawn(x, y, type);
  }

  update(dt, player, game) {
    this.pool.forEach((p) => {
      p.update(dt, player);
      
      if (player && player.active) {
        const dx = player.x - p.x;
        const dy = player.y - p.y;
        const distSq = dx * dx + dy * dy;
        const pickupRange = player.hitboxRadius + p.radius;
        
        if (distSq < pickupRange * pickupRange) {
          this.applyEffect(p, player, game);
          this.pool.release(p);
          return;
        }
      }
      
      if (p.isOffScreen(game.height)) {
        this.pool.release(p);
      }
    });
  }

  applyEffect(powerup, player, game) {
    const type = powerup.type;
    
    AudioManager.playPowerUp();
    
    game.particles.emit(powerup.x, powerup.y, {
      ...ParticleEmitters.powerupPickup,
      colors: [POWERUP_TYPES[type].color, POWERUP_TYPES[type].glowColor, '#ffffff']
    });
    
    switch (type) {
      case 'POWERUP':
        if (player.weaponLevel < 5) {
          player.weaponLevel++;
          game.ui.showMessage('武器升级! Lv.' + player.weaponLevel, '#ffcc00');
        } else {
          game.addScore(500);
          game.ui.showMessage('+500', '#ffcc00');
        }
        break;
        
      case 'SHIELD':
        player.shield = true;
        player.shieldTimer = 10000;
        game.ui.showMessage('护盾获得!', '#00aaff');
        break;
        
      case 'BOMB':
        if (game.bombs < 9) {
          game.bombs++;
          game.ui.showMessage('炸弹+1', '#ff3300');
        } else {
          game.addScore(1000);
        }
        break;
        
      case 'HEAL':
        if (player.hp < player.maxHp) {
          player.hp++;
          game.ui.showMessage('生命+1', '#00ff88');
        } else {
          game.addScore(1000);
        }
        break;
        
      case 'SCORE':
        game.scoreMultiplier = 2;
        game.scoreMultiplierTimer = 10000;
        game.ui.showMessage('分数 x2!', '#ffdd00');
        break;
        
      case 'WEAPON_SWITCH':
        const allOwned = (game && game.shop) ? game.shop.getAllWeaponsOwned() : ['LASER', 'SPREAD', 'MISSILE', 'PLASMA'];
        const ownedList = allOwned.length > 1 ? allOwned : ['LASER', 'SPREAD', 'MISSILE', 'PLASMA'];
        const curIdx = ownedList.indexOf(player.currentWeapon);
        const nxtIdx = ((curIdx < 0 ? 0 : curIdx) + 1) % ownedList.length;
        player.currentWeapon = ownedList[nxtIdx];
        player.updatePlasmaOrbs();
        player.weaponLevel = Math.max(1, player.weaponLevel - 1);
        const wname = (WEAPONS[player.currentWeapon] && WEAPONS[player.currentWeapon].name) || player.currentWeapon;
        game.ui.showMessage('武器切换: ' + wname, '#bf00ff');
        if (game.ui.updateWeapon) game.ui.updateWeapon();
        break;
    }
  }

  draw(ctx) {
    this.pool.forEach((p) => p.draw(ctx));
  }

  clear() {
    this.pool.releaseAll();
  }
}
