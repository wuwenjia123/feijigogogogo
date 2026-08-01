const LEVELS = [
  {
    id: 1,
    name: '落日海岸',
    background: 'sunset_beach',
    duration: 75000,
    difficulty: 1.0,
    waves: [
      { time: 1500, type: 'SCOUT', formation: 'line', count: 4, startY: -50 },
      { time: 6000, type: 'SCOUT', formation: 'v_shape', count: 5 },
      { time: 11000, type: 'FIGHTER', formation: 'line', count: 3 },
      { time: 16000, type: 'SCOUT', formation: 'rain', count: 8 },
      { time: 22000, type: 'FIGHTER', formation: 'pair', count: 4 },
      { time: 28000, type: 'SCOUT', formation: 'v_shape', count: 7 },
      { time: 34000, type: 'BOMBER', formation: 'line', count: 2 },
      { time: 40000, type: 'SCOUT', formation: 'rain', count: 12 },
      { time: 47000, type: 'FIGHTER', formation: 'v_shape', count: 6 },
      { time: 54000, type: 'BOMBER', formation: 'pair', count: 3 },
      { time: 61000, type: 'SCOUT', formation: 'rain', count: 15 },
      { time: 68000, type: 'FIGHTER', formation: 'line', count: 5 },
    ],
    boss: 'skyScout',
    bossEntryTime: 73000
  },
  {
    id: 2,
    name: '霓虹都市',
    background: 'city_neon',
    duration: 90000,
    difficulty: 1.2,
    waves: [
      { time: 1000, type: 'SCOUT', formation: 'line', count: 5, startY: -50 },
      { time: 4000, type: 'SCOUT', formation: 'v_shape', count: 7 },
      { time: 8000, type: 'FIGHTER', formation: 'pair', count: 4 },
      { time: 12000, type: 'SCOUT', formation: 'rain', count: 10 },
      { time: 18000, type: 'FIGHTER', formation: 'line', count: 5 },
      { time: 22000, type: 'BOMBER', formation: 'line', count: 2 },
      { time: 28000, type: 'SCOUT', formation: 'v_shape', count: 9 },
      { time: 32000, type: 'FIGHTER', formation: 'rain', count: 8 },
      { time: 38000, type: 'ELITE', formation: 'line', count: 2 },
      { time: 42000, type: 'BOMBER', formation: 'line', count: 3 },
      { time: 48000, type: 'SCOUT', formation: 'rain', count: 15 },
      { time: 55000, type: 'FIGHTER', formation: 'v_shape', count: 7 },
      { time: 60000, type: 'ELITE', formation: 'pair', count: 4 },
      { time: 65000, type: 'BOMBER', formation: 'line', count: 3 },
      { time: 72000, type: 'SCOUT', formation: 'rain', count: 20 },
      { time: 78000, type: 'FIGHTER', formation: 'line', count: 6 },
      { time: 82000, type: 'ELITE', formation: 'line', count: 3 },
    ],
    boss: 'neonRaider',
    bossEntryTime: 88000
  },
  {
    id: 3,
    name: '黄沙遗迹',
    background: 'desert',
    duration: 95000,
    difficulty: 1.4,
    waves: [
      { time: 1000, type: 'FIGHTER', formation: 'v_shape', count: 5 },
      { time: 6000, type: 'SCOUT', formation: 'rain', count: 12 },
      { time: 12000, type: 'BOMBER', formation: 'pair', count: 3 },
      { time: 18000, type: 'FIGHTER', formation: 'line', count: 6 },
      { time: 24000, type: 'ELITE', formation: 'pair', count: 3 },
      { time: 31000, type: 'SCOUT', formation: 'rain', count: 16 },
      { time: 38000, type: 'BOMBER', formation: 'line', count: 4 },
      { time: 45000, type: 'FIGHTER', formation: 'v_shape', count: 8 },
      { time: 52000, type: 'ELITE', formation: 'line', count: 4 },
      { time: 60000, type: 'SCOUT', formation: 'rain', count: 20 },
      { time: 68000, type: 'BOMBER', formation: 'pair', count: 5 },
      { time: 76000, type: 'FIGHTER', formation: 'rain', count: 12 },
      { time: 84000, type: 'ELITE', formation: 'pair', count: 5 },
    ],
    boss: 'sandWyrm',
    bossEntryTime: 93000
  },
  {
    id: 4,
    name: '数据要塞',
    background: 'data_fortress',
    duration: 100000,
    difficulty: 1.6,
    waves: [
      { time: 1000, type: 'FIGHTER', formation: 'line', count: 5 },
      { time: 5000, type: 'SCOUT', formation: 'rain', count: 12 },
      { time: 10000, type: 'BOMBER', formation: 'line', count: 3 },
      { time: 15000, type: 'FIGHTER', formation: 'v_shape', count: 7 },
      { time: 20000, type: 'ELITE', formation: 'line', count: 3 },
      { time: 26000, type: 'SCOUT', formation: 'rain', count: 18 },
      { time: 32000, type: 'BOMBER', formation: 'pair', count: 4 },
      { time: 38000, type: 'ELITE', formation: 'pair', count: 4 },
      { time: 45000, type: 'FIGHTER', formation: 'rain', count: 12 },
      { time: 52000, type: 'ELITE', formation: 'line', count: 4 },
      { time: 60000, type: 'BOMBER', formation: 'line', count: 4 },
      { time: 68000, type: 'SCOUT', formation: 'rain', count: 25 },
      { time: 75000, type: 'ELITE', formation: 'pair', count: 6 },
      { time: 82000, type: 'FIGHTER', formation: 'v_shape', count: 9 },
      { time: 90000, type: 'BOMBER', formation: 'line', count: 5 },
    ],
    boss: 'dataCore',
    bossEntryTime: 98000
  },
  {
    id: 5,
    name: '冰封极地',
    background: 'snow_mountain',
    duration: 105000,
    difficulty: 1.8,
    waves: [
      { time: 1000, type: 'FIGHTER', formation: 'v_shape', count: 6 },
      { time: 6000, type: 'BOMBER', formation: 'line', count: 3 },
      { time: 12000, type: 'ELITE', formation: 'line', count: 3 },
      { time: 18000, type: 'SCOUT', formation: 'rain', count: 18 },
      { time: 25000, type: 'FIGHTER', formation: 'rain', count: 10 },
      { time: 32000, type: 'BOMBER', formation: 'pair', count: 5 },
      { time: 40000, type: 'ELITE', formation: 'pair', count: 5 },
      { time: 48000, type: 'SCOUT', formation: 'rain', count: 25 },
      { time: 56000, type: 'FIGHTER', formation: 'v_shape', count: 9 },
      { time: 64000, type: 'ELITE', formation: 'line', count: 5 },
      { time: 72000, type: 'BOMBER', formation: 'line', count: 6 },
      { time: 82000, type: 'SCOUT', formation: 'rain', count: 30 },
      { time: 92000, type: 'ELITE', formation: 'pair', count: 7 },
    ],
    boss: 'frostTitan',
    bossEntryTime: 103000
  },
  {
    id: 6,
    name: '虫洞深渊',
    background: 'wormhole',
    duration: 110000,
    difficulty: 2.0,
    waves: [
      { time: 1000, type: 'ELITE', formation: 'line', count: 3 },
      { time: 5000, type: 'SCOUT', formation: 'rain', count: 20 },
      { time: 10000, type: 'FIGHTER', formation: 'v_shape', count: 9 },
      { time: 15000, type: 'BOMBER', formation: 'line', count: 4 },
      { time: 20000, type: 'ELITE', formation: 'pair', count: 6 },
      { time: 27000, type: 'SCOUT', formation: 'rain', count: 30 },
      { time: 35000, type: 'BOMBER', formation: 'pair', count: 6 },
      { time: 42000, type: 'ELITE', formation: 'line', count: 5 },
      { time: 50000, type: 'FIGHTER', formation: 'rain', count: 15 },
      { time: 58000, type: 'ELITE', formation: 'pair', count: 8 },
      { time: 66000, type: 'BOMBER', formation: 'line', count: 6 },
      { time: 75000, type: 'SCOUT', formation: 'rain', count: 35 },
      { time: 85000, type: 'ELITE', formation: 'line', count: 6 },
      { time: 95000, type: 'BOMBER', formation: 'pair', count: 8 },
    ],
    boss: 'voidCarrier',
    bossEntryTime: 105000
  },
  {
    id: 7,
    name: '深空星域',
    background: 'deep_space',
    duration: 120000,
    difficulty: 2.3,
    waves: [
      { time: 1000, type: 'ELITE', formation: 'pair', count: 5 },
      { time: 6000, type: 'FIGHTER', formation: 'rain', count: 15 },
      { time: 13000, type: 'BOMBER', formation: 'line', count: 5 },
      { time: 20000, type: 'ELITE', formation: 'v_shape', count: 6 },
      { time: 28000, type: 'SCOUT', formation: 'rain', count: 35 },
      { time: 37000, type: 'ELITE', formation: 'pair', count: 8 },
      { time: 46000, type: 'BOMBER', formation: 'pair', count: 7 },
      { time: 55000, type: 'FIGHTER', formation: 'rain', count: 20 },
      { time: 65000, type: 'ELITE', formation: 'line', count: 7 },
      { time: 75000, type: 'BOMBER', formation: 'line', count: 8 },
      { time: 86000, type: 'SCOUT', formation: 'rain', count: 45 },
      { time: 97000, type: 'ELITE', formation: 'pair', count: 9 },
      { time: 108000, type: 'FIGHTER', formation: 'v_shape', count: 12 },
    ],
    boss: 'starDevourer',
    bossEntryTime: 118000
  },
  {
    id: 8,
    name: '终极决战',
    background: 'final_battle',
    duration: 130000,
    difficulty: 2.8,
    waves: [
      { time: 1000, type: 'ELITE', formation: 'v_shape', count: 6 },
      { time: 6000, type: 'BOMBER', formation: 'pair', count: 6 },
      { time: 12000, type: 'FIGHTER', formation: 'rain', count: 18 },
      { time: 19000, type: 'ELITE', formation: 'line', count: 6 },
      { time: 27000, type: 'SCOUT', formation: 'rain', count: 40 },
      { time: 36000, type: 'BOMBER', formation: 'line', count: 8 },
      { time: 45000, type: 'ELITE', formation: 'pair', count: 10 },
      { time: 55000, type: 'FIGHTER', formation: 'v_shape', count: 12 },
      { time: 65000, type: 'BOMBER', formation: 'pair', count: 9 },
      { time: 76000, type: 'ELITE', formation: 'line', count: 8 },
      { time: 87000, type: 'SCOUT', formation: 'rain', count: 55 },
      { time: 99000, type: 'ELITE', formation: 'v_shape', count: 9 },
      { time: 111000, type: 'BOMBER', formation: 'line', count: 10 },
    ],
    boss: 'apocalypse',
    bossEntryTime: 128000
  }
];

const THEMES = {
  sunset_beach: {
    skyTop: '#3a0a2e',
    skyMid: '#c94a2e',
    skyBottom: '#ffb060',
    accent: 'rgba(255, 200, 120, ',
    stars: false,
    clouds: true,
    sunsetClouds: true,
    mountains: false,
    nebula: false,
    buildings: false,
    sun: true,
    ocean: true,
    beachForeground: true,
    palmSilhouette: true,
    waveSilhouette: true,
    particles: 'ember',
    scanlineColor: '#ff8844'
  },
  blue_sky: {
    skyTop: '#4a90d9',
    skyBottom: '#87ceeb',
    accent: 'rgba(255, 255, 255, ',
    stars: false,
    clouds: true,
    mountains: false,
    nebula: false,
    buildings: false,
    particles: 'clouds',
    scanlineColor: '#ffffff'
  },
  city_neon: {
    skyTop: '#0a0a1a',
    skyBottom: '#1a0a2a',
    accent: 'rgba(0, 240, 255, ',
    stars: true,
    clouds: false,
    mountains: false,
    nebula: false,
    buildings: true,
    particles: 'stars',
    scanlineColor: '#00f0ff'
  },
  desert: {
    skyTop: '#c94a2e',
    skyBottom: '#f4a460',
    accent: 'rgba(255, 180, 80, ',
    stars: false,
    clouds: false,
    mountains: true,
    nebula: false,
    buildings: false,
    particles: 'sand',
    mountainStyle: 'desert',
    scanlineColor: '#ffcc66'
  },
  data_fortress: {
    skyTop: '#0d0520',
    skyBottom: '#1a0a3a',
    accent: 'rgba(191, 0, 255, ',
    stars: true,
    clouds: false,
    mountains: false,
    nebula: true,
    buildings: false,
    particles: 'data',
    scanlineColor: '#bf00ff'
  },
  snow_mountain: {
    skyTop: '#1a3a5a',
    skyBottom: '#6ea8d5',
    accent: 'rgba(200, 230, 255, ',
    stars: true,
    clouds: true,
    mountains: true,
    nebula: false,
    buildings: false,
    particles: 'snow',
    mountainStyle: 'snow',
    scanlineColor: '#aaddff'
  },
  wormhole: {
    skyTop: '#051a10',
    skyBottom: '#0a2a20',
    accent: 'rgba(0, 255, 136, ',
    stars: true,
    clouds: false,
    mountains: false,
    nebula: true,
    buildings: false,
    particles: 'energy',
    scanlineColor: '#00ff88'
  },
  deep_space: {
    skyTop: '#000010',
    skyBottom: '#0a0a2a',
    accent: 'rgba(100, 150, 255, ',
    stars: true,
    clouds: false,
    mountains: false,
    nebula: true,
    buildings: false,
    particles: 'galaxy',
    scanlineColor: '#88aaff'
  },
  final_battle: {
    skyTop: '#1a0000',
    skyBottom: '#3a0a1a',
    accent: 'rgba(255, 50, 100, ',
    stars: true,
    clouds: false,
    mountains: false,
    nebula: true,
    buildings: false,
    particles: 'ember',
    scanlineColor: '#ff3366'
  }
};

class LevelManager {
  constructor(game) {
    this.game = game;
    this.currentLevel = 0;
    this.levelTime = 0;
    this.waveIndex = 0;
    this.bossSpawned = false;
    this._bossWarned = false;
    this.spawnedWaves = [];
    this.backgroundLayers = [];
    this.scrollSpeed = 1;
    this.particlePool = [];
  }

  startLevel(levelIndex) {
    this.currentLevel = levelIndex;
    this.levelTime = 0;
    this.waveIndex = 0;
    this.bossSpawned = false;
    this._bossWarned = false;
    this.spawnedWaves = [];
    this.particlePool = [];
    
    const level = LEVELS[levelIndex];
    if (level) {
      this.game.ui.updateLevel(level.id, level.name);
    }
    
    this.initBackground(level ? level.background : 'blue_sky');
    this.initParticles(level ? level.background : 'blue_sky');
  }

  initBackground(theme) {
    const themeData = THEMES[theme];
    this.theme = theme;
    this.themeData = themeData;
    
    this.backgroundLayers = [];
    
    if (themeData.stars) {
      this.backgroundLayers.push({ speed: 0.05, offset: 0, type: 'stars_far', density: 80 });
      this.backgroundLayers.push({ speed: 0.15, offset: 0, type: 'stars_near', density: 50 });
    }
    
    if (themeData.nebula) {
      this.backgroundLayers.push({ speed: 0.08, offset: 0, type: 'nebula' });
    }
    
    if (themeData.sun) {
      this.backgroundLayers.push({ speed: 0.02, offset: 0, type: 'sun' });
    }
    
    if (themeData.clouds && !themeData.sunsetClouds) {
      this.backgroundLayers.push({ speed: 0.1, offset: 0, type: 'clouds_far', density: 5 });
      this.backgroundLayers.push({ speed: 0.3, offset: 0, type: 'clouds_near', density: 4 });
    }
    if (themeData.sunsetClouds) {
      this.backgroundLayers.push({ speed: 0.08, offset: 0, type: 'sunset_clouds_far', density: 4 });
      this.backgroundLayers.push({ speed: 0.2, offset: 0, type: 'sunset_clouds_near', density: 3 });
    }
    
    if (themeData.ocean) {
      this.backgroundLayers.push({ speed: 0.12, offset: 0, type: 'ocean' });
    }
    if (themeData.waveSilhouette) {
      this.backgroundLayers.push({ speed: 0.25, offset: 0, type: 'wave_silhouette_far' });
      this.backgroundLayers.push({ speed: 0.45, offset: 0, type: 'wave_silhouette_near' });
    }
    
    if (themeData.mountains) {
      this.backgroundLayers.push({ speed: 0.15, offset: 0, type: 'mountains_far', style: themeData.mountainStyle });
      this.backgroundLayers.push({ speed: 0.4, offset: 0, type: 'mountains_near', style: themeData.mountainStyle });
    }
    
    if (themeData.buildings) {
      this.backgroundLayers.push({ speed: 0.1, offset: 0, type: 'farBuildings' });
      this.backgroundLayers.push({ speed: 0.3, offset: 0, type: 'midBuildings' });
      this.backgroundLayers.push({ speed: 0.6, offset: 0, type: 'nearBuildings' });
    }
    
    if (themeData.palmSilhouette) {
      this.backgroundLayers.push({ speed: 0.1, offset: 0, type: 'palm_silhouette' });
    }
    if (themeData.beachForeground) {
      this.backgroundLayers.push({ speed: 0.2, offset: 0, type: 'beach_foreground' });
    }
    
    this.backgroundLayers.push({ speed: 0.8, offset: 0, type: 'fog' });
  }

  initParticles(theme) {
    const count = 60;
    for (let i = 0; i < count; i++) {
      this.particlePool.push({
        x: Math.random() * 480,
        y: Math.random() * 800,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        drift: Math.random() * 0.4 - 0.2,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  getDifficulty() {
    const level = LEVELS[this.currentLevel];
    return level ? level.difficulty : 1.0;
  }

  update(dt) {
    this.levelTime += dt;
    
    const level = LEVELS[this.currentLevel];
    if (!level) return;
    
    while (this.waveIndex < level.waves.length) {
      const wave = level.waves[this.waveIndex];
      if (this.levelTime >= wave.time) {
        this.spawnWave(wave);
        this.waveIndex++;
      } else {
        break;
      }
    }
    
    // ====== Boss 出场前 1 秒：字幕+语音+倒计时 ======
    if (!this.bossSpawned && !this._bossWarned && this.levelTime >= level.bossEntryTime - 1000) {
      this._bossWarned = true;

      // 橙红警示大字横幅
      if (this.game.ui && typeof this.game.ui.showBanner === 'function') {
        this.game.ui.showBanner('敌军还有 1 秒到达战场！', { style: 'warning', duration: 1600 });
      }
      // 语音：沉重、严肃语调
      setTimeout(() => {
        AudioManager.playSpeech('敌军还有1秒到达战场！', { rate: 0.95, pitch: 0.85 });
      }, 30);
      // 倒计时滴
      AudioManager.playBossCountdown();
    }

    if (!this.bossSpawned && this.levelTime >= level.bossEntryTime) {
      this.spawnBoss(level.boss);
      this.bossSpawned = true;
    }
    
    this.backgroundLayers.forEach((layer) => {
      layer.offset += layer.speed * this.scrollSpeed * dt * 0.05;
    });
    
    this.particlePool.forEach((p) => {
      p.y += p.speed * dt * 0.1;
      p.x += p.drift * dt * 0.05;
      if (p.y > 820) {
        p.y = -20;
        p.x = Math.random() * 480;
      }
      if (p.x < -20) p.x = 500;
      if (p.x > 500) p.x = -20;
    });
  }

  spawnWave(wave) {
    const game = this.game;
    const startX = wave.startX !== undefined ? wave.startX : game.width / 2;
    const startY = wave.startY !== undefined ? wave.startY : -50;
    
    game.enemies.spawnFormation(wave.type, wave.formation, game, {
      count: wave.count,
      startX: startX,
      startY: startY,
      spacing: wave.spacing,
      difficulty: this.getDifficulty()
    });
  }

  spawnBoss(bossId) {
    if (this.game.boss) {
      this.game.boss.init(bossId, this.game);
    }
    // BOSS 正式降临的冲击音（低频+失真），配合 boss.js 里的警告覆盖层
    AudioManager.playBossArrived();
  }

  drawBackground(ctx, width, height) {
    const themeData = this.themeData || THEMES.blue_sky;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, themeData.skyTop);
    if (themeData.skyMid !== undefined) {
      gradient.addColorStop(0.5, themeData.skyMid);
    }
    gradient.addColorStop(1, themeData.skyBottom);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    this.backgroundLayers.forEach((layer, index) => {
      this.drawLayer(ctx, layer, index, width, height);
    });
    
    this.drawThemeParticles(ctx, width, height);
    
    ctx.save();
    ctx.globalAlpha = 0.03;
    ctx.fillStyle = themeData.scanlineColor;
    for (let y = 0; y < height; y += 4) {
      ctx.fillRect(0, y, width, 2);
    }
    ctx.restore();
  }

  drawThemeParticles(ctx, width, height) {
    const themeData = this.themeData || THEMES.blue_sky;
    const color = themeData.accent;
    
    this.particlePool.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = color.replace(/,\s*[\d.]+\)$/, `, ${p.alpha})`);
      
      switch (themeData.particles) {
        case 'clouds':
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.arc(p.x + p.size * 3, p.y + 2, p.size * 3, 0, Math.PI * 2);
          ctx.arc(p.x - p.size * 3, p.y + 2, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'snow':
          ctx.fillStyle = `rgba(220, 240, 255, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'sand':
          ctx.fillStyle = `rgba(255, 200, 120, ${p.alpha * 0.5})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          break;
        case 'data':
          ctx.fillStyle = `rgba(191, 0, 255, ${p.alpha})`;
          ctx.font = `${p.size * 3}px monospace`;
          ctx.fillText(Math.random() > 0.5 ? '1' : '0', p.x, p.y);
          break;
        case 'energy':
          ctx.fillStyle = `rgba(0, 255, 136, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'galaxy':
          const brightness = 0.5 + Math.sin(Date.now() * 0.002 + p.x) * 0.5;
          ctx.fillStyle = `rgba(${150 + Math.floor(p.x * 0.5)}, ${150 + Math.floor(p.y * 0.2)}, 255, ${p.alpha * brightness})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          break;
        case 'ember':
          ctx.fillStyle = `rgba(255, ${100 + Math.floor(p.alpha * 200)}, 50, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'stars':
        default:
          const twinkle = 0.5 + Math.sin(Date.now() * 0.003 + p.x) * 0.5;
          ctx.globalAlpha = p.alpha * twinkle;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          break;
      }
      ctx.restore();
    });
  }

  drawLayer(ctx, layer, index, width, height) {
    const offset = layer.offset % height;
    
    switch (layer.type) {
      case 'stars_far':
        this.drawStars(ctx, layer, width, height, offset, 0.3, 1);
        break;
      case 'stars_near':
        this.drawStars(ctx, layer, width, height, offset, 0.8, 2);
        break;
      case 'nebula':
        this.drawNebula(ctx, layer, width, height, offset);
        break;
      case 'sun':
        this.drawSun(ctx, layer, width, height, offset);
        break;
      case 'sunset_clouds_far':
        this.drawSunsetClouds(ctx, layer, width, height, offset, 0.4);
        break;
      case 'sunset_clouds_near':
        this.drawSunsetClouds(ctx, layer, width, height, offset, 0.7);
        break;
      case 'clouds_far':
        this.drawClouds(ctx, layer, width, height, offset, 0.4);
        break;
      case 'clouds_near':
        this.drawClouds(ctx, layer, width, height, offset, 0.7);
        break;
      case 'ocean':
        this.drawOcean(ctx, layer, width, height, offset);
        break;
      case 'wave_silhouette_far':
        this.drawWaveSilhouette(ctx, layer, width, height, offset, 0.4);
        break;
      case 'wave_silhouette_near':
        this.drawWaveSilhouette(ctx, layer, width, height, offset, 0.75);
        break;
      case 'mountains_far':
        this.drawMountains(ctx, layer, width, height, offset, 0.3);
        break;
      case 'mountains_near':
        this.drawMountains(ctx, layer, width, height, offset, 0.6);
        break;
      case 'farBuildings':
        this.drawBuildings(ctx, layer, width, height, offset, 0.3, this.getBuildingColor(0.3));
        break;
      case 'midBuildings':
        this.drawBuildings(ctx, layer, width, height, offset, 0.5, this.getBuildingColor(0.5));
        break;
      case 'nearBuildings':
        this.drawBuildings(ctx, layer, width, height, offset, 0.8, this.getBuildingColor(0.8));
        break;
      case 'palm_silhouette':
        this.drawPalmSilhouette(ctx, layer, width, height, offset);
        break;
      case 'beach_foreground':
        this.drawBeachForeground(ctx, layer, width, height, offset);
        break;
      case 'fog':
        this.drawFog(ctx, layer, width, height, offset);
        break;
    }
  }

  getBuildingColor(scale) {
    const theme = this.theme;
    const colors = {
      city_neon: scale > 0.6 ? '#1f1f50' : scale > 0.4 ? '#151540' : '#0a0a2a'
    };
    return colors[theme] || (scale > 0.6 ? '#333355' : scale > 0.4 ? '#222244' : '#111133');
  }

  drawStars(ctx, layer, width, height, offset, brightness, sizeMul) {
    const seed = 12345 + Math.floor(layer.speed * 100);
    const themeData = this.themeData || THEMES.blue_sky;
    
    for (let i = 0; i < layer.density; i++) {
      const x = ((i * 137 + seed) % width);
      const y = ((i * 89 + seed + offset * 50) % (height + 50)) - 25;
      const size = ((i % 3) + 1) * sizeMul;
      const twinkle = 0.5 + Math.sin(Date.now() * 0.002 + i) * 0.5;
      
      const accentColor = themeData.accent;
      const colorStr = accentColor.substring(0, accentColor.lastIndexOf(',') + 1);
      
      if (this.theme === 'deep_space' && i % 7 === 0) {
        const hue = (i * 37) % 360;
        ctx.fillStyle = `hsla(${hue}, 70%, 80%, ${brightness * (0.3 + twinkle * 0.7)})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness * (0.3 + twinkle * 0.7)})`;
      }
      ctx.fillRect(x, y, size, size);
    }
  }

  drawNebula(ctx, layer, width, height, offset) {
    const themeData = this.themeData || THEMES.data_fortress;
    const accentColor = themeData.accent;
    
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    
    const blobs = 4;
    for (let i = 0; i < blobs; i++) {
      const x = width * (0.2 + (i * 0.3) % 0.8);
      const y = ((height * 0.3 + i * 200 + offset * 10) % (height + 300)) - 150;
      const radius = 150 + (i % 2) * 80;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, accentColor + '0.12)');
      gradient.addColorStop(0.5, accentColor + '0.05)');
      gradient.addColorStop(1, accentColor + '0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    
    ctx.restore();
  }

  drawClouds(ctx, layer, width, height, offset, scale) {
    const cloudWidth = 120 * scale;
    const count = Math.ceil(width / cloudWidth) + 2;
    const baseY = height * (0.15 + (1 - scale) * 0.4);
    
    for (let i = 0; i < layer.density + 2; i++) {
      const seed = i * 79 + Math.floor(layer.speed * 1000);
      const x = ((i * cloudWidth * 1.3) - (offset * 20 * scale) % (cloudWidth * 1.3) + width * 2) % (width + cloudWidth) - cloudWidth / 2;
      const y = baseY + ((seed * 37) % (height * 0.3)) + Math.sin(seed) * 30;
      const w = cloudWidth * (0.7 + ((seed % 50) / 100));
      const h = w * 0.35;
      
      ctx.save();
      ctx.globalAlpha = 0.5 + scale * 0.3;
      
      if (this.theme === 'snow_mountain') {
        ctx.fillStyle = 'rgba(220, 235, 250, 0.6)';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      }
      
      ctx.beginPath();
      ctx.arc(x, y, h * 0.8, 0, Math.PI * 2);
      ctx.arc(x + w * 0.25, y - h * 0.2, h * 0.9, 0, Math.PI * 2);
      ctx.arc(x + w * 0.5, y, h, 0, Math.PI * 2);
      ctx.arc(x + w * 0.75, y - h * 0.1, h * 0.85, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  }

  drawMountains(ctx, layer, width, height, offset, scale) {
    const mountainCount = 6;
    const baseHeight = height * (0.25 + scale * 0.2);
    
    ctx.save();
    
    let fillColor, strokeColor, capColor;
    if (layer.style === 'snow') {
      fillColor = scale > 0.5 ? '#4a6a8a' : '#3a5a7a';
      strokeColor = scale > 0.5 ? '#80a0c0' : '#6080a0';
      capColor = 'rgba(240, 248, 255, 0.95)';
    } else if (layer.style === 'desert') {
      fillColor = scale > 0.5 ? '#a06040' : '#8a5038';
      strokeColor = scale > 0.5 ? '#d08050' : '#b07048';
      capColor = 'rgba(210, 160, 110, 0.9)';
    } else {
      fillColor = scale > 0.5 ? '#445566' : '#334455';
      strokeColor = scale > 0.5 ? '#667788' : '#556677';
      capColor = 'rgba(255, 255, 255, 0.8)';
    }
    
    const offsetX = (offset * 8 * scale) % (width / mountainCount);
    
    for (let i = -1; i <= mountainCount; i++) {
      const seed = Math.floor(i + layer.speed * 100);
      const mWidth = width / mountainCount * (1 + scale * 0.3);
      const x = i * mWidth - offsetX;
      const peakHeight = baseHeight + ((seed * 53) % (baseHeight * 0.8));
      const y = height - peakHeight;
      const midX = x + mWidth / 2;
      
      ctx.fillStyle = fillColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(midX - mWidth * 0.1, y + peakHeight * 0.3);
      ctx.lineTo(midX, y);
      ctx.lineTo(midX + mWidth * 0.1, y + peakHeight * 0.3);
      ctx.lineTo(x + mWidth, height);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      const capHeight = peakHeight * 0.15;
      ctx.fillStyle = capColor;
      ctx.beginPath();
      ctx.moveTo(midX - mWidth * 0.12, y + capHeight);
      ctx.lineTo(midX, y);
      ctx.lineTo(midX + mWidth * 0.12, y + capHeight);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.restore();
  }

  drawBuildings(ctx, layer, width, height, offset, scale, color) {
    const buildingWidth = 40;
    const count = Math.ceil(width / buildingWidth) + 2;
    const baseHeight = height * 0.3 * scale;
    
    ctx.fillStyle = color;
    
    for (let i = 0; i < count; i++) {
      const x = i * buildingWidth - (offset * 10) % buildingWidth;
      const seed = Math.floor(i + offset * 0.01);
      const buildingHeight = baseHeight + ((seed * 53) % (baseHeight * 0.8));
      const y = height - buildingHeight;
      
      ctx.fillRect(x, y, buildingWidth - 2, buildingHeight);
      
      if (scale > 0.4) {
        ctx.fillStyle = this.getThemeAccentColor(0.15);
        const windowsX = 5;
        const windowsY = 10;
        for (let wy = 0; wy < windowsY; wy++) {
          for (let wx = 0; wx < windowsX; wx++) {
            if ((seed + wx + wy) % 3 === 0) {
              const wxPos = x + 6 + wx * 7;
              const wyPos = y + 8 + wy * 12;
              if (wyPos < height - 5 && wyPos > y + 5) {
                ctx.fillRect(wxPos, wyPos, 4, 6);
              }
            }
          }
        }
        ctx.fillStyle = color;
      }
    }
    
    if (scale > 0.6) {
      ctx.strokeStyle = this.getThemeAccentColor(0.5);
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      for (let i = 0; i < count; i++) {
        const x = i * buildingWidth - (offset * 10) % buildingWidth;
        const seed = Math.floor(i + offset * 0.01);
        const buildingHeight = baseHeight + ((seed * 53) % (baseHeight * 0.8));
        const y = height - buildingHeight;
        if (seed % 5 === 0) {
          ctx.beginPath();
          ctx.moveTo(x + buildingWidth / 2, y);
          ctx.lineTo(x + buildingWidth / 2, y - 20 * scale);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }
  }

  getThemeAccentColor(alpha) {
    const themes = {
      blue_sky: `rgba(255, 255, 255, ${alpha})`,
      city_neon: `rgba(0, 240, 255, ${alpha})`,
      desert: `rgba(255, 180, 80, ${alpha})`,
      data_fortress: `rgba(191, 0, 255, ${alpha})`,
      snow_mountain: `rgba(200, 230, 255, ${alpha})`,
      wormhole: `rgba(0, 255, 136, ${alpha})`,
      deep_space: `rgba(100, 150, 255, ${alpha})`,
      final_battle: `rgba(255, 50, 100, ${alpha})`
    };
    return themes[this.theme] || `rgba(0, 240, 255, ${alpha})`;
  }

  drawFog(ctx, layer, width, height, offset) {
    const themeData = this.themeData || THEMES.blue_sky;
    const accent = this.getThemeAccentColor(0.05);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, this.getThemeAccentColor(0));
    gradient.addColorStop(0.5, accent);
    gradient.addColorStop(1, this.getThemeAccentColor(0.08));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    ctx.save();
    ctx.globalAlpha = 0.05;
    for (let i = 0; i < 3; i++) {
      const y = ((offset * 20 + i * height / 3) % (height + 100)) - 50;
      const gradient2 = ctx.createLinearGradient(0, y - 30, 0, y + 30);
      gradient2.addColorStop(0, 'transparent');
      gradient2.addColorStop(0.5, this.getThemeAccentColor(1).replace(/rgba?\(([^)]+)\)/, (m, p1) => {
        const parts = p1.split(',').map(s => s.trim());
        return `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})`;
      }));
      gradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, y - 30, width, 60);
    }
    ctx.restore();
  }

  drawSun(ctx, layer, width, height, offset) {
    const horizonY = height * 0.58;
    const cx = width * 0.5;
    const cy = horizonY - 10;
    const r = 55;
    
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    
    // 外层晕染
    const halo1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 3);
    halo1.addColorStop(0, 'rgba(255, 160, 80, 0.55)');
    halo1.addColorStop(0.4, 'rgba(255, 110, 60, 0.22)');
    halo1.addColorStop(1, 'rgba(255, 80, 40, 0)');
    ctx.fillStyle = halo1;
    ctx.fillRect(cx - r * 3, cy - r * 3, r * 6, r * 6);
    
    // 中层晕染
    const halo2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.8);
    halo2.addColorStop(0, 'rgba(255, 230, 150, 0.85)');
    halo2.addColorStop(0.5, 'rgba(255, 150, 80, 0.35)');
    halo2.addColorStop(1, 'rgba(255, 90, 50, 0)');
    ctx.fillStyle = halo2;
    ctx.fillRect(cx - r * 2, cy - r * 2, r * 4, r * 4);
    
    ctx.restore();
    
    // 太阳本体
    const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    sunGrad.addColorStop(0, '#fff8dc');
    sunGrad.addColorStop(0.4, '#ffdd66');
    sunGrad.addColorStop(0.75, '#ff8833');
    sunGrad.addColorStop(1, '#ff5522');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  drawSunsetClouds(ctx, layer, width, height, offset, scale) {
    const cloudWidth = 140 * scale;
    const count = Math.ceil(width / cloudWidth) + 2;
    const baseY = height * (0.2 + (1 - scale) * 0.2);
    
    for (let i = 0; i < layer.density + 2; i++) {
      const seed = i * 83 + Math.floor(layer.speed * 1000);
      const x = ((i * cloudWidth * 1.4) - (offset * 18 * scale) % (cloudWidth * 1.4) + width * 2) % (width + cloudWidth) - cloudWidth / 2;
      const y = baseY + ((seed * 29) % (height * 0.18)) + Math.sin(seed) * 25;
      const w = cloudWidth * (0.6 + ((seed % 60) / 100));
      const h = w * 0.3;
      
      ctx.save();
      ctx.globalAlpha = 0.55 + scale * 0.3;
      
      // 落日云层采用粉橙渐变，底部略暗
      const grad = ctx.createLinearGradient(0, y - h, 0, y + h);
      grad.addColorStop(0, scale > 0.5 ? 'rgba(255, 180, 140, 0.92)' : 'rgba(255, 200, 170, 0.82)');
      grad.addColorStop(0.5, scale > 0.5 ? 'rgba(255, 120, 100, 0.88)' : 'rgba(255, 140, 120, 0.78)');
      grad.addColorStop(1, scale > 0.5 ? 'rgba(180, 60, 80, 0.78)' : 'rgba(200, 80, 100, 0.68)');
      ctx.fillStyle = grad;
      
      ctx.beginPath();
      ctx.arc(x, y, h * 0.7, 0, Math.PI * 2);
      ctx.arc(x + w * 0.25, y - h * 0.18, h * 0.85, 0, Math.PI * 2);
      ctx.arc(x + w * 0.5, y, h * 0.95, 0, Math.PI * 2);
      ctx.arc(x + w * 0.78, y - h * 0.1, h * 0.8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  }

  drawOcean(ctx, layer, width, height, offset) {
    const horizonY = height * 0.58;
    const sunCX = width * 0.5;
    
    // 海水本体 - 深蓝紫过渡
    const seaGrad = ctx.createLinearGradient(0, horizonY, 0, height);
    seaGrad.addColorStop(0, '#3a1a4a');
    seaGrad.addColorStop(0.25, '#2a2050');
    seaGrad.addColorStop(0.6, '#1c1a40');
    seaGrad.addColorStop(1, '#0f1030');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, horizonY, width, height - horizonY);
    
    // 太阳在海面的垂直反光
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const reflectGrad = ctx.createLinearGradient(sunCX, horizonY, sunCX, height);
    reflectGrad.addColorStop(0, 'rgba(255, 180, 90, 0.7)');
    reflectGrad.addColorStop(0.35, 'rgba(255, 130, 70, 0.35)');
    reflectGrad.addColorStop(1, 'rgba(255, 90, 60, 0)');
    ctx.fillStyle = reflectGrad;
    // 动态宽度随波动 - 越近越宽
    const segs = 20;
    for (let i = 0; i < segs; i++) {
      const y0 = horizonY + (i / segs) * (height - horizonY);
      const y1 = y0 + (height - horizonY) / segs;
      const t = i / segs;
      const wobble = Math.sin(i * 1.7 + offset * 3) * (6 + t * 22);
      const w = (10 + t * 40);
      ctx.fillRect(sunCX - w + wobble, y0, (w - wobble * 0.1) * 2, y1 - y0 + 1);
    }
    ctx.restore();
    
    // 海面水平线亮边（落日余晖条）
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = '#ffb070';
    ctx.fillRect(0, horizonY - 1, width, 2);
    ctx.restore();
  }

  drawWaveSilhouette(ctx, layer, width, height, offset, scale) {
    const horizonY = height * 0.58;
    const baseY = horizonY + (1 - scale) * 10 + scale * 30;
    const amp = 6 + scale * 18;
    const period = 90 - scale * 25;
    const color = scale > 0.6 ? 'rgba(8, 10, 35, 0.85)' : 'rgba(18, 16, 50, 0.55)';
    
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, baseY);
    
    const steps = Math.ceil(width / 4) + 2;
    for (let i = 0; i <= steps; i++) {
      const x = i * 4;
      const phase = (x / period) + offset * (scale > 0.6 ? 1.8 : 1.0);
      const y = baseY
        + Math.sin(phase) * amp
        + Math.sin(phase * 2.3 + offset * 2.5) * (amp * 0.35);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawPalmSilhouette(ctx, layer, width, height, offset) {
    ctx.save();
    ctx.fillStyle = 'rgba(5, 4, 14, 0.92)';
    
    // 左椰树
    const lx = width * 0.12;
    const by = height - 18;
    const trunkH = 110;
    const trunkW = 7;
    // 树干（略弯）
    ctx.beginPath();
    ctx.moveTo(lx - trunkW / 2, by);
    ctx.quadraticCurveTo(lx + 8, by - trunkH * 0.55, lx + 4, by - trunkH);
    ctx.lineTo(lx - 2, by - trunkH);
    ctx.quadraticCurveTo(lx - 4, by - trunkH * 0.5, lx + trunkW / 2, by);
    ctx.closePath();
    ctx.fill();
    // 叶
    const px = lx + 1, py = by - trunkH;
    const leaf = (ang, len, wCurv) => {
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.quadraticCurveTo(
        px + Math.cos(ang) * len * 0.55 + wCurv,
        py + Math.sin(ang) * len * 0.55 - 4,
        px + Math.cos(ang) * len,
        py + Math.sin(ang) * len
      );
      ctx.quadraticCurveTo(
        px + Math.cos(ang) * len * 0.55 - wCurv * 0.5,
        py + Math.sin(ang) * len * 0.55 + 5,
        px, py + 4
      );
      ctx.closePath();
      ctx.fill();
    };
    leaf(-Math.PI / 2 + 0.05, 70, 14);
    leaf(-Math.PI / 2 - 0.5, 60, 10);
    leaf(-Math.PI / 2 - 1.1, 55, 12);
    leaf(-Math.PI / 2 - 1.7, 48, 8);
    leaf(-Math.PI / 2 + 0.6, 58, 10);
    leaf(-Math.PI / 2 + 1.15, 52, 12);
    leaf(-Math.PI / 2 + 1.7, 46, 8);
    
    // 右礁石+椰树
    const rx = width * 0.91;
    // 礁石
    ctx.beginPath();
    ctx.moveTo(rx - 55, by);
    ctx.lineTo(rx - 45, by - 22);
    ctx.lineTo(rx - 18, by - 34);
    ctx.lineTo(rx + 6, by - 24);
    ctx.lineTo(rx + 48, by - 38);
    ctx.lineTo(rx + 64, by - 26);
    ctx.lineTo(rx + 76, by);
    ctx.closePath();
    ctx.fill();
    
    // 右侧第二棵椰树
    const tx = rx - 15;
    const trH = 85;
    ctx.beginPath();
    ctx.moveTo(tx - 5, by - 30);
    ctx.quadraticCurveTo(tx - 14, by - 30 - trH * 0.55, tx - 6, by - 30 - trH);
    ctx.lineTo(tx + 1, by - 30 - trH);
    ctx.quadraticCurveTo(tx + 3, by - 30 - trH * 0.5, tx + 6, by - 30);
    ctx.closePath();
    ctx.fill();
    
    const qx = tx - 3, qy = by - 30 - trH;
    leaf(-Math.PI / 2 + 0.1, 55, 10);
    leaf(-Math.PI / 2 - 0.55, 48, 8);
    leaf(-Math.PI / 2 - 1.2, 44, 9);
    leaf(-Math.PI / 2 + 0.7, 46, 9);
    leaf(-Math.PI / 2 + 1.25, 40, 10);
    ctx.restore();
  }

  drawBeachForeground(ctx, layer, width, height, offset) {
    const topY = height - 18;
    
    // 沙滩底色
    const sandGrad = ctx.createLinearGradient(0, topY, 0, height);
    sandGrad.addColorStop(0, '#b89468');
    sandGrad.addColorStop(0.35, '#a07a50');
    sandGrad.addColorStop(1, '#6c4c2e');
    ctx.fillStyle = sandGrad;
    ctx.fillRect(0, topY, width, height - topY);
    
    // 湿润的岸线（潮水线）
    ctx.save();
    ctx.globalAlpha = 0.8;
    const tideGrad = ctx.createLinearGradient(0, topY - 4, 0, topY + 6);
    tideGrad.addColorStop(0, 'rgba(30, 30, 70, 0)');
    tideGrad.addColorStop(0.5, 'rgba(30, 30, 70, 0.45)');
    tideGrad.addColorStop(1, 'rgba(30, 30, 70, 0)');
    ctx.fillStyle = tideGrad;
    ctx.fillRect(0, topY - 4, width, 10);
    
    // 潮水线白色浪沫波动
    ctx.globalAlpha = 0.65;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const steps = Math.ceil(width / 3) + 2;
    for (let i = 0; i <= steps; i++) {
      const x = i * 3;
      const y = topY - 1
        + Math.sin((x / 45) + offset * 1.6) * 1.8
        + Math.sin((x / 20) + offset * 3.2) * 0.7;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
    
    // 散落的沙粒点（深色）
    ctx.save();
    ctx.fillStyle = 'rgba(80, 50, 30, 0.5)';
    for (let i = 0; i < 80; i++) {
      const sx = ((i * 37 + offset * 8) | 0) % width;
      const sy = topY + 3 + ((i * 53) % (height - topY - 3));
      ctx.fillRect(sx, sy, 1, 1);
    }
    ctx.restore();
  }

  getTotalLevels() {
    return LEVELS.length;
  }

  getLevel(index) {
    return LEVELS[index];
  }
}
