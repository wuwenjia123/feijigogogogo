class CollisionManager {
  constructor(game) {
    this.game = game;
    this.grid = null;
  }

  check() {
    const game = this.game;
    if (!game.player || !game.player.active) return;
    
    this.checkPlayerBulletsVsEnemies();
    this.checkEnemyBulletsVsPlayer();
    this.checkPlayerVsEnemies();
    this.checkPlayerBulletsVsBoss();
    this.checkGraze();
  }

  checkPlayerBulletsVsEnemies() {
    const game = this.game;
    
    game.bullets.playerBullets.forEach((bullet) => {
      if (!bullet.active) return;
      
      game.enemies.pool.forEach((enemy) => {
        if (!enemy.active) return;
        if (bullet.hitEnemies && bullet.hitEnemies.includes(enemy)) return;
        
        const dx = bullet.x - enemy.x;
        const dy = bullet.y - enemy.y;
        const hitRadius = bullet.radius + enemy.width / 2.5;
        
        if (dx * dx + dy * dy < hitRadius * hitRadius) {
          let finalDamage = bullet.damage;
          if (bullet.instakillChance && Math.random() < bullet.instakillChance) {
            finalDamage = 999999;
            game.particles.emit(enemy.x, enemy.y, {
              count: 25,
              speedMin: 2,
              speedMax: 8,
              lifeMin: 300,
              lifeMax: 700,
              sizeMin: 2,
              sizeMax: 5,
              colors: ['#8800ff', '#ffffff', '#cc66ff'],
              blendMode: 'lighter'
            });
          }
          enemy.takeDamage(finalDamage, game);
          
          if (bullet.pierce > 0) {
            bullet.pierce--;
            if (bullet.hitEnemies) bullet.hitEnemies.push(enemy);
          } else {
            bullet.active = false;
          }
          
          game.particles.emit(bullet.x, bullet.y, {
            count: 5,
            speedMin: 1,
            speedMax: 3,
            lifeMin: 100,
            lifeMax: 250,
            sizeMin: 1,
            sizeMax: 3,
            colors: [bullet.color, '#ffffff'],
            blendMode: 'lighter'
          });
          
          AudioManager.playHit();
        }
      });
    });
  }

  checkEnemyBulletsVsPlayer() {
    const game = this.game;
    const player = game.player;
    
    game.bullets.enemyBullets.forEach((bullet) => {
      if (!bullet.active) return;
      
      const dx = bullet.x - player.x;
      const dy = bullet.y - player.y;
      const hitRadius = bullet.radius + player.hitboxRadius;
      
      if (dx * dx + dy * dy < hitRadius * hitRadius) {
        bullet.active = false;
        player.takeDamage(game);
      }
    });
  }

  checkPlayerVsEnemies() {
    const game = this.game;
    const player = game.player;
    
    game.enemies.pool.forEach((enemy) => {
      if (!enemy.active) return;
      
      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y;
      const hitRadius = player.hitboxRadius + enemy.width / 3;
      
      if (dx * dx + dy * dy < hitRadius * hitRadius) {
        player.takeDamage(game);
        enemy.takeDamage(5, game);
      }
    });
    
    if (game.boss && game.boss.active && !game.boss.entryAnimation) {
      const dx = player.x - game.boss.x;
      const dy = player.y - game.boss.y;
      const hitRadius = player.hitboxRadius + game.boss.width / 4;
      
      if (dx * dx + dy * dy < hitRadius * hitRadius) {
        player.takeDamage(game);
      }
    }
  }

  checkPlayerBulletsVsBoss() {
    const game = this.game;
    if (!game.boss || !game.boss.active || game.boss.entryAnimation) return;
    
    const boss = game.boss;
    
    game.bullets.playerBullets.forEach((bullet) => {
      if (!bullet.active) return;
      
      const dx = bullet.x - boss.x;
      const dy = bullet.y - boss.y;
      const hitRadius = bullet.radius + boss.width / 3;
      
      if (Math.abs(dx) < boss.width / 2 && Math.abs(dy) < boss.height / 2) {
        if (dx * dx + dy * dy < hitRadius * hitRadius || 
            (Math.abs(dx) < boss.width / 3 && Math.abs(dy) < boss.height / 3)) {
          let finalDamage = bullet.damage;
          if (bullet.instakillChance && Math.random() < bullet.instakillChance) {
            finalDamage = bullet.damage * 3;
            game.particles.emit(boss.x, boss.y, {
              count: 40,
              speedMin: 3,
              speedMax: 10,
              lifeMin: 400,
              lifeMax: 800,
              sizeMin: 3,
              sizeMax: 6,
              colors: ['#8800ff', '#ffffff', '#cc66ff'],
              blendMode: 'lighter'
            });
          }
          boss.takeDamage(finalDamage, game);
          
          if (bullet.pierce > 0) {
            bullet.pierce--;
          } else {
            bullet.active = false;
          }
          
          game.particles.emit(bullet.x, bullet.y, {
            count: 5,
            speedMin: 1,
            speedMax: 3,
            lifeMin: 100,
            lifeMax: 250,
            sizeMin: 1,
            sizeMax: 3,
            colors: [bullet.color, '#ffffff'],
            blendMode: 'lighter'
          });
          
          AudioManager.playHit();
        }
      }
    });
  }

  checkGraze() {
    const game = this.game;
    const player = game.player;
    
    game.bullets.enemyBullets.forEach((bullet) => {
      if (!bullet.active) return;
      if (bullet.grazed) return;
      
      const dx = bullet.x - player.x;
      const dy = bullet.y - player.y;
      const distSq = dx * dx + dy * dy;
      const grazeRadius = bullet.radius + player.hitboxRadius + 12;
      const hitRadius = bullet.radius + player.hitboxRadius;
      
      if (distSq < grazeRadius * grazeRadius && distSq > hitRadius * hitRadius) {
        bullet.grazed = true;
        game.addScore(10);
        player.addCharge(1);
        game.grazeCount++;
        
        game.particles.emit(bullet.x, bullet.y, {
          count: 3,
          speedMin: 0.5,
          speedMax: 2,
          lifeMin: 150,
          lifeMax: 300,
          sizeMin: 2,
          sizeMax: 3,
          colors: ['#ff0066', '#ff6699'],
          blendMode: 'lighter'
        });
      }
    });
  }
}
