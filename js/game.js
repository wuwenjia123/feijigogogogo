class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.width = 480;
    this.height = 800;
    this.status = 'MENU';
    this.previousStatus = 'MENU';
    
    this.score = 0;
    this.highScore = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.bombs = 2;
    this.maxBombs = 9;
    this.kills = 0;
    this.grazeCount = 0;
    this.scoreMultiplier = 1;
    this.scoreMultiplierTimer = 0;
    
    this.screenShake = 0;
    this.slowMotion = 1;
    this.gameTime = 0;
    this.fps = 60;
    this.lastTime = 0;
    this.frameCount = 0;
    this.fpsTimer = 0;
    
    this.difficulty = 'NORMAL';
    this.debugMode = false;
    this.showFPS = false;
    
    this.player = null;
    this.enemies = null;
    this.bullets = null;
    this.powerups = null;
    this.particles = null;
    this.boss = null;
    this.level = null;
    this.collision = null;
    this.renderer = null;
    this.ui = null;
    
    this.settings = {
      bgmVolume: 0.70,  // 默认从 0.5 → 0.7（+40%）
      sfxVolume: 0.88,  // 默认从 0.7 → 0.88（+25%）
      difficulty: 'NORMAL'
    };
    
    this.saveData = {
      highScore: 0,
      unlockedLevel: 1,
      ratings: {},
      totalCredits: 0,
      ownedWeapons: ['LASER'],
      ownedShips: ['CYBER_FIGHTER'],
      selectedWeapon: 'LASER',
      selectedShip: 'CYBER_FIGHTER'
    };
    
    this.shop = null;
    
    this.currentLevelIndex = 0;
    this.init();
  }

  init() {
    this.loadSaveData();
    this.setupCanvas();
    this.setupSystems();
    this.setupInput();
    this.setupUI();
    
    this.highScore = this.saveData.highScore || 0;
    this.ui.updateHighScore(this.highScore);
    
    this.ui.showScreen('menu');
    
    // ===== V3：启动音频自检 =====
    try {
      AudioManager.init();
      if (typeof AudioManager.selfTest === 'function') {
        const game = this;
        AudioManager.selfTest().then((r) => {
          const okFile = !r.fileErr;
          const okTts  = !r.ttsErr;
          if (okFile && okTts) {
            console.log('%c[Audio自检通过] ✅ 用户原音+TTS兜底都可正常加载', 'background:#0a7d41;color:#fff;padding:2px 8px;border-radius:4px;font-weight:bold;');
            return;
          }
          if (r.isFileProtocol) {
            game.ui.showBanner([
              '🚨🚨 致命：当前是 file:// 协议（双击HTML直接打开）',
              '    浏览器安全策略会拦截所有本地音频文件！',
              '✅ 解决（只需一次）：',
              '    1) 打开命令行进入项目：',
              '       cd c:\\Users\\wwfsw\\Documents\\飞机大战',
              '    2) 启动服务器：python -m http.server 8000',
              '    3) 浏览器访问：http://localhost:8000/',
              '🔧 用户原音(gogogo.m4a): ' + r.filePretty,
              '🔧 TTS保底(dengchao-gogogo.mp3): ' + r.ttsPretty,
            ].join('\n'), { style: 'warn', duration: 30000 });
          } else if (!okTts) {
            game.ui.showBanner([
              '⚠️ 音频自检失败：连TTS保底音频(dengchao-gogogo.mp3)也加载失败',
              '   请检查：① localhost:8000 服务器是否已启动？',
              '            ② 服务器启动目录是不是「飞机大战」文件夹？',
              '🔧 详情: ' + r.ttsPretty,
            ].join('\n'), { style: 'warn', duration: 22000 });
          } else {
            game.ui.showBanner([
              'ℹ️ 你的邓超原音文件没匹配到（TTS兜底会先响）',
              '   把你的音频拖进 audio/ 目录，文件名含 gogogo/邓超/出发 关键词即可',
              '   例：audio/gogogo.m4a  /  audio/邓超.mp3  /  audio/出发喽.wav',
              '🔧 当前匹配失败: ' + r.filePretty,
            ].join('\n'), { style: 'info', duration: 16000 });
          }
        }).catch((e) => { console.error('[Audio自检] 异常:', e); });
      }
    } catch (_) {}
    
    requestAnimationFrame((t) => this.loop(t));
  }

  setupCanvas() {
    const container = document.getElementById('game-container');
    
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    const resize = () => {
      const containerW = container.clientWidth;
      const containerH = container.clientHeight;
      
      const aspect = this.width / this.height;
      let canvasW, canvasH;
      
      if (containerW / containerH > aspect) {
        canvasH = Math.min(containerH * 0.95, this.height);
        canvasW = canvasH * aspect;
      } else {
        canvasW = Math.min(containerW * 0.95, this.width);
        canvasH = canvasW / aspect;
      }
      
      this.canvas.style.width = `${canvasW}px`;
      this.canvas.style.height = `${canvasH}px`;
    };
    
    resize();
    window.addEventListener('resize', resize);
  }

  setupSystems() {
    this.particles = new ParticleManager(500);
    this.bullets = new BulletManager();
    this.powerups = new PowerUpManager();
    this.player = new Player();
    this.enemies = new EnemyManager();
    this.boss = new Boss();
    this.level = new LevelManager(this);
    this.shop = new ShopManager(this);
    this.collision = new CollisionManager(this);
    this.renderer = new Renderer(this.canvas, this);
    this.ui = new UIManager(this);
  }

  setupInput() {
    Input.init(this.canvas);
    
    document.querySelectorAll('.menu-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        this.handleMenuAction(action);
        AudioManager.resume();
      });
    });
    
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.parentElement;
      parent.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (parent.id === 'difficulty-options') {
        this.settings.difficulty = btn.dataset.value;
        this.difficulty = btn.dataset.value;
      }
    });
    });
    
    const bgmSlider = document.getElementById('bgm-volume');
    const bgmValue = document.getElementById('bgm-value');
    if (bgmSlider) {
      bgmSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        this.settings.bgmVolume = val / 100;
        AudioManager.setBgmVolume(val / 100);
        if (bgmValue) bgmValue.textContent = val + '%';
      });
    }
    
    const sfxSlider = document.getElementById('sfx-volume');
    const sfxValue = document.getElementById('sfx-value');
    if (sfxSlider) {
      sfxSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        this.settings.sfxVolume = val / 100;
        AudioManager.setSfxVolume(val / 100);
        if (sfxValue) sfxValue.textContent = val + '%';
      });
    }
    
    const showFps = document.getElementById('show-fps');
    if (showFps) {
      showFps.addEventListener('change', (e) => {
        this.showFPS = e.target.checked;
      });
    }
    
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' || e.code === 'KeyP') {
        if (this.status === 'PLAYING') {
          this.pause();
        } else if (this.status === 'PAUSED') {
          this.resume();
        }
      }
      
      if (e.code === 'KeyB' && this.debugMode) {
        this.bombs++;
      }
      
      if (e.code === 'KeyI' && this.debugMode) {
        this.player.invincible = !this.player.invincible;
      }
      
      if (e.code === 'KeyK' && this.debugMode) {
        this.enemies.clear();
      }
      
      if (e.code === 'KeyL' && this.debugMode) {
        this.gameTime += 10000;
      }
    });
  }

  setupUI() {
    this.ui.buildLevelGrid(this.saveData.unlockedLevel || 1, this.saveData.ratings || {});
  }

  handleMenuAction(action) {
    switch (action) {
      case 'start':
        this.startLevel(0);
        break;
      case 'levelSelect':
        this.ui.buildLevelGrid(this.saveData.unlockedLevel || 1, this.saveData.ratings || {});
        this.ui.showScreen('levelSelect');
        break;
      case 'settings':
        this.ui.showScreen('settings');
        break;
      case 'shop':
        this.ui.openShop();
        this.ui.showScreen('shop');
        break;
      case 'menu':
        this.returnToMenu();
        break;
      case 'resume':
        this.resume();
        break;
      case 'restart':
        this.restart();
        break;
      case 'nextLevel':
        this.nextLevel();
        break;
      case 'testGogogo':
        // 菜单里一键测试：不用开局就能直接听效果+看详细诊断
        AudioManager.init();
        AudioManager.resume();
        this.ui.showBanner('🎵 正在试听 gogogo 出发喽…', { style: 'info', duration: 1500 });
        setTimeout(() => AudioManager.playGoGoGo(this.ui), 300);
        break;
    }
  }

  startLevel(levelIndex) {
    AudioManager.init();
    AudioManager.resume();

    this.status = 'PLAYING';
    this.currentLevelIndex = levelIndex;
    this.score = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.bombs = 2;
    this.kills = 0;
    this.grazeCount = 0;
    this.gameTime = 0;
    this.scoreMultiplier = 1;
    this.scoreMultiplierTimer = 0;
    this.screenShake = 0;

    this.player.init(this);
    this.shop.applyShipToPlayer(this.player);
    this.bullets.clear();
    this.enemies.clear();
    this.powerups.clear();
    this.particles.clear();
    this.boss.active = false;

    this.level.startLevel(levelIndex);

    this.ui.hideAllScreens();
    this.ui.showHUD();
    this.ui.updateScore(0);
    this.ui.updateLives();
    this.ui.updateBombs();
    this.ui.updateWeapon();
    this.ui.updateEnergy();
    this.ui.hideBossHp();

    AudioManager.startBgm(this.currentLevelIndex);

    // ====== 开场宣告：邓超式"gogogo出发喽" ======
    // 注意：AudioManager.playGoGoGo / playAnnouncementDing 必须放在 startLevel 同步路径的最尾端，
    // 且不能套任何 setTimeout，否则浏览器会判定"已脱离用户点击手势"，
    // 导致 audio.play() 被 autoplay 策略 NotAllowedError 拦截，
    // 然后级联 fallback 到机械语音合成（用户听到的"机械音"）。
    AudioManager.playAnnouncementDing();
    if (this.ui && typeof this.ui.showBanner === 'function') {
      this.ui.showBanner('GO! GO! GO! 出发喽！', { style: 'start', duration: 2600 });
    }
    // 邓超原声（无机械 fallback！全部音频失败只会多叮一声，不会念机械音）
    AudioManager.playGoGoGo(this.ui);
  }

  pause() {
    if (this.status !== 'PLAYING') return;
    this.previousStatus = this.status;
    this.status = 'PAUSED';
    this.ui.showScreen('pause');
    AudioManager.stopBgm();
  }

  resume() {
    if (this.status !== 'PAUSED') return;
    this.status = 'PLAYING';
    this.ui.hideAllScreens();
    this.ui.showHUD();
    AudioManager.startBgm(this.currentLevelIndex);
  }

  restart() {
    this.ui.hideAllScreens();
    this.startLevel(this.currentLevelIndex);
  }

  nextLevel() {
    const next = this.currentLevelIndex + 1;
    if (next < LEVELS.length) {
      this.startLevel(next);
    } else {
      this.returnToMenu();
    }
  }

  returnToMenu() {
    this.status = 'MENU';
    this.player.active = false;
    this.bullets.clear();
    this.enemies.clear();
    this.powerups.clear();
    this.particles.clear();
    this.boss.active = false;
    this.ui.hideBossHp();
    this.ui.showScreen('menu');
    this.ui.updateHighScore(this.highScore);
    AudioManager.stopBgm();
  }

  gameOver() {
    this.status = 'GAME_OVER';
    this.ui.hideHUD();
    this.ui.hideBossHp();
    
    const earnedCredits = Math.floor(this.score / 5);
    if (earnedCredits > 0) {
      this.shop.addCredits(earnedCredits);
    }
    
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveData.highScore = this.highScore;
      this.saveSaveData();
    }
    
    this.ui.showGameOver(this.score, this.maxCombo || 0, this.kills, this.highScore, earnedCredits);
    AudioManager.stopBgm();
  }

  levelComplete() {
    this.status = 'VICTORY';
    this.ui.hideHUD();
    this.ui.hideBossHp();
    
    const baseCredits = Math.floor(this.score / 3);
    const timeBonus = Math.max(0, Math.floor((LEVELS[this.currentLevelIndex].duration - this.gameTime) / 1000) * 50);
    const ratingBonus = ['D','C','B','A','S'].indexOf(this.ui.calculateRating(this.score, this.score * 1.2)) * 500;
    const earnedCredits = baseCredits + timeBonus + ratingBonus;
    if (earnedCredits > 0) {
      this.shop.addCredits(earnedCredits);
    }
    
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveData.highScore = this.highScore;
    }
    
    const nextLevel = this.currentLevelIndex + 2;
    if (nextLevel > (this.saveData.unlockedLevel || 1)) {
      this.saveData.unlockedLevel = Math.min(nextLevel, LEVELS.length);
    }
    
    const rating = this.ui.calculateRating(this.score, this.score * 1.2);
    const levelKey = `level_${this.currentLevelIndex}`;
    const currentRating = this.saveData.ratings[levelKey];
    const ratingOrder = ['D', 'C', 'B', 'A', 'S'];
    if (!currentRating || ratingOrder.indexOf(rating) > ratingOrder.indexOf(currentRating)) {
      this.saveData.ratings[levelKey] = rating;
    }
    
    this.saveSaveData();
    
    this.ui.showVictory(this.score, this.maxCombo || 0, this.kills, this.gameTime, earnedCredits);
    AudioManager.stopBgm();
  }

  addScore(points) {
    const scoreMul = (this.player && this.player.shipStats) ? this.player.shipStats.scoreMul : 1.0;
    const finalPoints = Math.floor(points * this.scoreMultiplier * scoreMul);
    this.score += finalPoints;
    this.ui.updateScore(this.score);
  }

  addCombo() {
    this.combo++;
    this.comboTimer = 2000;
    if (this.combo > (this.maxCombo || 0)) {
      this.maxCombo = this.combo;
    }
    this.ui.updateCombo();
  }

  loop(currentTime) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    const dt = Math.min(deltaTime, 50);
    
    this.frameCount++;
    this.fpsTimer += dt;
    if (this.fpsTimer >= 1000) {
      this.fps = this.frameCount * (1000 / this.fpsTimer);
      this.frameCount = 0;
      this.fpsTimer = 0;
    }
    
    this.update(dt);
    this.render();
    
    Input.update();
    
    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    if (this.status !== 'PLAYING') return;
    
    this.gameTime += dt;
    
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.combo = 0;
        this.ui.updateCombo();
      }
    }
    
    if (this.scoreMultiplierTimer > 0) {
      this.scoreMultiplierTimer -= dt;
      if (this.scoreMultiplierTimer <= 0) {
        this.scoreMultiplier = 1;
      }
    }
    
    this.level.update(dt);
    this.player.update(dt, this);
    this.bullets.update(dt, this);
    this.enemies.update(dt, this);
    this.powerups.update(dt, this.player, this);
    this.particles.update(dt);
    this.boss.update(dt, this);
    this.collision.check();
    this.ui.update(dt);
    
    this.ui.updateEnergy();
  }

  render() {
    this.renderer.render();
    this.ui.draw(this.ctx);
  }

  loadSaveData() {
    try {
      const saved = localStorage.getItem('cyberFighterSave');
      if (saved) {
        this.saveData = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load save data');
    }
  }

  saveSaveData() {
    try {
      localStorage.setItem('cyberFighterSave', JSON.stringify(this.saveData));
    } catch (e) {
      console.warn('Failed to save data');
    }
  }
}
