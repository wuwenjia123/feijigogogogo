const WEAPONS = {
  LASER: {
    name: '激光炮',
    color: '#00f0ff',
    baseDamage: 10,
    baseFireRate: 150,
    bulletSpeed: 12,
    levels: [
      { bulletCount: 1, damage: 10, fireRate: 150 },
      { bulletCount: 1, damage: 15, fireRate: 130 },
      { bulletCount: 3, damage: 10, fireRate: 140 },
      { bulletCount: 5, damage: 10, fireRate: 130, spread: 0.15 },
      { bulletCount: 5, damage: 12, fireRate: 110, spread: 0.15, pierce: 2 }
    ]
  },
  SPREAD: {
    name: '散弹',
    color: '#ffcc00',
    baseDamage: 4,
    baseFireRate: 200,
    bulletSpeed: 10,
    levels: [
      { bulletCount: 3, damage: 4, fireRate: 200, spread: 0.3 },
      { bulletCount: 5, damage: 4, fireRate: 190, spread: 0.35 },
      { bulletCount: 5, damage: 6, fireRate: 180, spread: 0.4 },
      { bulletCount: 7, damage: 6, fireRate: 170, spread: 0.45 },
      { bulletCount: 9, damage: 7, fireRate: 150, spread: 0.5 }
    ]
  },
  MISSILE: {
    name: '导弹',
    color: '#ff6600',
    baseDamage: 15,
    baseFireRate: 500,
    bulletSpeed: 6,
    levels: [
      { bulletCount: 1, damage: 15, fireRate: 500, homing: 0.05 },
      { bulletCount: 2, damage: 12, fireRate: 450, homing: 0.06 },
      { bulletCount: 3, damage: 12, fireRate: 400, homing: 0.07 },
      { bulletCount: 4, damage: 14, fireRate: 380, homing: 0.08 },
      { bulletCount: 6, damage: 16, fireRate: 350, homing: 0.1 }
    ]
  },
  PLASMA: {
    name: '等离子',
    color: '#bf00ff',
    baseDamage: 3,
    baseFireRate: 100,
    bulletSpeed: 0,
    levels: [
      { count: 1, damage: 3, radius: 50 },
      { count: 2, damage: 3, radius: 55 },
      { count: 3, damage: 4, radius: 60 },
      { count: 4, damage: 5, radius: 65 },
      { count: 6, damage: 6, radius: 70 }
    ]
  },
  EMP: {
    name: '磁暴波',
    color: '#00ff88',
    baseDamage: 50,
    baseFireRate: 3000,
    bulletSpeed: 0,
    charge: { max: 100, regen: 25, start: 0 },
    levels: [
      { damage: 50, radius: 150, cooldown: 5000, fireRate: 3000 },
      { damage: 70, radius: 180, cooldown: 4500, fireRate: 3000 },
      { damage: 100, radius: 220, cooldown: 4000, fireRate: 3000 },
      { damage: 130, radius: 260, cooldown: 3500, fireRate: 3000 },
      { damage: 180, radius: 300, cooldown: 3000, fireRate: 3000 }
    ]
  },
  RAILGUN: {
    name: '轨道炮',
    color: '#ffccff',
    baseDamage: 50,
    baseFireRate: 600,
    bulletSpeed: 25,
    levels: [
      { bulletCount: 1, damage: 50, fireRate: 650, pierce: 10, beam: true },
      { bulletCount: 1, damage: 60, fireRate: 620, pierce: 12, beam: true },
      { bulletCount: 2, damage: 55, fireRate: 600, pierce: 12, beam: true },
      { bulletCount: 2, damage: 65, fireRate: 580, pierce: 14, beam: true },
      { bulletCount: 3, damage: 75, fireRate: 550, pierce: 16, beam: true }
    ]
  },
  FLAMETHROWER: {
    name: '火焰喷射器',
    color: '#ff5522',
    baseDamage: 5,
    baseFireRate: 50,
    bulletSpeed: 8,
    levels: [
      { bulletCount: 3, damage: 5, fireRate: 60, spread: 0.3, maxLife: 350, burn: true },
      { bulletCount: 4, damage: 5, fireRate: 55, spread: 0.35, maxLife: 380, burn: true },
      { bulletCount: 5, damage: 6, fireRate: 50, spread: 0.4, maxLife: 420, burn: true },
      { bulletCount: 6, damage: 7, fireRate: 45, spread: 0.45, maxLife: 460, burn: true },
      { bulletCount: 8, damage: 8, fireRate: 40, spread: 0.5, maxLife: 500, burn: true }
    ]
  },
  VOID_LANCE: {
    name: '虚空长矛',
    color: '#8800ff',
    baseDamage: 120,
    baseFireRate: 700,
    bulletSpeed: 18,
    levels: [
      { bulletCount: 1, damage: 120, fireRate: 750, instakillChance: 0.05, pierce: 5, lance: true },
      { bulletCount: 1, damage: 140, fireRate: 720, instakillChance: 0.07, pierce: 6, lance: true },
      { bulletCount: 2, damage: 130, fireRate: 700, instakillChance: 0.08, pierce: 6, lance: true },
      { bulletCount: 2, damage: 155, fireRate: 680, instakillChance: 0.1, pierce: 7, lance: true },
      { bulletCount: 3, damage: 180, fireRate: 650, instakillChance: 0.15, pierce: 8, lance: true }
    ]
  }
};

class Player {
  constructor() {
    this.x = 240;
    this.y = 700;
    this.width = 48;
    this.height = 64;
    this.speed = 6;
    this.hitboxRadius = 3;
    this.currentWeapon = 'LASER';
    this.weaponLevel = 1;
    this.hp = 3;
    this.maxHp = 3;
    this.shield = false;
    this.shieldTimer = 0;
    this.invincible = false;
    this.invincibleTimer = 0;
    this.fireCooldown = 0;
    this.skillCooldown = 0;
    this.charge = 0;
    this.maxCharge = 100;
    this.chargeRegen = 20;
    this._chargeInited = false;
    this.active = true;
    this.visualX = 240;
    this.visualY = 700;
    this.tiltAngle = 0;
    this.engineParticleTimer = 0;
    this.plasmaOrbs = [];
    this.plasmaAngle = 0;
  }

  init(game) {
    this.x = game.width / 2;
    this.y = game.height - 100;
    this.visualX = this.x;
    this.visualY = this.y;
    this.active = true;
    this.hp = this.maxHp;
    this.shield = false;
    this.shieldTimer = 0;
    this.invincible = true;
    this.invincibleTimer = 2000;
    this.weaponLevel = 1;
    this.currentWeapon = 'LASER';
    this.charge = 0;
    this.plasmaOrbs = [];
    this.updatePlasmaOrbs();
  }

  update(dt, game) {
    if (!this.active) return;
    
    let moveX = 0;
    let moveY = 0;
    
    if (Input.touch.active || Input.mouse.down) {
      const targetX = Input.mouse.x;
      const targetY = Input.mouse.y;
      const dx = targetX - this.x;
      const dy = targetY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 2) {
        const moveSpeed = Math.min(this.speed * 1.5, dist);
        moveX = (dx / dist) * moveSpeed;
        moveY = (dy / dist) * moveSpeed;
      }
      this.tiltAngle = Utils.clamp(dx / 50, -0.3, 0.3);
    } else {
      moveX = Input.getMovementX() * this.speed;
      moveY = Input.getMovementY() * this.speed;
      this.tiltAngle = Utils.lerp(this.tiltAngle, Input.getMovementX() * 0.2, 0.1);
    }
    
    this.x += moveX * dt / 16;
    this.y += moveY * dt / 16;
    
    this.x = Utils.clamp(this.x, this.width / 2, game.width - this.width / 2);
    this.y = Utils.clamp(this.y, this.height / 2, game.height - this.height / 2);
    
    this.visualX = Utils.lerp(this.visualX, this.x, 0.3);
    this.visualY = Utils.lerp(this.visualY, this.y, 0.3);
    
    this.fireCooldown -= dt;
    // 磁暴波(EMP)是技能武器，需要充能后按 Space 释放，不参与自动开火；等离子球也不参与
    if (this.fireCooldown <= 0
        && this.currentWeapon !== 'PLASMA'
        && this.currentWeapon !== 'EMP') {
      this.shoot(game);
    }
    
    this.updatePlasma(dt, game);
    
    if (this.skillCooldown > 0) {
      this.skillCooldown -= dt;
    }
    
    if (this.charge < this.maxCharge) {
      const regen = this.chargeRegen || 20;
      const prevCharge = this.charge;
      this.charge = Math.min(this.maxCharge, this.charge + regen * dt / 1000);
      // EMP 刚充满电的瞬间：给玩家一个「可以释放了」的视听提示
      if (this.currentWeapon === 'EMP' && prevCharge < this.maxCharge && this.charge >= this.maxCharge) {
        // 短促上滑音：叮铃~
        try {
          if (typeof AudioManager !== 'undefined' && AudioManager.initialized) {
            const ctx = AudioManager.ctx;
            const t = ctx.currentTime;
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, t);
            osc.frequency.exponentialRampToValueAtTime(1400, t + 0.18);
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(0.4 * AudioManager.sfxVolume, t + 0.02);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
            osc.connect(g).connect(AudioManager.sfxGain);
            osc.start(t); osc.stop(t + 0.3);
          }
        } catch (e) { /* ignore */ }
        // 屏幕轻微闪烁提示
        if (game && game.boss !== undefined) {
          game.screenShake = Math.max(game.screenShake || 0, 3);
        }
      }
      if (game && game.ui && game.ui.updateEnergy) game.ui.updateEnergy();
    }
    
    if (this.invincible) {
      this.invincibleTimer -= dt;
      if (this.invincibleTimer <= 0) {
        this.invincible = false;
      }
    }
    
    if (this.shield) {
      this.shieldTimer -= dt;
      if (this.shieldTimer <= 0) {
        this.shield = false;
      }
    }
    
    this.engineParticleTimer += dt;
    if (this.engineParticleTimer >= 30) {
      this.engineParticleTimer = 0;
      game.particles.emitDirectional(
        this.x, this.y + this.height / 2 - 5,
        Math.PI / 2, 0.3,
        ParticleEmitters.engineTrail
      );
    }
    
    if (Input.isKeyPressed('Space') || (Input.touch.active && this.charge >= this.maxCharge)) {
      this.useSkill(game);
    }
    
    for (let i = 1; i <= 8; i++) {
      if (Input.isKeyPressed('Digit' + i)) {
        const weapons = ['LASER', 'SPREAD', 'MISSILE', 'PLASMA', 'EMP', 'RAILGUN', 'FLAMETHROWER', 'VOID_LANCE'];
        if (weapons[i - 1]) {
          const wId = weapons[i - 1];
          if (game && game.shop && game.shop.isWeaponOwned(wId)) {
            this.currentWeapon = wId;
            this.applyChargeConfig();
            this.updatePlasmaOrbs();
            game.ui.updateWeapon();
          }
        }
      }
    }
  }

  applyChargeConfig() {
    const w = WEAPONS[this.currentWeapon];
    if (w && w.charge) {
      this.maxCharge = w.charge.max || 100;
      this.chargeRegen = w.charge.regen || 20;
      if (this.charge > this.maxCharge) this.charge = this.maxCharge;
    } else {
      this.maxCharge = 100;
      this.chargeRegen = 20;
    }
  }

  shoot(game) {
    const weapon = WEAPONS[this.currentWeapon];
    const level = weapon.levels[Math.min(this.weaponLevel - 1, weapon.levels.length - 1)];
    const stats = this.shipStats || {};
    const fireRateMul = stats.fireRateMul || 1.0;
    const damageMul = stats.damageMul || 1.0;
    
    this.fireCooldown = Math.max(30, level.fireRate / fireRateMul);
    
    AudioManager.playShoot();
    
    if (this.currentWeapon === 'LASER') {
      const count = level.bulletCount;
      const spread = level.spread || 0;
      
      for (let i = 0; i < count; i++) {
        let angle = -Math.PI / 2;
        if (count > 1) {
          angle += (i - (count - 1) / 2) * spread;
        }
        
        const offsetX = count > 1 ? (i - (count - 1) / 2) * 10 : 0;
        
        game.bullets.spawnPlayerBullet(
          this.x + offsetX, this.y - this.height / 2,
          Math.cos(angle) * weapon.bulletSpeed,
          Math.sin(angle) * weapon.bulletSpeed,
          {
            damage: Math.ceil(level.damage * damageMul),
            color: weapon.color,
            type: 'LASER',
            size: 3,
            pierce: level.pierce || 0
          }
        );
      }
    } else if (this.currentWeapon === 'RAILGUN') {
      const count = level.bulletCount;
      for (let i = 0; i < count; i++) {
        const offsetX = count > 1 ? (i - (count - 1) / 2) * 22 : 0;
        game.bullets.spawnPlayerBullet(
          this.x + offsetX, this.y - this.height / 2,
          0, -weapon.bulletSpeed,
          {
            damage: Math.ceil(level.damage * damageMul),
            color: weapon.color,
            type: 'RAILGUN',
            size: 5,
            pierce: level.pierce || 10,
            trail: true
          }
        );
      }
    } else if (this.currentWeapon === 'VOID_LANCE') {
      const count = level.bulletCount;
      const spread = count > 1 ? 0.15 : 0;
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (count > 1 ? (i - (count - 1) / 2) * spread : 0);
        game.bullets.spawnPlayerBullet(
          this.x, this.y - this.height / 2,
          Math.cos(angle) * weapon.bulletSpeed,
          Math.sin(angle) * weapon.bulletSpeed,
          {
            damage: Math.ceil(level.damage * damageMul),
            color: weapon.color,
            type: 'VOID_LANCE',
            radius: 8,
            pierce: level.pierce || 5,
            instakillChance: level.instakillChance || 0,
            trail: true
          }
        );
      }
    } else if (this.currentWeapon === 'FLAMETHROWER') {
      const count = level.bulletCount;
      const spread = level.spread;
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (i - (count - 1) / 2) * (spread / (count - 1 || 1));
        const speed = weapon.bulletSpeed + Math.random() * 2;
        game.bullets.spawnPlayerBullet(
          this.x, this.y - this.height / 2,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          {
            damage: Math.ceil(level.damage * damageMul),
            color: Math.random() > 0.5 ? '#ff5522' : '#ffcc00',
            type: 'FLAME',
            radius: 5 + Math.random() * 3,
            maxLife: level.maxLife,
            burn: true,
            gravity: 0.02
          }
        );
      }
    } else if (this.currentWeapon === 'SPREAD') {
      const count = level.bulletCount;
      const spread = level.spread;
      
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (i - (count - 1) / 2) * (spread / (count - 1 || 1));
        
        game.bullets.spawnPlayerBullet(
          this.x, this.y - this.height / 2 + 10,
          Math.cos(angle) * weapon.bulletSpeed,
          Math.sin(angle) * weapon.bulletSpeed,
          {
            damage: Math.ceil(level.damage * damageMul),
            color: weapon.color,
            radius: 4
          }
        );
      }
    } else if (this.currentWeapon === 'MISSILE') {
      const count = level.bulletCount;
      const target = this.findNearestEnemy(game);
      
      for (let i = 0; i < count; i++) {
        const offsetX = (i - (count - 1) / 2) * 15;
        
        game.bullets.spawnPlayerBullet(
          this.x + offsetX, this.y,
          0, -weapon.bulletSpeed,
          {
            damage: Math.ceil(level.damage * damageMul),
            color: weapon.color,
            type: 'MISSILE',
            radius: 5,
            homingStrength: level.homing,
            target: target,
            maxLife: 4000
          }
        );
      }
    } else if (this.currentWeapon === 'EMP') {
      if (this.charge >= this.maxCharge) {
        this.useSkill(game);
      }
    }
  }

  updatePlasma(dt, game) {
    if (this.currentWeapon !== 'PLASMA') return;
    
    this.plasmaAngle += dt * 0.003;
    const damageMul = (this.shipStats && this.shipStats.damageMul) ? this.shipStats.damageMul : 1.0;
    
    const weapon = WEAPONS.PLASMA;
    const level = weapon.levels[Math.min(this.weaponLevel - 1, weapon.levels.length - 1)];
    
    while (this.plasmaOrbs.length < level.count) {
      this.plasmaOrbs.push({
        angle: (this.plasmaOrbs.length / level.count) * Math.PI * 2,
        lastDamage: 0
      });
    }
    
    this.plasmaOrbs.forEach((orb, i) => {
      orb.angle += dt * 0.003;
      const orbX = this.x + Math.cos(orb.angle + this.plasmaAngle) * level.radius * 0.6;
      const orbY = this.y + Math.sin(orb.angle + this.plasmaAngle) * level.radius * 0.6;
      
      orb.x = orbX;
      orb.y = orbY;
      
      orb.lastDamage = (orb.lastDamage || 0) - dt;
      
      game.enemies.pool.forEach((enemy) => {
        if (!enemy.active) return;
        const dx = orbX - enemy.x;
        const dy = orbY - enemy.y;
        const distSq = dx * dx + dy * dy;
        const hitRange = 20 + enemy.width / 2;
        
        if (distSq < hitRange * hitRange && orb.lastDamage <= 0) {
          enemy.takeDamage(Math.ceil(level.damage * damageMul), game);
          orb.lastDamage = 200;
          
          game.particles.emit(orbX, orbY, {
            count: 5,
            speedMin: 1,
            speedMax: 3,
            lifeMin: 150,
            lifeMax: 300,
            sizeMin: 2,
            sizeMax: 4,
            colors: [weapon.color, '#ffffff'],
            blendMode: 'lighter'
          });
        }
      });
    });
  }

  updatePlasmaOrbs() {
    this.plasmaOrbs = [];
  }

  findNearestEnemy(game) {
    let nearest = null;
    let nearestDist = Infinity;
    
    game.enemies.pool.forEach((enemy) => {
      if (!enemy.active) return;
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < nearestDist) {
        nearestDist = distSq;
        nearest = enemy;
      }
    });
    
    if (game.boss && game.boss.active) {
      const dx = game.boss.x - this.x;
      const dy = game.boss.y - this.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < nearestDist) {
        nearest = game.boss;
      }
    }
    
    return nearest;
  }

  useSkill(game) {
    if (this.currentWeapon === 'EMP') {
      // 能量不足：给用户明确的反馈，而不是静默失败
      if (this.charge < this.maxCharge) {
        try {
          if (typeof AudioManager !== 'undefined' && AudioManager.initialized) {
            // 短促的"不可以"提示音（250Hz 两下方波）
            const ctx = AudioManager.ctx;
            const t = ctx.currentTime;
            const playTick = (startT) => {
              const o = ctx.createOscillator();
              const g = ctx.createGain();
              o.type = 'square';
              o.frequency.value = 230;
              g.gain.setValueAtTime(0.0001, startT);
              g.gain.exponentialRampToValueAtTime(0.2 * AudioManager.sfxVolume, startT + 0.008);
              g.gain.exponentialRampToValueAtTime(0.0001, startT + 0.08);
              o.connect(g).connect(AudioManager.sfxGain);
              o.start(startT); o.stop(startT + 0.09);
            };
            playTick(t);
            playTick(t + 0.11);
          }
        } catch (e) { /* ignore */ }
        // 短暂屏幕抖动提示（1帧量级的轻抖动，表示能量不够）
        if (game) game.screenShake = Math.max(game.screenShake || 0, 2);
        return;
      }
      this.charge = 0;
      
      const weapon = WEAPONS.EMP;
      const level = weapon.levels[Math.min(this.weaponLevel - 1, weapon.levels.length - 1)];
      
      AudioManager.playBomb();
      game.screenShake = 20;
      
      game.particles.emit(this.x, this.y, {
        count: 100,
        speedMin: 2,
        speedMax: 10,
        lifeMin: 500,
        lifeMax: 1000,
        sizeMin: 3,
        sizeMax: 10,
        colors: [weapon.color, '#ffffff', '#00ffcc'],
        blendMode: 'lighter'
      });
      
      game.enemies.pool.forEach((enemy) => {
        if (!enemy.active) return;
        const dx = enemy.x - this.x;
        const dy = enemy.y - this.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < level.radius * level.radius) {
          enemy.takeDamage(level.damage, game);
        }
      });
      
      if (game.boss && game.boss.active) {
        const dx = game.boss.x - this.x;
        const dy = game.boss.y - this.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < level.radius * level.radius) {
          game.boss.takeDamage(level.damage, game);
        }
      }
      
      game.bullets.clearEnemyBullets();
    } else {
      if (game.bombs <= 0) return;
      game.bombs--;
      
      AudioManager.playBomb();
      game.screenShake = 15;
      
      game.particles.emit(game.width / 2, game.height / 2, {
        count: 150,
        speedMin: 3,
        speedMax: 15,
        lifeMin: 500,
        lifeMax: 1200,
        sizeMin: 4,
        sizeMax: 12,
        colors: ['#ff6600', '#ffcc00', '#ffffff', '#ff3300'],
        blendMode: 'lighter'
      });
      
      game.enemies.pool.forEach((enemy) => {
        if (!enemy.active) return;
        enemy.takeDamage(30, game);
      });
      
      if (game.boss && game.boss.active) {
        game.boss.takeDamage(50, game);
      }
      
      game.bullets.clearEnemyBullets();
      game.ui.updateBombs();
    }
  }

  takeDamage(game) {
    if (this.invincible) return false;
    
    if (this.shield) {
      this.shield = false;
      this.shieldTimer = 0;
      this.invincible = true;
      this.invincibleTimer = 1500;
      
      game.particles.emit(this.x, this.y, ParticleEmitters.shieldHit);
      AudioManager.playHit();
      game.screenShake = 8;
      
      return false;
    }
    
    this.hp--;
    this.invincible = true;
    this.invincibleTimer = 2000;
    
    if (this.weaponLevel > 1) {
      this.weaponLevel--;
    }
    
    AudioManager.playHitPlayer();
    game.screenShake = 15;
    game.combo = 0;
    game.ui.updateLives();
    game.ui.updateCombo();
    
    game.particles.emit(this.x, this.y, {
      count: 40,
      speedMin: 2,
      speedMax: 8,
      lifeMin: 300,
      lifeMax: 700,
      sizeMin: 3,
      sizeMax: 8,
      colors: ['#ff0066', '#ff3399', '#ffffff'],
      blendMode: 'lighter'
    });
    
    if (this.hp <= 0) {
      this.die(game);
      return true;
    }
    
    return false;
  }

  die(game) {
    this.active = false;
    
    game.particles.emit(this.x, this.y, ParticleEmitters.bigExplosion);
    AudioManager.playBossExplosion();
    game.screenShake = 30;
    
    setTimeout(() => {
      game.gameOver();
    }, 1500);
  }

  addCharge(amount) {
    this.charge = Math.min(this.maxCharge, this.charge + amount);
  }

  draw(ctx) {
    if (!this.active) return;
    
    ctx.save();
    ctx.translate(this.visualX, this.visualY);
    ctx.rotate(this.tiltAngle);
    
    if (this.invincible && Math.floor(Date.now() / 100) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }
    
    const w = this.width;
    const h = this.height;
    const colors = this.shipColors || { body: '#1a3a5a', accent: '#00f0ff' };
    const accent = colors.accent;
    const body = colors.body;
    
    ctx.globalCompositeOperation = 'lighter';
    
    const accentRgb = Utils.hexToRgb(accent);
    const gradientColor = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.3)`;
    const gradientColor2 = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0)`;
    const aura = ctx.createRadialGradient(0, -h/4, 0, 0, -h/4, w/2);
    aura.addColorStop(0, gradientColor);
    aura.addColorStop(1, gradientColor2);
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, -h/4, w/2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalCompositeOperation = 'source-over';
    
    ctx.fillStyle = body;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(0, -h/2);
    ctx.lineTo(-w/4, 0);
    ctx.lineTo(-w/3, h/3);
    ctx.lineTo(-w/6, h/4);
    ctx.lineTo(0, h/3);
    ctx.lineTo(w/6, h/4);
    ctx.lineTo(w/3, h/3);
    ctx.lineTo(w/4, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(0, -h/2 + 10);
    ctx.lineTo(-w/8, 0);
    ctx.lineTo(0, h/6);
    ctx.lineTo(w/8, 0);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = accent;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(0, -h/6, 4, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    const engineGlow = ctx.createRadialGradient(0, h/3, 0, 0, h/3, 15);
    engineGlow.addColorStop(0, `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.8)`);
    engineGlow.addColorStop(1, `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0)`);
    ctx.fillStyle = engineGlow;
    ctx.fillRect(-15, h/3 - 5, 30, 20);
    
    ctx.restore();
    
    if (this.shield) {
      ctx.save();
      ctx.translate(this.visualX, this.visualY);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = '#00aaff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 15;
      
      const shieldPulse = 1 + Math.sin(Date.now() * 0.005) * 0.05;
      ctx.beginPath();
      ctx.arc(0, 0, w * 0.7 * shieldPulse, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#00aaff';
      ctx.beginPath();
      ctx.arc(0, 0, w * 0.7 * shieldPulse, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
    
    if (this.currentWeapon === 'PLASMA' && this.plasmaOrbs.length > 0) {
      this.plasmaOrbs.forEach((orb) => {
        if (orb.x === undefined) return;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = '#bf00ff';
        ctx.shadowColor = '#bf00ff';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }
    
  }
}
