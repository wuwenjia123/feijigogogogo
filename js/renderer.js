class Renderer {
  constructor(canvas, game) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.game = game;
    this.width = canvas.width;
    this.height = canvas.height;
    this.shakeX = 0;
    this.shakeY = 0;
    this.flashAlpha = 0;
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
  }

  render() {
    const ctx = this.ctx;
    const game = this.game;
    
    ctx.save();
    
    if (game.screenShake > 0) {
      this.shakeX = Utils.random(-game.screenShake, game.screenShake);
      this.shakeY = Utils.random(-game.screenShake, game.screenShake);
      ctx.translate(this.shakeX, this.shakeY);
      game.screenShake *= 0.9;
      if (game.screenShake < 0.5) game.screenShake = 0;
    }
    
    if (game.level) {
      game.level.drawBackground(ctx, this.width, this.height);
    } else {
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, this.width, this.height);
    }
    
    if (game.powerups) {
      game.powerups.draw(ctx);
    }
    
    if (game.enemies) {
      game.enemies.draw(ctx);
    }
    
    if (game.boss) {
      game.boss.draw(ctx);
    }
    
    if (game.bullets) {
      game.bullets.draw(ctx);
    }
    
    if (game.player) {
      game.player.draw(ctx);
    }
    
    if (game.particles) {
      game.particles.draw(ctx);
    }
    
    if (this.flashAlpha > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.flashAlpha})`;
      ctx.fillRect(0, 0, this.width, this.height);
      this.flashAlpha *= 0.9;
      if (this.flashAlpha < 0.01) this.flashAlpha = 0;
    }
    
    ctx.restore();
    
    this.drawScanlines(ctx);
    
    if (game.debugMode) {
      this.drawDebug(ctx);
    }
  }

  drawScanlines(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.03;
    ctx.fillStyle = '#000000';
    for (let y = 0; y < this.height; y += 3) {
      ctx.fillRect(0, y, this.width, 1);
    }
    ctx.restore();
  }

  drawDebug(ctx) {
    ctx.save();
    ctx.fillStyle = '#00ff00';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    
    let y = 20;
    const lines = [
      `FPS: ${this.game.fps || 0}`,
      `Player: (${Math.floor(this.game.player?.x || 0)}, ${Math.floor(this.game.player?.y || 0)})`,
      `Enemies: ${this.game.enemies?.pool.count || 0}`,
      `PBullets: ${this.game.bullets?.playerBullets.count || 0}`,
      `EBullets: ${this.game.bullets?.enemyBullets.count || 0}`,
      `Particles: ${this.game.particles?.pool.count || 0}`,
      `Combo: ${this.game.combo}`,
      `Charge: ${this.game.player?.charge || 0}`,
    ];
    
    lines.forEach(line => {
      ctx.fillText(line, 10, y);
      y += 16;
    });
    
    ctx.restore();
  }

  flash(alpha = 0.5) {
    this.flashAlpha = alpha;
  }
}
