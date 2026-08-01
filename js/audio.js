const AudioManager = {
  ctx: null,
  masterGain: null,
  bgmGain: null,
  sfxGain: null,
  bgmVolume: 0.70,  // 原来 0.5 → 加大约 40%
  sfxVolume: 0.88,  // 原来 0.7 → 加大约 25%（避免破音上限留 12%）
  initialized: false,
  bgmOscillator: null,
  _currentBgm: null,
  _bgmNodes: [],
  _bgmInterval: null,
  _waveLfoGain: null,

  init() {
    if (this.initialized) return;

    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.value = this.bgmVolume;
      this.bgmGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.sfxVolume;
      this.sfxGain.connect(this.masterGain);

      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  },

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  setBgmVolume(v) {
    this.bgmVolume = v;
    if (this.bgmGain) {
      this.bgmGain.gain.value = v;
    }
  },

  setSfxVolume(v) {
    this.sfxVolume = v;
    if (this.sfxGain) {
      this.sfxGain.gain.value = v;
    }
  },

  playTone(freq, duration, type = 'sine', volume = 0.3) {
    if (!this.initialized) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(volume * this.sfxVolume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  },

  playShoot() { this.playTone(800, 0.05, 'square', 0.15); },
  playLaser() { this.playTone(1200, 0.08, 'sawtooth', 0.1); },

  playExplosion() {
    if (!this.initialized) return;
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.4 * this.sfxVolume;
    source.connect(filter); filter.connect(gain); gain.connect(this.sfxGain);
    source.start();
  },

  playHit() { this.playTone(200, 0.08, 'square', 0.2); },

  playPowerUp() {
    if (!this.initialized) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3 * this.sfxVolume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
    osc.connect(gain); gain.connect(this.sfxGain);
    osc.start(); osc.stop(this.ctx.currentTime + 0.2);
  },

  playBomb() {
    if (!this.initialized) return;
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.5);
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.8);
    const gain = this.ctx.createGain();
    gain.gain.value = 0.6 * this.sfxVolume;
    source.connect(filter); filter.connect(gain); gain.connect(this.sfxGain);
    source.start();
  },

  playHitPlayer() {
    this.playTone(150, 0.2, 'sawtooth', 0.3);
    setTimeout(() => this.playTone(100, 0.15, 'square', 0.25), 50);
  },

  playWarning() {
    this.playTone(600, 0.1, 'square', 0.2);
    setTimeout(() => this.playTone(600, 0.1, 'square', 0.2), 200);
  },

  playBossExplosion() { for (let i = 0; i < 5; i++) setTimeout(() => this.playExplosion(), i * 100); },

  startBgm(levelIndex = 0) {
    if (!this.initialized) return;
    this.stopBgm();
    // 【用户要求：海浪声取消】所有关卡统一用旋律 BGM，不再播放落日海岸海浪合成声
    this._startMelodyBgm();
    this._currentBgm = 'melody';
  },

  _startMelodyBgm() {
    const playNote = (freq, time, duration, peakVolume = 0.115) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, this.ctx.currentTime + time);
      // peakVolume 默认从 0.08 调到 0.115（+43%），整体更响亮不刺耳
      gain.gain.linearRampToValueAtTime(peakVolume * this.bgmVolume, this.ctx.currentTime + time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + time + duration);
      osc.connect(gain); gain.connect(this.bgmGain); this._bgmNodes.push(osc, gain);
      osc.start(this.ctx.currentTime + time); osc.stop(this.ctx.currentTime + time + duration);
    };
    const bassline = [110, 110, 146.83, 110, 123.47, 123.47, 146.83, 164.81];
    const melody   = [440, 523.25, 659.25, 523.25, 440, 493.88, 587.33, 493.88];
    // melody 再加 10%，高音突出更清楚
    const beat = 0.25; const patternLength = 8;
    const playPattern = () => {
      for (let i = 0; i < patternLength; i++) {
        playNote(bassline[i], i * beat, beat * 0.9, 0.11);                 // 低音：0.11
        playNote(melody[i],   i * beat, beat * 0.8, 0.13);                 // 主旋律：0.13（比低音响，更突出）
      }
    };
    this._bgmInterval = setInterval(() => { if (this.ctx && this.ctx.state === 'running') playPattern(0); }, beat * patternLength * 1000);
    playPattern();
  },

  _startOceanWavesBgm() {
    const ctx = this.ctx; const sr = ctx.sampleRate;
    const noiseSec = 4; const bufSize = sr * noiseSec; const noiseBuf = ctx.createBuffer(1, bufSize, sr);
    const nd = noiseBuf.getChannelData(0); let accum = 0;
    for (let i = 0; i < bufSize; i++) { accum += (Math.random() * 2 - 1) * 0.4; accum *= 0.995; if (accum > 1) accum = 1; if (accum < -1) accum = -1; nd[i] = accum; }
    const noiseSrc = ctx.createBufferSource(); noiseSrc.buffer = noiseBuf; noiseSrc.loop = true;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 70;
    const bp = ctx.createBiquadFilter(); bp.type = 'lowpass'; bp.frequency.value = 700;
    const waveGain = ctx.createGain(); waveGain.gain.value = 0.55 * this.bgmVolume;
    const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.11;
    const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.38 * this.bgmVolume;
    lfo.connect(lfoGain).connect(waveGain.gain); this._waveLfoGain = lfoGain;
    const crashBufSize = sr * noiseSec; const crashBuf = ctx.createBuffer(1, crashBufSize, sr);
    const cd = crashBuf.getChannelData(0); for (let i = 0; i < crashBufSize; i++) cd[i] = (Math.random() * 2 - 1);
    const crashSrc = ctx.createBufferSource(); crashSrc.buffer = crashBuf; crashSrc.loop = true;
    const crashHp = ctx.createBiquadFilter(); crashHp.type = 'highpass'; crashHp.frequency.value = 900;
    const crashGain = ctx.createGain(); crashGain.gain.value = 0.06 * this.bgmVolume;
    const crashLfoGain = ctx.createGain(); crashLfoGain.gain.value = 0.05 * this.bgmVolume;
    lfo.connect(crashLfoGain).connect(crashGain.gain);
    const droneOsc1 = ctx.createOscillator(); droneOsc1.type = 'sine'; droneOsc1.frequency.value = 62;
    const droneOsc2 = ctx.createOscillator(); droneOsc2.type = 'sine'; droneOsc2.frequency.value = 71;
    const droneGain = ctx.createGain(); droneGain.gain.value = 0.05 * this.bgmVolume;
    noiseSrc.connect(hp).connect(bp).connect(waveGain).connect(this.bgmGain);
    crashSrc.connect(crashHp).connect(crashGain).connect(this.bgmGain);
    droneOsc1.connect(droneGain); droneOsc2.connect(droneGain); droneGain.connect(this.bgmGain);
    const t = ctx.currentTime;
    noiseSrc.start(t); crashSrc.start(t); lfo.start(t); droneOsc1.start(t); droneOsc2.start(t);
    this._bgmNodes.push(noiseSrc, hp, bp, waveGain, lfo, lfoGain, crashSrc, crashHp, crashGain, crashLfoGain, droneOsc1, droneOsc2, droneGain);
  },

  stopBgm() {
    if (this._bgmInterval) { clearInterval(this._bgmInterval); this._bgmInterval = null; }
    if (this.bgmInterval) { clearInterval(this.bgmInterval); this.bgmInterval = null; }
    if (this.ctx) {
      const t = this.ctx.currentTime;
      this._bgmNodes.forEach((node) => {
        try { if (node && typeof node.stop === 'function') { try { node.stop(t + 0.05); } catch (_) {} } if (node && typeof node.disconnect === 'function') { try { node.disconnect(); } catch (_) {} } } catch (_) {}
      });
    }
    this._bgmNodes = []; this._waveLfoGain = null; this._currentBgm = null;
  },

  // ===== 语音合成 & 宣告音效 =====

  playSpeech(text, opts = {}) {
    if (!('speechSynthesis' in window)) return;
    try {
      try { window.speechSynthesis.cancel(); } catch (e) {}
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'zh-CN';
      utter.rate = opts.rate ?? 1.18;
      utter.pitch = opts.pitch ?? 1.18;
      utter.volume = opts.volume ?? (0.9 * this.sfxVolume);
      const pickBestVoice = () => {
        const voices = window.speechSynthesis.getVoices() || [];
        if (!voices.length) return null;
        const zhVoices = voices.filter(v => /zh[-_]?CN|Chinese|Mandarin/i.test(v.lang + ' ' + v.name));
        const maleNeural = zhVoices.find(v => /Yunjian|Yunyang|Hui|Kangkang|Guo\b|Yunxi|Yunxia|Neural|Natural|Premium/i.test(v.name) && /male|男|Yunjian|Yunyang|Guo/i.test(v.name + (v.gender || '')));
        const anyNeural = zhVoices.find(v => /Xiaoxiao|Xiaoyi|Google\s+.*Chinese|Microsoft.*(Xiaoxiao|Yaoyao|Huihui)|Natural|Neural|Premium/i.test(v.name));
        const googleMale = zhVoices.find(v => /google/i.test(v.name) && /hk|hk china|chinese hong|mandarin china|beijing|male|男/i.test(v.name + v.lang));
        const anyZh = zhVoices[0] || voices.find(v => /zh/i.test(v.lang));
        const chosen = maleNeural || anyNeural || googleMale || anyZh;
        if (chosen) utter.voice = chosen; return chosen;
      };
      pickBestVoice();
      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        const handler = () => {
          try { window.speechSynthesis.onvoiceschanged = null; } catch (_) {}
          try { if (utter.paused || (!utter.speaking && !utter.started)) { pickBestVoice(); window.speechSynthesis.speak(utter); } } catch (_) {}
        };
        window.speechSynthesis.onvoiceschanged = handler;
      }
      window.speechSynthesis.speak(utter);
    } catch (e) { /* ignore */ }
  },

  /**
   * 把 Audio error/Event 转成人类可读文字，避免 [object Event] / object Object]
   */
  _formatAudioError(evtOrErr) {
    if (!evtOrErr) return '(no error info)';
    try {
      if (typeof evtOrErr === 'object' && 'message' in evtOrErr && evtOrErr.message) {
        const nm = (evtOrErr.name || '') + ' ' + evtOrErr.message;
        if (/NotAllowed|autoplay|policy/i.test(nm)) return 'NotAllowedError: 浏览器阻止自动播放(用户手势丢失)';
        return String(nm).slice(0, 120);
      }
      if (typeof evtOrErr === 'object' && 'target' in evtOrErr && evtOrErr.target && evtOrErr.target.error && typeof evtOrErr.target.error === 'object') {
        const code = Number(evtOrErr.target.error.code);
        const m = {
          1: 'ABORTED(加载被中止)',
          2: 'NETWORK_ERROR(404 / file://协议被拦 / 服务器没启动 → 请用 localhost:8000 打开！)',
          3: 'DECODE_ERROR(音频文件损坏/录音截断)',
          4: 'SRC_NOT_SUPPORTED(格式不支持，例如 .m4a 浏览器缺解码器，请转 mp3)'
        }[code] || ('UNKNOWN code=' + code);
        const raw = String(evtOrErr.target.error.message || '').slice(0, 80);
        return `MediaError(code=${code}): ${m}${raw ? ' — ' + raw : ''}`;
      }
      const s = String(evtOrErr);
      if (s.indexOf('[object') === 0) {
        try { return 'Event type=' + (evtOrErr.type || 'unknown') + '; keys=' + Object.keys(evtOrErr).slice(0, 5).join(','); } catch (_) {}
      }
      return s.slice(0, 140);
    } catch (e) { return '(error fmt: ' + String(e && e.message || e).slice(0, 40) + ')'; }
  },

  /**
   * 播放实际音频文件。关键修复(V4):
   *  - V3 删除 crossOrigin + 超时 8s + loadedmetadata 监听
   *  - V4 新增：当 sfxVolume * volumeScale > 1.0 时，用 Web Audio createMediaElementSource
   *    + GainNode 做数字增益放大（最高 3.0 防止无限）；<= 1.0 走原链路保持稳定。
   */
  playActualAudio(urls, fallback, volumeScale = 1, onLoadedPlayed = null) {
    const list = Array.isArray(urls) ? urls : [urls];
    if (list.length === 0) {
      if (typeof fallback === 'function') fallback({ failedUrls: [], aborted: false, lastErr: null, isFileProtocol: location.protocol === 'file:' });
      return null;
    }
    if (this._lastVoiceAudio && !this._lastVoiceAudio.paused) { try { this._lastVoiceAudio.pause(); } catch (_) {} }

    // ===== V4：计算原始目标音量 & 是否需要 Web Audio Gain 放大 =====
    // Audio.volume 上限 1.0；想超过必须用 GainNode
    const gainTotal = Math.max(0, Number(this.sfxVolume || 0) * Number(volumeScale || 1));
    const MAX_SAFE_GAIN = 3.0;                    // 放大上限（防止 >3 严重破音）
    const needWebAudioBoost = (this.initialized && this.ctx && gainTotal > 1.001);
    const htmlVolume = needWebAudioBoost ? 1.0 : Math.min(1.0, gainTotal);
    const extraGainDb = needWebAudioBoost ? Math.min(MAX_SAFE_GAIN, gainTotal) : 1.0;
    if (needWebAudioBoost) {
      console.log(`%c[AudioManager.playActualAudio] 🔊 启用 Web Audio 数字放大: target x${gainTotal.toFixed(2)}; safeGain x${extraGainDb.toFixed(2)}; HTMLVolume=1.0`,
                  'background:#2b5fb5;color:#fff;padding:2px 8px;border-radius:4px;');
    }

    const isFileProtocol = location.protocol === 'file:';
    let aborted = false;
    const failedUrls = [];
    let lastError = null;
    let attemptIdx = 0;

    const tryNext = () => {
      if (aborted) return null;
      if (attemptIdx >= list.length) {
        if (typeof fallback === 'function') fallback({ failedUrls, aborted, lastErr, isFileProtocol });
        return null;
      }
      const url = list[attemptIdx++];
      // 本 URL 要用到的 Web Audio 节点（成功创建才赋值，失败 cleanup 断开）
      let waNodes = { src: null, gain: null, dst: null };
      try {
        const audio = new Audio(url);
        audio.preload = 'auto';
        audio.volume = htmlVolume;   // 按是否需要放大决定 1.0 或原比值
        // ⚠ 不要设置 crossOrigin！本地服务器无 CORS 头会触发 CORS 阻断，导致所有音频 NETWORK ERROR #2
        // audio.crossOrigin = 'anonymous';  ← 已删除 V3 关键修复

        let settled = false;
        let waBuilt = false;  // V4: 防止 loadedmetadata + canplaythrough 分别触发 onReady → buildWebAudioGraph 抛二次创建错误
        const cleanup = () => {
          settled = true;
          try { audio.removeEventListener('error', onErr); } catch (_) {}
          try { audio.removeEventListener('canplaythrough', onReady); } catch (_) {}
          try { audio.removeEventListener('loadedmetadata', onLoadedMeta); } catch (_) {}
          // V4：如果创建了 Web Audio 节点，断开连接（防止内存泄漏 / 音频节点堆积）
          try {
            if (waNodes.gain) { try { waNodes.gain.disconnect(); } catch (_) {} waNodes.gain = null; }
            if (waNodes.src) { try { waNodes.src.disconnect(); } catch (_) {} waNodes.src = null; }
          } catch (_) {}
        };

        const onErr = (evt) => {
          if (settled) return;
          cleanup();
          failedUrls.push(url);
          lastError = evt || 'Audio error event';
          try { console.warn('[AudioManager.playActualAudio] ❌ LOAD_FAIL:', url, '→', this._formatAudioError(evt)); } catch (_) {}
          if (!aborted) tryNext();
        };

        const buildWebAudioGraph = () => {
          // V4: 只有当 gainTotal > 1.0 才走这里（否则走 HTMLAudioElement 的原生输出）
          if (!needWebAudioBoost || waBuilt) return;
          waBuilt = true;
          try {
            // 先保证 ctx 在 running（用户手势触发）
            if (this.ctx.state === 'suspended') try { this.ctx.resume(); } catch (_) {}
            const src = this.ctx.createMediaElementSource(audio);
            const gain = this.ctx.createGain();
            gain.gain.value = extraGainDb;
            const dst = this.sfxGain || this.masterGain || this.ctx.destination;
            src.connect(gain).connect(dst);
            waNodes.src = src; waNodes.gain = gain; waNodes.dst = dst;
            // 注意：createMediaElementSource 接管后，音频将通过 Web Audio graph 输出，
            // HTMLAudioElement 的默认输出（直接到扬声器）会被浏览器静默切断
            // —— 所以走了这个链路就不要再改 audio.volume 了（已经固定为 1.0）
          } catch (e) {
            console.warn('[AudioManager.playActualAudio] ⚠ Web Audio 接管失败，回退到HTML链路:', e && e.message);
            try {
              if (waNodes.gain) { try { waNodes.gain.disconnect(); } catch (_) {} waNodes.gain = null; }
              if (waNodes.src) { try { waNodes.src.disconnect(); } catch (_) {} waNodes.src = null; }
            } catch (_) {}
          }
        };

        const onReady = () => {
          if (settled) return;
          try {
            buildWebAudioGraph();   // V4: 在 play() 之前接管 Web Audio graph
            audio.volume = htmlVolume;
            const p = audio.play();
            if (p && typeof p.catch === 'function') {
              p.then(() => {
                try { if (typeof onLoadedPlayed === 'function') onLoadedPlayed(url); } catch (_) {}
                if (needWebAudioBoost && waNodes.gain) {
                  console.log(`%c[AudioManager.playActualAudio] ✅ GainNode 已生效: gain=${waNodes.gain.gain.value.toFixed(2)}x -> 浏览器实际响度放大成功`,
                              'background:#0a7d41;color:#fff;padding:2px 8px;border-radius:4px;');
                }
              }).catch((err) => {
                const pretty = this._formatAudioError(err);
                if (/NotAllowed|not\s*allowed|autoplay|policy/i.test(pretty)) {
                  aborted = true; failedUrls.push(url); lastError = err;
                  console.warn('[AudioManager] NotAllowedError 手势丢失，停止后续:', pretty);
                } else if (!aborted) { failedUrls.push(url); lastError = err; tryNext(); }
              });
            } else {
              try { if (typeof onLoadedPlayed === 'function') onLoadedPlayed(url); } catch (_) {}
            }
          } catch (e) { failedUrls.push(url); lastError = e; if (!aborted) tryNext(); }
        };

        // loadedmetadata：m4a/wav 不触发 canplaythrough 但一定会触发这个
        const onLoadedMeta = () => { if (!settled) setTimeout(onReady, 60); };

        audio.addEventListener('error', onErr, { once: true });
        audio.addEventListener('canplaythrough', onReady, { once: true });
        audio.addEventListener('loadedmetadata', onLoadedMeta, { once: true });

        // 超时：8秒（比之前的3秒更宽容大文件首次加载）
        setTimeout(() => {
          if (!settled && !aborted && audio.readyState < 2) {
            try { onErr(new Error('Timeout 8s: 8秒内未加载到音频数据，请检查网络/服务器/文件大小')); }
            catch (_) { onErr(); }
          }
        }, 8000);

        this._lastVoiceAudio = audio;
        return audio;
      } catch (e) {
        try {
          if (waNodes && waNodes.gain) { try { waNodes.gain.disconnect(); } catch (_) {} }
          if (waNodes && waNodes.src) { try { waNodes.src.disconnect(); } catch (_) {} }
        } catch (_) {}
        failedUrls.push(url); lastError = e;
        if (aborted) return null;
        return tryNext();
      }
    };

    return tryNext();
  },

  /**
   * 启动自检（V3）：new Audio() 预加载两个关键文件，结果打印到 console + 返回 Promise
   *   成功→ resolve(url)
   *   失败→ reject({ fileErr, ttsErr, isFileProtocol })
   * Game.init 里会调用，失败直接在主菜单贴巨大红字提示。
   */
  async selfTest() {
    const isFileProtocol = location.protocol === 'file:';
    const fileUrl = 'audio/gogogo.m4a';          // 用户最常放的
    const ttsUrl  = 'audio/dengchao-gogogo.mp3'; // 我们生成的 TTS 兜底
    const loadOne = (url) => new Promise((res, rej) => {
      const a = new Audio(url); a.preload = 'auto';
      let done = false;
      const fin = (ok, e) => { if (done) return; done = true; ok ? res(url) : rej(e); };
      a.addEventListener('canplaythrough', () => fin(true), { once: true });
      a.addEventListener('loadedmetadata', () => fin(true), { once: true });
      a.addEventListener('error', (e) => fin(false, e), { once: true });
      setTimeout(() => fin(false, new Error('self-test timeout 8s')), 8000);
      // 触发开始加载（不 play 就只是 load metadata）
      try { a.load && a.load(); } catch (_) {}
    });
    let fileErr = null, ttsErr = null;
    try { await loadOne(fileUrl); console.log('%c[Audio自检] ✅ 用户文件 gogogo.m4a 可正常加载', 'background:#0a7d41;color:#fff;padding:2px 8px;border-radius:4px'); }
    catch (e) { fileErr = e; console.warn('[Audio自检] ❌ gogogo.m4a 加载失败:', this._formatAudioError(e)); }
    try { await loadOne(ttsUrl); console.log('%c[Audio自检] ✅ TTS兜底 dengchao-gogogo.mp3 可正常加载', 'background:#0a7d41;color:#fff;padding:2px 8px;border-radius:4px'); }
    catch (e) { ttsErr = e; console.warn('[Audio自检] ❌ dengchao-gogogo.mp3 加载失败:', this._formatAudioError(e)); }
    return { fileErr, ttsErr, isFileProtocol,
      filePretty: this._formatAudioError(fileErr),
      ttsPretty:  this._formatAudioError(ttsErr),
    };
  },

  playGoGoGo(ui = null) {
    // ===== 第一部分：硬编码的 TTS 版本（保证一定有东西能播） =====
    const TTS_URLS = [
      'audio/dengchao-gogogo.mp3',
      'audio/dengchao-gogogo-alt.mp3',
      'audio/dengchao-gogogo-yunxia.mp3',
      'audio/dengchao-gogogo-yunjian-alt.mp3',
      'audio/dengchao-gogogo-yunyang.mp3',
      'audio/dengchao-gogogo-yunxi.mp3',
      'audio/dengchao-gogogo.ogg',
      'audio/gogogo.mp3', // = TTS主版本拷贝
    ];

    // ===== 第二部分：用户原声模糊匹配 =====
    const EXTS = ['mp3', 'm4a', 'wav', 'ogg', 'aac', 'flac'];
    const USER_FILENAME_PATTERNS = [
      'gogogo', 'gogogo-chufa', 'gogogo出发', 'gogogo 出发', 'gogogo-chu', '狗狗狗',
      '邓超', 'dengchao', 'deng_chao', 'dc-gogogo', 'chao',
      '超级英雄', '奔跑吧', 'paonan', 'running', 'superhero',
      'chufa', '出发喽', '出发咯', 'chu_fa_lou',
      'audio', 'sound', 'voice', 'record', '录音', '新建', '1',
    ];
    const userUrls = [];
    const seen = new Set();
    const addUniq = (u) => { if (!seen.has(u)) { seen.add(u); userUrls.push(u); } };
    USER_FILENAME_PATTERNS.forEach((name) => {
      EXTS.forEach((ext) => {
        addUniq(`audio/${name}.${ext}`);
        addUniq(`audio/${name}-chufa.${ext}`);
        addUniq(`audio/${name} (1).${ext}`);
      });
    });
    const FILE_URLS = userUrls.concat(TTS_URLS);

    const notifyUrl = (playedUrl) => {
      const short = playedUrl.replace(/^audio\//, '');
      const isUser = userUrls.some((u) => u === playedUrl);
      const tag = isUser ? '🎙️ 用户原音' : '🤖 TTS合成';
      console.log(`%c[GOGOGO 播放成功] ${tag} → ${short}`, 'background:#1f7a3a;color:#fff;padding:2px 8px;border-radius:4px;');
      if (ui && typeof ui.showBanner === 'function') {
        setTimeout(() => { ui.showBanner(`${tag} 🔊 ${short}`, { style: 'debug', duration: 2800 }); }, 900);
      }
    };

    const fallbackNoMechanical = (diag) => {
      const failed = (diag && diag.failedUrls) ? diag.failedUrls : [];
      const isFileProtocol = !!(diag && diag.isFileProtocol);
      console.warn('[GOGOGO] 所有候选音频加载失败，fallback：叮！。尝试数:', failed.length,
                   'lastErr:', diag && diag.lastErr ? this._formatAudioError(diag.lastErr) : '(none)');
      try { this.playAnnouncementDing(); } catch (_) {}
      if (ui && typeof ui.showBanner === 'function') {
        setTimeout(() => {
          const KW = /gogogo|邓超|dengchao|出发|chufa|狗狗狗|超级英雄|m4a|wav/i;
          const missedUserFiles = failed.filter(u => KW.test(u)).slice(0, 6).map(u => '    ✗ ' + u.replace(/^audio\//, ''));
          const ttsAllFailed = TTS_URLS.every(t => failed.indexOf(t) !== -1);
          const lines = [];
          lines.push('⚠️ gogogo 出发喽 没有可播放的音频！');
          if (isFileProtocol) {
            lines.push('🚨🚨 致命：当前使用 file:// 协议（你双击了HTML直接打开）');
            lines.push('    ✅ 请先起服务器：在 飞机大战 目录运行  python -m http.server 8000');
            lines.push('    ✅ 然后浏览器访问  http://localhost:8000/');
          }
          if (missedUserFiles.length > 0) {
            lines.push('🔍 用户原音候选匹配（audio/里缺这些名字）：');
            missedUserFiles.forEach(l => lines.push(l));
          }
          if (ttsAllFailed) {
            lines.push('🚨 TTS 保底（dengchao-gogogo.mp3）也失败！');
            if (!isFileProtocol) {
              lines.push('   → 请确认：① localhost:8000 已启动  ② audio/ 下 dengchao-gogogo.mp3 存在');
              lines.push('   → F12 → Console 找 [Audio自检] 开头的日志会告诉你具体错误码');
            }
            if (diag && diag.lastErr) {
              lines.push('🔧 最后错误: ' + this._formatAudioError(diag.lastErr));
            }
          } else {
            lines.push('📂 把音频放 audio/ 目录，比如：gogogo.m4a / 邓超.mp3 / 出发喽.wav');
            lines.push('    （含 gogogo/邓超/出发 关键词的任意文件名都会自动匹配）');
          }
          lines.push('📖 改完 → F5 刷新 → 再试「试听出发喽音效」按钮');
          ui.showBanner(lines.join('\n'), { style: 'warn', duration: 12000 });
        }, 900);
      }
    };

    this.playActualAudio(FILE_URLS, fallbackNoMechanical, 2.5, notifyUrl);
  },

  playAnnouncementDing() {
    if (!this.initialized) return;
    const ctx = this.ctx; const t0 = ctx.currentTime;
    const notes = [{ f: 660, t: 0, d: 0.12 }, { f: 880, t: 0.11, d: 0.22 }];
    notes.forEach(n => {
      const osc = ctx.createOscillator(); const g = ctx.createGain();
      osc.type = 'triangle'; osc.frequency.value = n.f;
      const ts = t0 + n.t;
      g.gain.setValueAtTime(0, ts); g.gain.linearRampToValueAtTime(0.5 * this.sfxVolume, ts + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, ts + n.d);
      osc.connect(g).connect(this.sfxGain); osc.start(ts); osc.stop(ts + n.d + 0.02);
    });
  },

  playBossCountdown() {
    if (!this.initialized) return;
    const ctx = this.ctx; const t0 = ctx.currentTime;
    const osc = ctx.createOscillator(); const g = ctx.createGain();
    osc.type = 'square'; osc.frequency.value = 1480;
    g.gain.setValueAtTime(0.35 * this.sfxVolume, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.18);
    osc.connect(g).connect(this.sfxGain); osc.start(t0); osc.stop(t0 + 0.2);
  },

  playBossArrived() {
    if (!this.initialized) return;
    const ctx = this.ctx; const t0 = ctx.currentTime;
    const sub = ctx.createOscillator(); const subG = ctx.createGain();
    sub.type = 'sawtooth'; sub.frequency.setValueAtTime(120, t0); sub.frequency.exponentialRampToValueAtTime(45, t0 + 0.5);
    subG.gain.setValueAtTime(0.7 * this.sfxVolume, t0); subG.gain.exponentialRampToValueAtTime(0.001, t0 + 0.5);
    sub.connect(subG).connect(this.sfxGain); sub.start(t0); sub.stop(t0 + 0.52);
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
    const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 1.6);
    const nsrc = ctx.createBufferSource(); nsrc.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.setValueAtTime(500, t0); bp.frequency.exponentialRampToValueAtTime(180, t0 + 0.6); bp.Q.value = 1.2;
    const nG = ctx.createGain(); nG.gain.value = 0.5 * this.sfxVolume;
    nsrc.connect(bp).connect(nG).connect(this.sfxGain); nsrc.start(t0);
  },
};
