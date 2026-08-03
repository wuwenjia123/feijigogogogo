class UIManager {
  constructor(game) {
    this.game = game;
    this.screens = {};
    this.hud = null;
    this.floatingTexts = [];
    this.messageTimer = 0;
    this.messageText = '';
    this.messageColor = '#ffffff';
    
    this.initElements();
  }

  initElements() {
    this.screens = {
      menu: document.getElementById('menu-screen'),
      pause: document.getElementById('pause-screen'),
      gameover: document.getElementById('gameover-screen'),
      victory: document.getElementById('victory-screen'),
      levelSelect: document.getElementById('level-select-screen'),
      settings: document.getElementById('settings-screen'),
      shop: document.getElementById('shop-screen')
    };
    
    this.hud = {
      container: document.getElementById('hud'),
      score: document.getElementById('hud-score'),
      lives: document.getElementById('hud-lives'),
      bombs: document.getElementById('hud-bombs'),
      level: document.getElementById('hud-level'),
      combo: document.getElementById('hud-combo'),
      weaponName: document.getElementById('weapon-name'),
      weaponLevel: document.getElementById('weapon-level'),
      energyFill: document.getElementById('energy-fill'),
      bossHpContainer: document.getElementById('boss-hp-container'),
      bossName: document.getElementById('boss-name'),
      bossHpFill: document.getElementById('boss-hp-fill'),
      // ===== 新增：BOSS 出现进度条 =====
      bossComingContainer: document.getElementById('boss-coming-container'),
      bossComingFill: document.getElementById('boss-coming-fill'),
      bossComingPercent: document.getElementById('boss-coming-percent')
    };
    
    this.shopState = {
      tab: 'weapons'
    };
    
    this.warningOverlay = document.getElementById('warning-overlay');
    this.fpsDisplay = document.getElementById('fps-display');
    this.gameBanner = document.getElementById('game-banner');
    this.gameBannerText = document.getElementById('game-banner-text');
    this._bannerTimer = null;
  }

  showScreen(name) {
    Object.values(this.screens).forEach(s => s.classList.add('hidden'));
    
    if (this.screens[name]) {
      this.screens[name].classList.remove('hidden');
    }
    
    if (name === 'menu' || name === 'levelSelect' || name === 'settings') {
      this.hideHUD();
    }
  }

  hideAllScreens() {
    Object.values(this.screens).forEach(s => s.classList.add('hidden'));
  }

  showHUD() {
    if (this.hud.container) {
      this.hud.container.classList.remove('hidden');
    }
    // ===== 【防空白补丁】HUD一显示就立刻强制刷新所有 HUD 元素 =====
    // 避免因为时序问题（player还没初始化/继续游戏）导致心脏/炸弹/武器是空的
    try { this.updateLives();   } catch (_) {}
    try { this.updateBombs();   } catch (_) {}
    try { this.updateWeapon();  } catch (_) {}
    try { this.updateEnergy();  } catch (_) {}
    try { this.updateCombo();   } catch (_) {}
    try { this.updateScore(this.game ? (this.game.score || 0) : 0); } catch (_) {}
  }

  hideHUD() {
    if (this.hud.container) {
      this.hud.container.classList.add('hidden');
    }
  }

  updateScore(score) {
    if (this.hud.score) {
      this.hud.score.textContent = Utils.formatNumber(score);
    }
  }

  updateLives() {
    // ===== 【防空白补丁】即使 player 还没初始化，也先渲染默认 5 颗心（避免 huds-lives 空的看不见） =====
    const hasPlayer = !!(this.game && this.game.player);
    const hpRaw = hasPlayer ? this.game.player.hp : 5;
    const maxHpRaw = hasPlayer ? this.game.player.maxHp : 5;
    const hp = Math.max(0, Number(hpRaw || 0));
    const maxHp = Math.max(1, Number(maxHpRaw || hp || 1));

    if (!this.hud.lives) return;

    let heartsHtml = '';
    for (let i = 0; i < maxHp; i++) {
      const active = i < hp;
      // 实心大心❤，死了变空心♡ + 降透明度
      heartsHtml += `<span class="life-icon ${active ? 'alive' : 'dead'}">${active ? '❤' : '♡'}</span>`;
    }
    // 数字：红色加粗 xHP/maxHP
    this.hud.lives.innerHTML = `
      <div class="life-hearts">${heartsHtml}</div>
      <div class="life-count">× ${hp} / ${maxHp}</div>
    `;
  }

  updateBombs() {
    if (!this.hud.bombs) return;
    
    let html = '';
    for (let i = 0; i < this.game.bombs; i++) {
      html += `<span class="bomb-icon">💣</span>`;
    }
    this.hud.bombs.innerHTML = html;
  }

  updateLevel(id, name) {
    if (this.hud.level) {
      this.hud.level.textContent = `STAGE ${id}`;
    }
  }

  updateCombo() {
    if (!this.hud.combo) return;
    
    const combo = this.game.combo;
    if (combo >= 5) {
      this.hud.combo.textContent = `x${combo} COMBO!`;
      this.hud.combo.classList.add('active');
    } else {
      this.hud.combo.classList.remove('active');
    }
  }

  updateWeapon() {
    if (!this.game.player || !this.hud.weaponName) return;
    
    const weapon = WEAPONS[this.game.player.currentWeapon];
    if (weapon) {
      this.hud.weaponName.textContent = this.game.player.currentWeapon;
      this.hud.weaponName.style.color = weapon.color;
      this.hud.weaponLevel.textContent = `Lv.${this.game.player.weaponLevel}`;
    }
  }

  updateEnergy() {
    if (!this.game.player || !this.hud.energyFill) return;
    
    const percent = (this.game.player.charge / this.game.player.maxCharge) * 100;
    this.hud.energyFill.style.width = `${percent}%`;
  }

  // ===== 新增：BOSS 出现进度条 =====
  /**
   * 更新 BOSS 出现进度
   * @param {number} progressPercent 0~100
   *   - <0 或 >=100 或没有 bossEntryTime 时自动隐藏
   *   - 建议从 level.update() 调用： progressPercent = levelTime / bossEntryTime * 100
   */
  updateBossComingProgress(progressPercent) {
    if (!this.hud.bossComingContainer || !this.hud.bossComingFill) return;

    const p = Number(progressPercent || 0);
    const clamped = Math.max(0, Math.min(100, p));

    // ===== 显示/隐藏策略： =====
    // 进度在 2%~99% 之间才显示（刚开始关卡就显示的话0%没意义，快到100%才显示）
    // 超过 100% 或 <0 就隐藏（Boss 已出现或还没到 bossEntryTime / 关卡数据无 boss）
    if (clamped < 2 || clamped >= 99.9) {
      this.hideBossComing();
      return;
    }

    // 显示进度条
    if (this.hud.bossComingContainer.classList.contains('hidden')) {
      this.hud.bossComingContainer.classList.remove('hidden');
    }
    // 填充宽度
    this.hud.bossComingFill.style.width = `${clamped}%`;
    // 百分比文字（整数）
    if (this.hud.bossComingPercent) {
      this.hud.bossComingPercent.textContent = `${Math.floor(clamped)}%`;
    }
    // 脉冲高亮：接近 80% 时变红闪烁
    if (clamped >= 80) {
      this.hud.bossComingContainer.classList.add('danger');
    } else {
      this.hud.bossComingContainer.classList.remove('danger');
    }
  }

  showBossComing() {
    if (this.hud.bossComingContainer) {
      this.hud.bossComingContainer.classList.remove('hidden');
    }
  }

  hideBossComing() {
    if (this.hud.bossComingContainer) {
      this.hud.bossComingContainer.classList.add('hidden');
      this.hud.bossComingContainer.classList.remove('danger');
    }
    if (this.hud.bossComingFill) {
      this.hud.bossComingFill.style.width = '0%';
    }
    if (this.hud.bossComingPercent) {
      this.hud.bossComingPercent.textContent = '0%';
    }
  }

  showBossWarning() {
    if (this.warningOverlay) {
      this.warningOverlay.classList.remove('hidden');
      setTimeout(() => {
        this.warningOverlay.classList.add('hidden');
      }, 2000);
    }
  }

  /**
   * 显示游戏大字横幅（出发喽 / 敌军还有1秒到达战场 等）
   * @param {string} text - 要显示的文字
   * @param {object} opts - 选项
   *   - duration: 显示时长(ms)，默认 2300（匹配CSS动画）
   *   - style: 视觉主题 'default' | 'start'(金色激昂) | 'warning'(橙红警示)
   *   - delay: 延迟(ms)显示，默认0
   */
  showBanner(text, opts = {}) {
    if (!this.gameBanner || !this.gameBannerText) return;
    const duration = opts.duration ?? 2300;
    const style = opts.style ?? 'default';
    const delay = opts.delay ?? 0;

    const show = () => {
      // 先清之前的定时，避免叠加
      if (this._bannerTimer) {
        clearTimeout(this._bannerTimer);
        this._bannerTimer = null;
      }

      // 重置动画：通过克隆节点 or remove+add class 重新触发
      this.gameBanner.classList.remove('hidden');
      this.gameBanner.classList.remove('banner-start', 'banner-warning', 'banner-debug', 'banner-warn');
      if (style === 'start') this.gameBanner.classList.add('banner-start');
      if (style === 'warning') this.gameBanner.classList.add('banner-warning');
      if (style === 'debug') this.gameBanner.classList.add('banner-debug');
      if (style === 'warn') this.gameBanner.classList.add('banner-warn');

      this.gameBannerText.textContent = text;

      // 重新触发 CSS animation
      const inner = this.gameBanner.querySelector('.banner-inner');
      if (inner) {
        inner.style.animation = 'none';
        // 强制 reflow
        void inner.offsetWidth;
        inner.style.animation = '';
      }
      const textEl = this.gameBannerText;
      if (textEl) {
        textEl.style.animation = 'none';
        void textEl.offsetWidth;
        textEl.style.animation = '';
      }

      this._bannerTimer = setTimeout(() => {
        this.gameBanner.classList.add('hidden');
        this._bannerTimer = null;
      }, duration);
    };

    if (delay > 0) setTimeout(show, delay);
    else show();
  }

  showBossHp(boss) {
    if (this.hud.bossHpContainer) {
      this.hud.bossHpContainer.classList.remove('hidden');
      this.hud.bossName.textContent = boss.name;
      this.hud.bossHpFill.style.width = '100%';
    }
  }

  hideBossHp() {
    if (this.hud.bossHpContainer) {
      this.hud.bossHpContainer.classList.add('hidden');
    }
  }

  updateBossHp(boss) {
    if (this.hud.bossHpFill) {
      const percent = Math.max(0, (boss.hp / boss.maxHp) * 100);
      this.hud.bossHpFill.style.width = `${percent}%`;
    }
  }

  showMessage(text, color = '#ffffff', duration = 1500) {
    this.messageText = text;
    this.messageColor = color;
    this.messageTimer = duration;
  }

  update(dt) {
    if (this.messageTimer > 0) {
      this.messageTimer -= dt;
    }
    
    if (this.game.showFPS) {
      this.fpsDisplay?.classList.remove('hidden');
      if (this.fpsDisplay) {
        this.fpsDisplay.textContent = `FPS: ${Math.round(this.game.fps)}`;
      }
    } else {
      this.fpsDisplay?.classList.add('hidden');
    }
  }

  draw(ctx) {
    if (this.messageTimer > 0 && this.messageText) {
      const alpha = Math.min(1, this.messageTimer / 500);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = 'bold 24px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = this.messageColor;
      ctx.shadowColor = this.messageColor;
      ctx.shadowBlur = 10;
      ctx.fillText(this.messageText, this.game.width / 2, this.game.height / 3);
      ctx.restore();
    }
  }

  updateHighScore(score) {
    const hs = document.getElementById('menu-high-score');
    if (hs) {
      hs.textContent = Utils.formatNumber(score);
    }
    const credits = document.getElementById('menu-credits');
    if (credits && this.game.shop) {
      credits.textContent = Utils.formatNumber(this.game.shop.getTotalCredits());
    }
  }

  showGameOver(score, combo, kills, highScore, earnedCredits = 0) {
    document.getElementById('final-score').textContent = Utils.formatNumber(score);
    document.getElementById('final-combo').textContent = `x${combo}`;
    document.getElementById('final-kills').textContent = kills;
    document.getElementById('final-high-score').textContent = Utils.formatNumber(highScore);
    document.getElementById('final-rating').textContent = this.calculateRating(score, highScore);
    const creditRow = document.getElementById('final-credits');
    if (earnedCredits > 0) {
      if (!creditRow) {
        const stats = document.querySelector('#gameover-screen .result-stats');
        if (stats) {
          const row = document.createElement('div');
          row.className = 'stat-row';
          row.id = 'final-credits';
          row.innerHTML = `<span class="stat-label">获得积分</span><span class="stat-value" style="color:#ffcc00">+${earnedCredits.toLocaleString()}</span>`;
          stats.appendChild(row);
        }
      } else {
        creditRow.querySelector('.stat-value').textContent = `+${earnedCredits.toLocaleString()}`;
      }
    }
    this.showScreen('gameover');
  }

  showVictory(score, combo, kills, time, earnedCredits = 0) {
    document.getElementById('victory-score').textContent = Utils.formatNumber(score);
    document.getElementById('victory-combo').textContent = `x${combo}`;
    document.getElementById('victory-kills').textContent = kills;
    document.getElementById('victory-time').textContent = Utils.formatTime(time);
    document.getElementById('victory-rating').textContent = this.calculateRating(score, score * 1.2);
    const creditRow = document.getElementById('victory-credits');
    if (earnedCredits > 0) {
      if (!creditRow) {
        const stats = document.querySelector('#victory-screen .result-stats');
        if (stats) {
          const row = document.createElement('div');
          row.className = 'stat-row';
          row.id = 'victory-credits';
          row.innerHTML = `<span class="stat-label">获得积分</span><span class="stat-value" style="color:#ffcc00">+${earnedCredits.toLocaleString()}</span>`;
          stats.appendChild(row);
        }
      } else {
        creditRow.querySelector('.stat-value').textContent = `+${earnedCredits.toLocaleString()}`;
      }
    }
    this.showScreen('victory');
  }

  calculateRating(score, maxScore) {
    const ratio = score / Math.max(1, maxScore);
    if (ratio >= 0.9) return 'S';
    if (ratio >= 0.7) return 'A';
    if (ratio >= 0.5) return 'B';
    if (ratio >= 0.3) return 'C';
    return 'D';
  }

  buildLevelGrid(unlockedLevel, ratings) {
    const grid = document.getElementById('level-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    for (let i = 0; i < LEVELS.length; i++) {
      const level = LEVELS[i];
      const unlocked = i < unlockedLevel;
      const rating = ratings[i] || '-';
      
      const card = document.createElement('div');
      card.className = `level-card ${unlocked ? '' : 'locked'}`;
      card.innerHTML = `
        <div class="level-number">${level.id}</div>
        <div class="level-name">${level.name}</div>
        <div class="level-rating">${unlocked ? rating : '🔒'}</div>
      `;
      
      if (unlocked) {
        card.addEventListener('click', () => {
          this.game.startLevel(i);
        });
      }
      
      grid.appendChild(card);
    }
  }

  openShop() {
    if (!this.game.shop) return;
    this.shopState.tab = 'weapons';
    this.updateShopCredits();
    this.setupShopTabs();
    this.buildShopList();
  }

  updateShopCredits() {
    const el = document.getElementById('shop-credits');
    if (el && this.game.shop) {
      el.textContent = this.game.shop.getTotalCredits().toLocaleString();
    }
  }

  setupShopTabs() {
    const tabs = document.querySelectorAll('.shop-tab');
    tabs.forEach(tab => {
      tab.onclick = null;
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.shopState.tab = tab.dataset.tab;
        this.buildShopList();
      });
    });
  }

  buildShopList() {
    const list = document.getElementById('shop-list');
    if (!list || !this.game.shop) return;
    const shop = this.game.shop;
    list.innerHTML = '';
    
    const items = this.shopState.tab === 'weapons'
      ? Object.values(SHOP_WEAPONS)
      : Object.values(SHOP_SHIPS);
    
    items.forEach(item => {
      const owned = shop.isOwned(item.id, item.type);
      const selected = item.type === 'weapon'
        ? shop.getSelectedWeapon() === item.id
        : shop.getSelectedShip() === item.id;
      const canAfford = shop.getTotalCredits() >= item.price;
      
      const card = document.createElement('div');
      card.className = `shop-card${owned ? ' owned' : ''}${selected ? ' selected' : ''}`;
      card.style.setProperty('--item-color', item.color);
      
      const priceHtml = owned
        ? (selected
            ? '<span class="shop-price equipped">已装备</span>'
            : `<button class="shop-btn equip">装备</button>`)
        : (canAfford
            ? `<button class="shop-btn buy">💰 ${shop.formatPrice(item.price)}</button>`
            : `<button class="shop-btn disabled" disabled>💰 ${shop.formatPrice(item.price)}</button>`);
      
      const tierStars = '★'.repeat(item.tier) + '☆'.repeat(Math.max(0, 5 - item.tier));
      const imageHtml = item.image
        ? item.image
        : `<div class="shop-icon" style="background: ${item.color}; box-shadow: 0 0 15px ${item.color};"></div>`;
      
      card.innerHTML = `
        <div class="shop-image-wrap">
          <div class="shop-image">${imageHtml}</div>
          <div class="shop-tier-badge">${tierStars}</div>
        </div>
        <div class="shop-info">
          <div class="shop-name" style="color:${item.color}">${item.name}</div>
          <div class="shop-desc">${item.description}</div>
          <div class="shop-card-footer">
            ${priceHtml}
          </div>
        </div>
      `;
      
      const btn = card.querySelector('.shop-btn');
      if (btn && !btn.disabled) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (owned) {
            if (item.type === 'weapon') {
              shop.setSelectedWeapon(item.id);
              this.setShopHint(`武器已装备：${item.name}`, item.color);
            } else {
              shop.setSelectedShip(item.id);
              this.setShopHint(`战舰已装备：${item.name}`, item.color);
            }
            this.updateShopCredits();
            this.buildShopList();
            this.updateHighScore(this.game.highScore);
          } else {
            const result = shop.buy(item.id, item.type);
            if (result.success) {
              this.setShopHint(result.message, '#00ff88');
              if (item.type === 'weapon') shop.setSelectedWeapon(item.id);
              else shop.setSelectedShip(item.id);
              this.updateShopCredits();
              this.buildShopList();
              this.updateHighScore(this.game.highScore);
            } else {
              this.setShopHint(result.message, '#ff3366');
            }
          }
        });
      }
      
      list.appendChild(card);
    });
  }

  setShopHint(text, color = '#ffffff') {
    const hint = document.getElementById('shop-hint');
    if (hint) {
      hint.textContent = text;
      hint.style.color = color;
    }
  }
}
