const SHOP_WEAPONS = {
  LASER: {
    id: 'LASER',
    name: '激光炮',
    description: '稳定的蓝色激光，射速快，穿透力一般',
    type: 'weapon',
    price: 0,
    default: true,
    tier: 1,
    color: '#00f0ff',
    stats: { damage: '中等', fireRate: '快', spread: '低' },
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="laserBody" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#334466"/><stop offset="100%" stop-color="#112233"/>
    </linearGradient>
    <filter id="laserGlow"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  <rect x="10" y="30" width="70" height="20" rx="4" fill="url(#laserBody)" stroke="#00f0ff" stroke-width="1.5"/>
  <rect x="5" y="34" width="12" height="12" rx="2" fill="#1a2f50" stroke="#00f0ff"/>
  <polygon points="80,30 100,36 80,42" fill="#0a1a33" stroke="#00f0ff" stroke-width="1.5"/>
  <rect x="95" y="37" width="18" height="6" fill="#00f0ff" opacity="0.4" filter="url(#laserGlow)"/>
  <rect x="95" y="38" width="18" height="4" fill="#00f0ff"/>
  <circle cx="40" cy="40" r="4" fill="#00f0ff" filter="url(#laserGlow)"/>
  <circle cx="40" cy="40" r="2" fill="#fff"/>
  <line x1="20" y1="30" x2="70" y2="30" stroke="#00f0ff" stroke-width="0.8" opacity="0.6"/>
  <line x1="20" y1="50" x2="70" y2="50" stroke="#00f0ff" stroke-width="0.8" opacity="0.6"/>
</svg>`
  },
  SPREAD: {
    id: 'SPREAD',
    name: '散弹枪',
    description: '一次发射多发扇形弹幕，近距离输出极高',
    type: 'weapon',
    price: 3000,
    default: false,
    tier: 1,
    color: '#ffcc00',
    stats: { damage: '低', fireRate: '中', spread: '高' },
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="spreadGlow"><feGaussianBlur stdDeviation="1.8"/></filter></defs>
  <rect x="15" y="34" width="50" height="14" rx="3" fill="#3d2d00" stroke="#ffcc00" stroke-width="1.5"/>
  <rect x="58" y="30" width="18" height="22" rx="3" fill="#2a1f00" stroke="#ffcc00" stroke-width="1.5"/>
  <rect x="72" y="26" width="6" height="10" rx="1" fill="#2a1f00" stroke="#ffcc00"/>
  <rect x="72" y="46" width="6" height="10" rx="1" fill="#2a1f00" stroke="#ffcc00"/>
  <rect x="72" y="36" width="6" height="10" rx="1" fill="#2a1f00" stroke="#ffcc00"/>
  <circle cx="100" cy="20" r="3" fill="#ffcc00" filter="url(#spreadGlow)"/>
  <circle cx="108" cy="30" r="3" fill="#ffcc00" filter="url(#spreadGlow)"/>
  <circle cx="112" cy="40" r="3" fill="#ffcc00" filter="url(#spreadGlow)"/>
  <circle cx="108" cy="50" r="3" fill="#ffcc00" filter="url(#spreadGlow)"/>
  <circle cx="100" cy="60" r="3" fill="#ffcc00" filter="url(#spreadGlow)"/>
  <path d="M10,38 Q6,40 10,42 L18,42 L18,38 Z" fill="#ffcc00" opacity="0.7"/>
</svg>`
  },
  MISSILE: {
    id: 'MISSILE',
    name: '追踪导弹',
    description: '发射自动追踪敌人的导弹，单发伤害极高',
    type: 'weapon',
    price: 8000,
    default: false,
    tier: 2,
    color: '#ff6600',
    stats: { damage: '高', fireRate: '慢', spread: '无' },
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="missBody" x1="0" y1="0.5" x2="1" y2="0.5">
      <stop offset="0%" stop-color="#402a00"/><stop offset="100%" stop-color="#1a1100"/>
    </linearGradient>
    <filter id="missFire"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  <polygon points="20,30 85,30 98,40 85,50 20,50 30,40" fill="url(#missBody)" stroke="#ff6600" stroke-width="1.5"/>
  <circle cx="55" cy="40" r="5" fill="#ff6600" opacity="0.6"/>
  <circle cx="55" cy="40" r="2.5" fill="#fff" opacity="0.8"/>
  <polygon points="85,20 98,30 85,32" fill="#cc2200" stroke="#ff6600" stroke-width="1"/>
  <polygon points="85,48 98,50 85,60" fill="#cc2200" stroke="#ff6600" stroke-width="1"/>
  <path d="M100,38 L118,40 L100,42 Z" fill="#ffaa00" filter="url(#missFire)"/>
  <path d="M102,39 L114,40 L102,41 Z" fill="#fff"/>
  <line x1="30" y1="32" x2="80" y2="32" stroke="#ff6600" stroke-width="0.7" opacity="0.7"/>
  <line x1="30" y1="48" x2="80" y2="48" stroke="#ff6600" stroke-width="0.7" opacity="0.7"/>
</svg>`
  },
  PLASMA: {
    id: 'PLASMA',
    name: '等离子球',
    description: '环绕机体的能量球，接触敌人持续伤害',
    type: 'weapon',
    price: 15000,
    default: false,
    tier: 2,
    color: '#bf00ff',
    stats: { damage: '中', fireRate: '持续', spread: '范围' },
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="plasmaCore" cx="0.4" cy="0.4">
      <stop offset="0%" stop-color="#fff"/><stop offset="30%" stop-color="#ff99ff"/>
      <stop offset="70%" stop-color="#bf00ff"/><stop offset="100%" stop-color="#5500aa"/>
    </radialGradient>
    <filter id="plasmaGlow"><feGaussianBlur stdDeviation="3"/></filter>
  </defs>
  <circle cx="70" cy="40" r="28" fill="#bf00ff" opacity="0.2" filter="url(#plasmaGlow)"/>
  <circle cx="70" cy="40" r="22" fill="#bf00ff" opacity="0.35"/>
  <circle cx="70" cy="40" r="17" fill="url(#plasmaCore)"/>
  <circle cx="64" cy="33" r="4" fill="#fff" opacity="0.85"/>
  <circle cx="45" cy="20" r="7" fill="#bf00ff" opacity="0.8" filter="url(#plasmaGlow)"/>
  <circle cx="45" cy="20" r="4" fill="#ff99ff"/>
  <circle cx="30" cy="55" r="5" fill="#bf00ff" opacity="0.75" filter="url(#plasmaGlow)"/>
  <circle cx="30" cy="55" r="2.8" fill="#ff99ff"/>
  <circle cx="50" cy="62" r="3.5" fill="#bf00ff" opacity="0.7" filter="url(#plasmaGlow)"/>
  <circle cx="50" cy="62" r="2" fill="#ff99ff"/>
</svg>`
  },
  EMP: {
    id: 'EMP',
    name: '磁暴波',
    description: '充能释放全屏电磁脉冲，清屏神技',
    type: 'weapon',
    price: 25000,
    default: false,
    tier: 3,
    color: '#00ff88',
    stats: { damage: '极高', fireRate: '充能', spread: '全屏' },
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="empGlow"><feGaussianBlur stdDeviation="1.6"/></filter></defs>
  <circle cx="60" cy="40" r="30" fill="none" stroke="#00ff88" stroke-width="1.2" opacity="0.3" stroke-dasharray="2,3"/>
  <circle cx="60" cy="40" r="22" fill="none" stroke="#00ff88" stroke-width="1.5" opacity="0.55" stroke-dasharray="3,2"/>
  <circle cx="60" cy="40" r="14" fill="none" stroke="#00ff88" stroke-width="2" opacity="0.8"/>
  <circle cx="60" cy="40" r="7" fill="#00ff88" opacity="0.4" filter="url(#empGlow)"/>
  <circle cx="60" cy="40" r="4" fill="#00ff88"/>
  <path d="M58,30 L62,36 L58,38 L64,50" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M35,25 L38,29" stroke="#00ff88" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M85,28 L82,32" stroke="#00ff88" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M30,50 L34,48" stroke="#00ff88" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M88,52 L84,50" stroke="#00ff88" stroke-width="1.8" stroke-linecap="round"/>
</svg>`
  },
  RAILGUN: {
    id: 'RAILGUN',
    name: '轨道炮',
    description: '超高速穿透巨型光束，贯穿路径所有敌人',
    type: 'weapon',
    price: 45000,
    default: false,
    tier: 3,
    color: '#ffccff',
    stats: { damage: '极高', fireRate: '中', spread: '贯穿' },
    newWeapon: true,
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="railBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a3a55"/><stop offset="50%" stop-color="#2a1a33"/><stop offset="100%" stop-color="#4a3a55"/>
    </linearGradient>
    <filter id="railBeam"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  <polygon points="8,22 12,18 62,18 70,22 70,30 62,34 12,34 8,30" fill="url(#railBody)" stroke="#ffccff" stroke-width="1.5"/>
  <polygon points="8,46 12,50 62,50 70,46 70,38 62,34 12,34 8,38" fill="url(#railBody)" stroke="#ffccff" stroke-width="1.5"/>
  <rect x="66" y="24" width="3" height="32" fill="#ffccff" opacity="0.5"/>
  <rect x="74" y="28" width="40" height="24" fill="#ffccff" opacity="0.3" filter="url(#railBeam)"/>
  <rect x="74" y="33" width="40" height="14" fill="#ffccff" opacity="0.5" filter="url(#railBeam)"/>
  <rect x="74" y="36" width="40" height="8" fill="#ffccff"/>
  <circle cx="20" cy="26" r="2.5" fill="#ffccff" filter="url(#railBeam)"/>
  <circle cx="20" cy="48" r="2.5" fill="#ffccff" filter="url(#railBeam)"/>
</svg>`
  },
  FLAMETHROWER: {
    id: 'FLAMETHROWER',
    name: '火焰喷射器',
    description: '近距离锥形火焰，持续灼烧，DPS爆表',
    type: 'weapon',
    price: 60000,
    default: false,
    tier: 4,
    color: '#ff5522',
    stats: { damage: '极高', fireRate: '持续', spread: '锥形' },
    newWeapon: true,
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="fireBlur"><feGaussianBlur stdDeviation="2"/></filter></defs>
  <rect x="12" y="30" width="52" height="20" rx="4" fill="#331a0a" stroke="#ff5522" stroke-width="1.5"/>
  <rect x="58" y="34" width="12" height="12" rx="2" fill="#1a0d05" stroke="#ff5522" stroke-width="1.2"/>
  <circle cx="70" cy="40" r="4" fill="#ffaa00" opacity="0.8" filter="url(#fireBlur)"/>
  <polygon points="74,30 110,20 115,40 110,60 74,50" fill="#ff2200" opacity="0.3" filter="url(#fireBlur)"/>
  <polygon points="76,32 106,24 110,40 106,56 76,48" fill="#ff5522" opacity="0.45" filter="url(#fireBlur)"/>
  <polygon points="78,34 102,28 106,40 102,52 78,46" fill="#ffaa00" opacity="0.7"/>
  <polygon points="80,36 98,32 100,40 98,48 80,44" fill="#ffdd55"/>
  <path d="M20,50 Q22,65 30,68 L38,68 L40,54" fill="#2a1508" stroke="#ff5522" stroke-width="1"/>
</svg>`
  },
  VOID_LANCE: {
    id: 'VOID_LANCE',
    name: '虚空长矛',
    description: '混沌能量聚成的长矛，伤害爆炸并有概率秒杀',
    type: 'weapon',
    price: 120000,
    default: false,
    tier: 5,
    color: '#8800ff',
    stats: { damage: '灾难', fireRate: '慢', spread: '聚焦' },
    newWeapon: true,
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lanceG" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1a0033"/><stop offset="50%" stop-color="#5500aa"/>
      <stop offset="85%" stop-color="#cc66ff"/><stop offset="100%" stop-color="#fff"/>
    </linearGradient>
    <filter id="lanceGlow"><feGaussianBlur stdDeviation="2.5"/></filter>
  </defs>
  <polygon points="20,34 92,40 20,46" fill="#2a1508" stroke="#8800ff" stroke-width="1.5"/>
  <polygon points="92,40 112,34 118,40 112,46" fill="url(#lanceG)" stroke="#cc66ff" stroke-width="1.5"/>
  <polygon points="20,34 10,28 10,34" fill="#8800ff" opacity="0.8"/>
  <polygon points="20,46 10,52 10,46" fill="#8800ff" opacity="0.8"/>
  <polygon points="20,34 12,38 20,46 28,40" fill="#1a0033" stroke="#8800ff"/>
  <polygon points="80,38 110,40 80,42" fill="#8800ff" opacity="0.4" filter="url(#lanceGlow)"/>
  <polygon points="60,39 116,40 60,41" fill="#cc66ff" opacity="0.45" filter="url(#lanceGlow)"/>
  <circle cx="100" cy="40" r="3" fill="#fff" opacity="0.9"/>
  <circle cx="45" cy="40" r="2" fill="#cc66ff" filter="url(#lanceGlow)"/>
  <circle cx="65" cy="40" r="2" fill="#cc66ff" filter="url(#lanceGlow)"/>
</svg>`
  }
};

const SHOP_SHIPS = {
  CYBER_FIGHTER: {
    id: 'CYBER_FIGHTER',
    name: '战机·赛博',
    description: '平衡型标准战舰，性能全面稳定',
    type: 'ship',
    price: 0,
    default: true,
    tier: 1,
    color: '#00f0ff',
    bodyColor: '#1a3a5a',
    accentColor: '#00f0ff',
    stats: {
      speed: 6,
      hp: 3,
      hitbox: 3,
      fireRateMul: 1.0,
      damageMul: 1.0,
      scoreMul: 1.0
    },
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="ship1Glow"><feGaussianBlur stdDeviation="2"/></filter></defs>
  <ellipse cx="60" cy="68" rx="25" ry="6" fill="#00f0ff" opacity="0.35" filter="url(#ship1Glow)"/>
  <path d="M60,10 L40,55 L48,60 L60,50 L72,60 L80,55 Z" fill="#1a3a5a" stroke="#00f0ff" stroke-width="1.8"/>
  <path d="M60,22 L52,48 L60,42 L68,48 Z" fill="#00f0ff" opacity="0.8"/>
  <ellipse cx="60" cy="30" rx="4" ry="8" fill="#fff" opacity="0.9"/>
  <path d="M40,55 L18,65 L25,50 Z" fill="#1a3a5a" stroke="#00f0ff" stroke-width="1.5"/>
  <path d="M80,55 L102,65 L95,50 Z" fill="#1a3a5a" stroke="#00f0ff" stroke-width="1.5"/>
  <circle cx="48" cy="62" r="3" fill="#00f0ff" filter="url(#ship1Glow)"/>
  <circle cx="72" cy="62" r="3" fill="#00f0ff" filter="url(#ship1Glow)"/>
  <circle cx="48" cy="63" r="1.5" fill="#fff"/>
  <circle cx="72" cy="63" r="1.5" fill="#fff"/>
</svg>`
  },
  STORM_BREAKER: {
    id: 'STORM_BREAKER',
    name: '战舰·风暴破坏者',
    description: '高机动侦察舰，速度极快，擦弹更容易',
    type: 'ship',
    price: 10000,
    default: false,
    tier: 2,
    color: '#ffaa00',
    bodyColor: '#2a1f00',
    accentColor: '#ffaa00',
    stats: {
      speed: 8,
      hp: 2,
      hitbox: 2,
      fireRateMul: 1.0,
      damageMul: 1.0,
      scoreMul: 1.2
    },
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="ship2Glow"><feGaussianBlur stdDeviation="2"/></filter></defs>
  <ellipse cx="60" cy="70" rx="22" ry="5" fill="#ffaa00" opacity="0.4" filter="url(#ship2Glow)"/>
  <path d="M60,8 L38,58 L48,60 L60,48 L72,60 L82,58 Z" fill="#2a1f00" stroke="#ffaa00" stroke-width="1.8"/>
  <path d="M60,20 L54,50 L60,44 L66,50 Z" fill="#ffaa00" opacity="0.85"/>
  <ellipse cx="60" cy="28" rx="3.5" ry="7" fill="#fff" opacity="0.95"/>
  <path d="M38,58 L12,68 L22,50 Z" fill="#2a1f00" stroke="#ffaa00" stroke-width="1.5"/>
  <path d="M82,58 L108,68 L98,50 Z" fill="#2a1f00" stroke="#ffaa00" stroke-width="1.5"/>
  <path d="M50,58 L52,72 L55,60 Z" fill="#ffaa00" filter="url(#ship2Glow)"/>
  <path d="M70,58 L68,72 L65,60 Z" fill="#ffaa00" filter="url(#ship2Glow)"/>
  <path d="M56,58 L56,72 L58,60 Z" fill="#fff" opacity="0.85"/>
  <path d="M64,58 L64,72 L62,60 Z" fill="#fff" opacity="0.85"/>
</svg>`
  },
  IRON_WALL: {
    id: 'IRON_WALL',
    name: '堡垒·铁壁',
    description: '重甲火力舰，高血量，能承受更多伤害',
    type: 'ship',
    price: 20000,
    default: false,
    tier: 2,
    color: '#88aacc',
    bodyColor: '#334466',
    accentColor: '#88aacc',
    stats: {
      speed: 5,
      hp: 5,
      hitbox: 4,
      fireRateMul: 0.9,
      damageMul: 1.1,
      scoreMul: 1.0
    },
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="ship3Glow"><feGaussianBlur stdDeviation="2"/></filter></defs>
  <ellipse cx="60" cy="70" rx="30" ry="5" fill="#88aacc" opacity="0.35" filter="url(#ship3Glow)"/>
  <path d="M60,12 L30,55 L36,65 L60,58 L84,65 L90,55 Z" fill="#334466" stroke="#88aacc" stroke-width="2"/>
  <path d="M60,26 L52,52 L60,46 L68,52 Z" fill="#88aacc" opacity="0.8"/>
  <ellipse cx="60" cy="34" rx="5" ry="9" fill="#fff" opacity="0.9"/>
  <rect x="22" y="54" width="20" height="8" rx="2" fill="#334466" stroke="#88aacc" stroke-width="1.5"/>
  <rect x="78" y="54" width="20" height="8" rx="2" fill="#334466" stroke="#88aacc" stroke-width="1.5"/>
  <rect x="28" y="56" width="3" height="4" fill="#88aacc"/>
  <rect x="34" y="56" width="3" height="4" fill="#88aacc"/>
  <rect x="83" y="56" width="3" height="4" fill="#88aacc"/>
  <rect x="89" y="56" width="3" height="4" fill="#88aacc"/>
  <circle cx="46" cy="67" r="3" fill="#88aacc" filter="url(#ship3Glow)"/>
  <circle cx="74" cy="67" r="3" fill="#88aacc" filter="url(#ship3Glow)"/>
</svg>`
  },
  PHANTOM: {
    id: 'PHANTOM',
    name: '幽灵·幻影',
    description: '刺客型舰体，体积小判定点极小，适合高手',
    type: 'ship',
    price: 35000,
    default: false,
    tier: 3,
    color: '#66ff99',
    bodyColor: '#002211',
    accentColor: '#66ff99',
    stats: {
      speed: 7,
      hp: 3,
      hitbox: 1.5,
      fireRateMul: 1.1,
      damageMul: 1.0,
      scoreMul: 1.3
    },
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="ship4Glow"><feGaussianBlur stdDeviation="2"/></filter></defs>
  <ellipse cx="60" cy="66" rx="16" ry="4" fill="#66ff99" opacity="0.4" filter="url(#ship4Glow)"/>
  <path d="M60,14 L44,54 L50,58 L60,46 L70,58 L76,54 Z" fill="#002211" stroke="#66ff99" stroke-width="1.8"/>
  <path d="M60,24 L55,48 L60,42 L65,48 Z" fill="#66ff99" opacity="0.9"/>
  <ellipse cx="60" cy="32" rx="3" ry="6" fill="#fff" opacity="0.9"/>
  <path d="M44,54 L20,62 L30,50 Z" fill="#002211" stroke="#66ff99" stroke-width="1.5" opacity="0.85"/>
  <path d="M76,54 L100,62 L90,50 Z" fill="#002211" stroke="#66ff99" stroke-width="1.5" opacity="0.85"/>
  <path d="M54,56 L56,66 L58,58 Z" fill="#66ff99" opacity="0.85" filter="url(#ship4Glow)"/>
  <path d="M66,56 L64,66 L62,58 Z" fill="#66ff99" opacity="0.85" filter="url(#ship4Glow)"/>
  <circle cx="60" cy="36" r="1" fill="#fff" opacity="0.5"/>
</svg>`
  },
  STAR_DESTROYER: {
    id: 'STAR_DESTROYER',
    name: '歼星舰·毁灭者',
    description: '终极旗舰，速度、火力、血量全面提升',
    type: 'ship',
    price: 80000,
    default: false,
    tier: 4,
    color: '#ff0088',
    bodyColor: '#330022',
    accentColor: '#ff0088',
    stats: {
      speed: 7.5,
      hp: 5,
      hitbox: 3,
      fireRateMul: 1.2,
      damageMul: 1.3,
      scoreMul: 1.5
    },
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="ship5Glow"><feGaussianBlur stdDeviation="2.2"/></filter></defs>
  <ellipse cx="60" cy="70" rx="32" ry="6" fill="#ff0088" opacity="0.4" filter="url(#ship5Glow)"/>
  <path d="M60,8 L26,55 L36,68 L60,60 L84,68 L94,55 Z" fill="#330022" stroke="#ff0088" stroke-width="2"/>
  <path d="M60,22 L50,54 L60,46 L70,54 Z" fill="#ff0088" opacity="0.85"/>
  <ellipse cx="60" cy="30" rx="5" ry="10" fill="#fff" opacity="0.95"/>
  <path d="M26,55 L4,68 L20,50 Z" fill="#330022" stroke="#ff0088" stroke-width="1.8"/>
  <path d="M94,55 L116,68 L100,50 Z" fill="#330022" stroke="#ff0088" stroke-width="1.8"/>
  <circle cx="42" cy="70" r="3.5" fill="#ff0088" filter="url(#ship5Glow)"/>
  <circle cx="78" cy="70" r="3.5" fill="#ff0088" filter="url(#ship5Glow)"/>
  <circle cx="60" cy="70" r="3.5" fill="#ff0088" filter="url(#ship5Glow)"/>
  <path d="M60,52 L58,66 L56,54 Z" fill="#ff66aa"/>
  <path d="M60,52 L62,66 L64,54 Z" fill="#ff66aa"/>
</svg>`
  },
  APOCALYPSE_X: {
    id: 'APOCALYPSE_X',
    name: '启示录·X',
    description: '传说级战舰，灾难级火力与机动，积分加成无敌',
    type: 'ship',
    price: 200000,
    default: false,
    tier: 5,
    color: '#ffffff',
    bodyColor: '#000000',
    accentColor: '#ff3366',
    stats: {
      speed: 9,
      hp: 6,
      hitbox: 2.5,
      fireRateMul: 1.35,
      damageMul: 1.5,
      scoreMul: 2.0
    },
    image: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="apocG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff3366"/><stop offset="50%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#6600ff"/>
    </linearGradient>
    <filter id="ship6Glow"><feGaussianBlur stdDeviation="2.5"/></filter>
  </defs>
  <ellipse cx="60" cy="70" rx="34" ry="6" fill="#ffffff" opacity="0.3" filter="url(#ship6Glow)"/>
  <path d="M60,6 L22,52 L34,70 L60,60 L86,70 L98,52 Z" fill="#000000" stroke="url(#apocG)" stroke-width="2.2"/>
  <path d="M60,20 L48,52 L60,44 L72,52 Z" fill="url(#apocG)" opacity="0.9"/>
  <ellipse cx="60" cy="28" rx="4.5" ry="9" fill="#fff"/>
  <path d="M22,52 L2,70 L22,50 Z" fill="#000" stroke="#ff3366" stroke-width="1.8"/>
  <path d="M98,52 L118,70 L98,50 Z" fill="#000" stroke="#6600ff" stroke-width="1.8"/>
  <circle cx="40" cy="72" r="3.5" fill="#ff3366" filter="url(#ship6Glow)"/>
  <circle cx="60" cy="72" r="4" fill="#ffffff" filter="url(#ship6Glow)"/>
  <circle cx="80" cy="72" r="3.5" fill="#6600ff" filter="url(#ship6Glow)"/>
  <polygon points="60,44 56,64 60,68 64,64" fill="#ff3366" opacity="0.8"/>
</svg>`
  }
};

class ShopManager {
  constructor(game) {
    this.game = game;
    this.currentTab = 'weapons';
    this.currentItems = [];
    this.selectedItemId = null;
  }

  getWeapons() { return SHOP_WEAPONS; }
  getShips() { return SHOP_SHIPS; }

  getAllWeaponsOwned() {
    const save = this.game.saveData;
    const owned = save.ownedWeapons || [];
    if (!owned.includes('LASER')) owned.push('LASER');
    Object.values(SHOP_WEAPONS).forEach(w => {
      if (w.default && !owned.includes(w.id)) owned.push(w.id);
    });
    return owned;
  }

  getAllShipsOwned() {
    const save = this.game.saveData;
    const owned = save.ownedShips || [];
    if (!owned.includes('CYBER_FIGHTER')) owned.push('CYBER_FIGHTER');
    Object.values(SHOP_SHIPS).forEach(s => {
      if (s.default && !owned.includes(s.id)) owned.push(s.id);
    });
    return owned;
  }

  isWeaponOwned(id) {
    return this.getAllWeaponsOwned().includes(id);
  }

  isShipOwned(id) {
    return this.getAllShipsOwned().includes(id);
  }

  isOwned(id, type) {
    return type === 'weapon' ? this.isWeaponOwned(id) : this.isShipOwned(id);
  }

  getSelectedWeapon() {
    return this.game.saveData.selectedWeapon || 'LASER';
  }

  getSelectedShip() {
    return this.game.saveData.selectedShip || 'CYBER_FIGHTER';
  }

  setSelectedWeapon(id) {
    this.game.saveData.selectedWeapon = id;
    this.game.saveSaveData();
  }

  setSelectedShip(id) {
    this.game.saveData.selectedShip = id;
    this.game.saveSaveData();
  }

  getTotalCredits() {
    return this.game.saveData.totalCredits || 0;
  }

  addCredits(amount) {
    if (!this.game.saveData.totalCredits) this.game.saveData.totalCredits = 0;
    this.game.saveData.totalCredits += amount;
    this.game.saveSaveData();
    return this.game.saveData.totalCredits;
  }

  spendCredits(amount) {
    if (this.getTotalCredits() < amount) return false;
    this.game.saveData.totalCredits -= amount;
    this.game.saveSaveData();
    return true;
  }

  buyWeapon(id) {
    const w = SHOP_WEAPONS[id];
    if (!w) return { success: false, message: '商品不存在' };
    if (this.isWeaponOwned(id)) return { success: false, message: '已经拥有该武器' };
    if (this.getTotalCredits() < w.price) return { success: false, message: '积分不足' };
    if (!this.spendCredits(w.price)) return { success: false, message: '扣款失败' };
    if (!this.game.saveData.ownedWeapons) this.game.saveData.ownedWeapons = [];
    this.game.saveData.ownedWeapons.push(id);
    this.game.saveSaveData();
    return { success: true, message: `成功购买武器：${w.name}` };
  }

  buyShip(id) {
    const s = SHOP_SHIPS[id];
    if (!s) return { success: false, message: '商品不存在' };
    if (this.isShipOwned(id)) return { success: false, message: '已经拥有该战舰' };
    if (this.getTotalCredits() < s.price) return { success: false, message: '积分不足' };
    if (!this.spendCredits(s.price)) return { success: false, message: '扣款失败' };
    if (!this.game.saveData.ownedShips) this.game.saveData.ownedShips = [];
    this.game.saveData.ownedShips.push(id);
    this.game.saveSaveData();
    return { success: true, message: `成功购买战舰：${s.name}` };
  }

  buy(id, type) {
    return type === 'weapon' ? this.buyWeapon(id) : this.buyShip(id);
  }

  getShipConfig(id) {
    return SHOP_SHIPS[id] || SHOP_SHIPS.CYBER_FIGHTER;
  }

  applyShipToPlayer(player) {
    const shipId = this.getSelectedShip();
    const ship = this.getShipConfig(shipId);
    player.shipId = shipId;
    player.speed = ship.stats.speed;
    player.maxHp = ship.stats.hp;
    player.hp = ship.stats.hp;
    player.hitboxRadius = ship.stats.hitbox;
    player.shipStats = ship.stats;
    player.shipColors = {
      body: ship.bodyColor,
      accent: ship.accentColor
    };
    player.currentWeapon = this.getSelectedWeapon();
    player.applyChargeConfig();
    const wCfg = WEAPONS[player.currentWeapon];
    if (wCfg && wCfg.charge) {
      player.charge = wCfg.charge.start || 0;
    }
  }

  formatPrice(price) {
    if (price === 0) return '初始';
    if (price >= 100000) return (price / 10000).toFixed(1) + '万';
    if (price >= 10000) return (price / 10000).toFixed(1) + '万';
    return price.toLocaleString();
  }
}
