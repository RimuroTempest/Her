/* =========================================================================
   A LITTLE SOMETHING FOR YOU — script.js
   =========================================================================
   HOW TO PERSONALIZE:
   Everything you need to change is in the CONFIG object right below.
   You should NOT need to touch anything past the "END OF CONFIG" line
   unless you want to change how something behaves.
   ========================================================================= */

const CONFIG = {
  // ---- Names ----
  herName: "Selah",
  myName: "Vincent",

  // ---- Flyer (opening card) ----
  flyerKicker: "a little something for you",
  flyerSub: "I made this specifically for you.",

  // ---- Landing screen (right after the flyer opens) ----
  landingHeading: "Hey, you.",
  landingSub: "I wanted to make something a little different for you. ♡",

  // ---- Section 1: The letter. Each string is typed out one at a time. ----
  letterLines: [
    "I wanted to make you something.",

    "Not because I had to...",

    "But because I wanted to.",

    "Kasi honestly, I wanted to give you something na ikaw lang ang makakakita.",

    "Something I've been wanting to tell you for a while... pero minsan hindi ko alam kung paano sasabihin.",

    "So... instead of just saying it, I made you a little world instead.",

    "Shall we look around? ♡"
],

  // ---- Section 2: Things I like about you ----
  // "front" is what shows on the card, "back" is the message revealed on tap.
  likes: [
    { "icon": "♡", "front": "Your smile ♡", "back": "Kapag ngumingiti ka, nawawala lahat ng pagod ko. Parang buong araw ko nang nanalo." },
    { "icon": "✦", "front": "The way you talk", "back": "Ang sarap mong pakinggan. Kahit sa mga simpleng kwento mo, bitaw mo pa lang, napapangiti na ako." },
    { "icon": "❀", "front": "Your personality", "back": "Yung kabaitan at kulit mo, ang hirap mong i-resist. Ikaw yung tipo ng tao na ang gaan-gaan sa pakiramdam kasama." },
    { "icon": "✧", "front": "The little things you do", "back": "Yung mga maliliit na detalye tungkol sa'yo na ikaw lang ang gumagawa? Napapansin ko lahat, at mas lalo akong nahuhulog." },
    { "icon": "☾", "front": "How you make me feel", "back": "When I talk to you, pakiramdam ko nasa tahanan na ako. Ikaw yung pahinga ko sa magulong mundo." },
    { "icon": "✿", "front": "Everything", "back": "I Treasure you so much that I just don't know what to do if I lose you." }
],
  // ---- Section 3: Mini game ----
  gameDurationSeconds: 25,

  // ---- Section 4: Memory constellation ----
  // Add or remove as many memories as you like. "photo" is just a label
  // for a placeholder box — swap in a real <img> later if you want (see
  // README notes at the bottom of this file).
 memories: [
    { date: "[DATE]", title: "[MOMENT TITLE]", message: "[YOUR MESSAGE HERE — describe this memory]", photo: "" },
    { date: "[DATE]", title: "[MOMENT TITLE]", message: "[YOUR MESSAGE HERE — describe this memory]", photo: "" },
    { date: "[DATE]", title: "[MOMENT TITLE]", message: "[YOUR MESSAGE HERE — describe this memory]", photo: "" },
    { date: "[DATE]", title: "[MOMENT TITLE]", message: "[YOUR MESSAGE HERE — describe this memory]", photo: "" },
    { date: "[DATE]", title: "[MOMENT TITLE]", message: "[YOUR MESSAGE HERE — describe this memory]", photo: "" }
  ],

  // ---- Companion character random lines ----
  companionLines: [
    "psst.",
    "You're still here?",
    "He worked really hard on this.",
    "Don't tell him I said that.",
    "He rewrote that letter like five times.",
    "...okay four times.",
    "He's probably refreshing his phone right now.",
    "You have very good taste, by the way.",
    "Keep going, it gets better.",
    "I'm just here for moral support."
  ],

  // ---- Final section ----
  finalYesResponse: "Yay. ♡ I was hoping you'd say that.",
  finalThinkResponse: "That's okay. Take your time. ♡",

  // ---- Music ----
  // Put your song file at ./music.mp3 (same folder as this script).
  musicFile: "music.mp3",
};

/* =========================================================================
   END OF CONFIG — everything below this line makes the site actually work.
   ========================================================================= */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------------------------------------------------
   Small helpers
   ------------------------------------------------------------------------- */
function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
function rand(min, max) { return Math.random() * (max - min) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/* =========================================================================
   1. AMBIENT PARTICLES (background hearts/stars/sparkles floating up)
   ========================================================================= */
(function ambientParticles() {
  const canvas = $("#particle-canvas");
  const ctx = canvas.getContext("2d");
  let w, h, particles;
  const GLYPHS = ["♡", "✦", "✧", "❀", "✿", "☆"];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function makeParticle() {
    return {
      x: rand(0, w),
      y: rand(0, h) + h,
      size: rand(10, 22),
      speed: rand(0.15, 0.5),
      drift: rand(-0.3, 0.3),
      glyph: pick(GLYPHS),
      opacity: rand(0.12, 0.4),
      rot: rand(0, 360),
      rotSpeed: rand(-0.2, 0.2),
    };
  }

  const COUNT = prefersReducedMotion ? 0 : (window.innerWidth < 600 ? 16 : 28);
  particles = Array.from({ length: COUNT }, makeParticle);

  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    particles.forEach((p) => {
      p.y -= p.speed;
      p.x += p.drift;
      p.rot += p.rotSpeed;
      if (p.y < -30) Object.assign(p, makeParticle(), { y: h + 20 });
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.size}px serif`;
      ctx.fillStyle = "#e8879e";
      ctx.fillText(p.glyph, 0, 0);
      ctx.restore();
    });
    requestAnimationFrame(tick);
  }
  if (!prefersReducedMotion) tick();
})();

/* =========================================================================
   2. MUSIC TOGGLE
   ========================================================================= */
(function musicSystem() {
  const audio = $("#bg-music");
  audio.src = CONFIG.musicFile;
  const btn = $("#music-toggle");
  const label = $("#music-label");
  let playing = false;

  btn.addEventListener("click", () => {
    if (!playing) {
      audio.volume = 0.55;
      audio.play().catch(() => {
        label.textContent = "Add music.mp3";
      });
      playing = true;
      btn.classList.add("playing");
      label.textContent = "Playing";
    } else {
      audio.pause();
      playing = false;
      btn.classList.remove("playing");
      label.textContent = "Music";
    }
  });
})();

/* =========================================================================
   3. OPENING FLYER ANIMATION
   ========================================================================= */
(function flyerScene() {
  const openBtn = $("#open-btn");
  const flyerCard = $("#flyer-card");
  const flyerScene = $("#flyer-scene");
  const burstContainer = $("#burst-container");
  const mainExperience = $("#main-experience");

  $("#flyer-kicker").textContent = CONFIG.flyerKicker;
  $("#flyer-sub").textContent = CONFIG.flyerSub;

  function spawnBurst() {
    const glyphs = ["♡", "✦", "✧", "❀", "★", "✿"];
    const total = prefersReducedMotion ? 0 : 22;
    for (let i = 0; i < total; i++) {
      const el = document.createElement("span");
      el.className = "burst-piece";
      el.textContent = pick(glyphs);
      const angle = rand(0, Math.PI * 2);
      const dist = rand(120, 340);
      el.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      el.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
      el.style.color = pick(["#e8879e", "#f0c987", "#cdb8e8", "#d16a86"]);
      el.style.fontSize = `${rand(0.9, 1.8)}rem`;
      el.style.animationDelay = `${rand(0, 0.15)}s`;
      burstContainer.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }
  }

  openBtn.addEventListener("click", () => {
    if (openBtn.disabled) return;
    openBtn.disabled = true;

    // 1. button press
    openBtn.classList.add("pressed");

    // 2. card shake
    flyerCard.classList.add("shaking");

    setTimeout(() => {
      flyerCard.classList.remove("shaking");
      // 3. burst outward
      spawnBurst();
      // 4-6. rotate + fly away + whoosh
      flyerCard.classList.add("launching");
    }, prefersReducedMotion ? 0 : 480);

    // 7-9. flyer disappears, background transitions to main site
    const revealDelay = prefersReducedMotion ? 200 : 1350;
    setTimeout(() => {
      flyerScene.classList.add("dismissing");
      revealMainExperience();
    }, revealDelay);
  });

  function revealMainExperience() {
    mainExperience.hidden = false;
    document.body.style.overflowY = "auto";
    requestAnimationFrame(() => {
      mainExperience.style.opacity = "0";
      mainExperience.style.transition = "opacity 0.8s ease";
      requestAnimationFrame(() => { mainExperience.style.opacity = "1"; });
    });
    setTimeout(() => { flyerScene.style.display = "none"; }, 1000);
    initMainExperience(); // build the rest of the site content now
  }
})();

/* =========================================================================
   4. MAIN EXPERIENCE — built once, after the flyer opens
   ========================================================================= */
let mainInitialized = false;
function initMainExperience() {
  if (mainInitialized) return;
  mainInitialized = true;

  $("#landing-heading").textContent = CONFIG.landingHeading;
  $("#landing-sub").textContent = CONFIG.landingSub;

  $("#explore-btn").addEventListener("click", () => {
    $("#letter-section").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  initLetter();
  initLikes();
  initGame();
  initSky();
  initFinal();
  initCompanion();
  initEasterEggs();
}

/* -------------------------------------------------------------------------
   4a. THE LETTER — typewriter, line by line
   ------------------------------------------------------------------------- */
function initLetter() {
  const body = $("#letter-body");
  const continueBtn = $("#letter-continue");
  const lines = CONFIG.letterLines;
  let lineIndex = 0;
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        typeNextLine();
      }
    });
  }, { threshold: 0.5 });
  observer.observe($("#letter-section"));

  function typeNextLine() {
    if (lineIndex >= lines.length) {
      continueBtn.hidden = false;
      continueBtn.style.animation = "rise-in 0.5s ease forwards";
      return;
    }
    const p = document.createElement("p");
    p.className = "letter-line";
    body.appendChild(p);

    if (prefersReducedMotion) {
      p.textContent = lines[lineIndex];
      p.classList.add("visible");
      lineIndex++;
      setTimeout(typeNextLine, 250);
      return;
    }

    p.classList.add("visible");
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    cursor.textContent = "\u00A0";

    const text = lines[lineIndex];
    let charIndex = 0;
    p.appendChild(cursor);

    const typeChar = setInterval(() => {
      if (charIndex < text.length) {
        p.insertBefore(document.createTextNode(text[charIndex]), cursor);
        charIndex++;
      } else {
        clearInterval(typeChar);
        cursor.remove();
        lineIndex++;
        setTimeout(typeNextLine, 550); // pause between lines
      }
    }, 28);
  }

  continueBtn.addEventListener("click", () => {
    $("#likes-section").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/* -------------------------------------------------------------------------
   4b. THINGS I LIKE ABOUT YOU — flip cards
   ------------------------------------------------------------------------- */
function initLikes() {
  const grid = $("#likes-grid");
  CONFIG.likes.forEach((item) => {
    const card = document.createElement("button");
    card.className = "like-card";
    card.innerHTML = `
      <span class="like-icon">${item.icon}</span>
      <span class="like-face like-front">${item.front}</span>
      <span class="like-face like-back">${item.back}</span>
    `;
    card.addEventListener("click", () => {
      card.classList.toggle("opened");
    });
    grid.appendChild(card);
  });
}

/* -------------------------------------------------------------------------
   4c. MINI GAME — Catch the Hearts
   ------------------------------------------------------------------------- */
function initGame() {
  const field = $("#game-field");
  const startBtn = $("#game-start-btn");
  const scoreEl = $("#game-score");
  const timeEl = $("#game-time");
  const resultBox = $("#game-result");
  const resultLine1 = $("#game-result-line1");
  const resultLine2 = $("#game-result-line2");
  const hint = $("#game-hint");

  let score = 0;
  let timeLeft = CONFIG.gameDurationSeconds;
  let spawnTimer = null;
  let countdownTimer = null;
  let running = false;

  startBtn.addEventListener("click", startGame);

  function startGame() {
    if (running) return;
    running = true;
    score = 0;
    timeLeft = CONFIG.gameDurationSeconds;
    scoreEl.textContent = "0";
    timeEl.textContent = String(timeLeft);
    resultBox.hidden = true;
    startBtn.remove();
    hint.textContent = "Go, go, go!";

    spawnTimer = setInterval(spawnHeart, 650);
    countdownTimer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = String(timeLeft);
      if (timeLeft <= 0) endGame();
    }, 1000);
  }

  function spawnHeart() {
    if (!running) return;
    const heart = document.createElement("button");
    heart.className = "game-heart";
    heart.textContent = "♡";
    const fw = field.clientWidth, fh = field.clientHeight;
    const x = rand(8, 92);
    const y = rand(10, 88);
    heart.style.left = `${x}%`;
    heart.style.top = `${y}%`;

    const life = setTimeout(() => heart.remove(), 1500);

    heart.addEventListener("click", () => {
      clearTimeout(life);
      score++;
      scoreEl.textContent = String(score);
      popParticles(heart, field);
      heart.classList.add("popped");
      setTimeout(() => heart.remove(), 350);
    });

    field.appendChild(heart);
  }

  function popParticles(heartEl, field) {
    if (prefersReducedMotion) return;
    const rectField = field.getBoundingClientRect();
    const rect = heartEl.getBoundingClientRect();
    const cx = rect.left - rectField.left + rect.width / 2;
    const cy = rect.top - rectField.top + rect.height / 2;
    for (let i = 0; i < 6; i++) {
      const p = document.createElement("span");
      p.textContent = pick(["♡", "✦", "✧"]);
      p.style.position = "absolute";
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;
      p.style.fontSize = "0.9rem";
      p.style.color = "#e8879e";
      p.style.pointerEvents = "none";
      const angle = rand(0, Math.PI * 2);
      const dist = rand(20, 60);
      p.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      field.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
        p.style.opacity = "0";
      });
      setTimeout(() => p.remove(), 520);
    }
  }

  function endGame() {
    running = false;
    clearInterval(spawnTimer);
    clearInterval(countdownTimer);
    $all(".game-heart", field).forEach((h) => h.remove());

    resultLine1.textContent = `You caught ${score} heart${score === 1 ? "" : "s"}.`;
    resultLine2.textContent = "But I think you missed one...";
    resultBox.hidden = false;
    hint.textContent = "One more is hiding somewhere on screen...";

    // spawn the one final special heart, at a random spot in the field
    setTimeout(spawnSpecialHeart, 900);
  }

  function spawnSpecialHeart() {
    const heart = document.createElement("button");
    heart.className = "game-heart special";
    heart.textContent = "♡";
    heart.style.left = `${rand(20, 80)}%`;
    heart.style.top = `${rand(20, 80)}%`;
    field.appendChild(heart);

    heart.addEventListener("click", () => {
      popParticles(heart, field);
      heart.remove();
      resultLine2.textContent = "This one was meant for you. ♡";
      hint.textContent = "This one was meant for you. ♡";
      fireConfettiBurst();
    });
  }
}

/* -------------------------------------------------------------------------
   4d. MEMORY CONSTELLATION — night sky with clickable stars
   ------------------------------------------------------------------------- */
function initSky() {
  const canvas = $("#sky-canvas");
  const ctx = canvas.getContext("2d");
  const wrap = $(".sky-wrap");
  const starsLayer = $("#sky-stars");
  let w, h;
  let bgStars = [];

  function resize() {
    w = canvas.width = wrap.clientWidth;
    h = canvas.height = wrap.clientHeight;
    bgStars = Array.from({ length: 90 }, () => ({
      x: rand(0, w), y: rand(0, h), r: rand(0.5, 1.8),
      tw: rand(0, Math.PI * 2), speed: rand(0.01, 0.03),
    }));
  }
  window.addEventListener("resize", resize);
  new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) resize(); });
  }, { threshold: 0.1 }).observe(wrap);
  resize();

  function tick() {
    ctx.clearRect(0, 0, w, h);
    bgStars.forEach((s) => {
      s.tw += s.speed;
      const alpha = 0.3 + Math.abs(Math.sin(s.tw)) * 0.7;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  if (!prefersReducedMotion) tick(); else {
    ctx.clearRect(0, 0, w, h);
    bgStars.forEach((s) => { ctx.beginPath(); ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill(); });
  }

  // positions for memory stars, spread out nicely
  const positions = [
    { top: "22%", left: "18%" }, { top: "35%", left: "48%" },
    { top: "60%", left: "28%" }, { top: "28%", left: "76%" },
    { top: "68%", left: "68%" }, { top: "50%", left: "10%" },
    { top: "78%", left: "45%" },
  ];

  let openPopup = null;
  CONFIG.memories.forEach((mem, i) => {
    const pos = positions[i % positions.length];
    const star = document.createElement("button");
    star.className = "mem-star";
    star.textContent = "★";
    star.style.top = pos.top;
    star.style.left = pos.left;
    star.style.animationDelay = `${rand(0, 2)}s`;
    star.setAttribute("aria-label", `Memory: ${mem.title}`);
    star.addEventListener("click", () => showMemory(star, mem));
    starsLayer.appendChild(star);
  });

  function showMemory(star, mem) {
    if (openPopup) openPopup.remove();
    const popup = document.createElement("div");
    popup.className = "mem-popup";
    popup.innerHTML = `
      <div class="mem-date">${mem.date}</div>
      <div class="mem-title">${mem.title}</div>
      <div class="mem-msg">${mem.message}</div>
      <div class="mem-photo">${mem.photo}</div>
      <button class="mem-close">close</button>
    `;
    // position popup near the star, clamped inside the sky box
    let left = parseFloat(star.style.left);
    let top = parseFloat(star.style.top);
    popup.style.left = `${Math.min(Math.max(left, 18), 82)}%`;
    popup.style.top = `${Math.min(Math.max(top, 20), 70)}%`;
    popup.style.transform = "translate(-50%, 10%)";
    starsLayer.appendChild(popup);
    openPopup = popup;
    popup.querySelector(".mem-close").addEventListener("click", () => {
      popup.remove();
      openPopup = null;
    });
  }
}

/* -------------------------------------------------------------------------
   4e. FINAL SECTION — reveal lines, then the proposal
   ------------------------------------------------------------------------- */
function initFinal() {
  const finalSection = $("#final-section");
  const lines = $all(".final-line", finalSection);
  const lastThingBtn = $("#one-last-thing-btn");
  const proposal = $("#proposal");
  const finalInner = $("#final-inner");
  const responseEl = $("#proposal-response");

  let revealed = false;
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !revealed) {
        revealed = true;
        revealLines();
      }
    });
  }, { threshold: 0.4 }).observe(finalSection);

  function revealLines() {
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add("show"), i * 550);
    });
    setTimeout(() => lastThingBtn.classList.add("show"), lines.length * 550 + 200);
  }

  lastThingBtn.addEventListener("click", () => {
    finalInner.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    finalInner.style.opacity = "0";
    finalInner.style.transform = "translateY(-12px)";
    setTimeout(() => {
      finalInner.style.display = "none";
      proposal.hidden = false;
    }, 450);
  });

  $("#yes-btn").addEventListener("click", () => {
    responseEl.textContent = CONFIG.finalYesResponse;
    responseEl.hidden = false;
    fireConfettiBurst(true);
  });

  $("#think-btn").addEventListener("click", () => {
    responseEl.textContent = CONFIG.finalThinkResponse;
    responseEl.hidden = false;
  });
}

/* -------------------------------------------------------------------------
   Confetti / celebration burst (used by game's final heart + "Yes")
   ------------------------------------------------------------------------- */
function fireConfettiBurst(big = false) {
  const canvas = $("#confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ["#e8879e", "#f0c987", "#cdb8e8", "#b9dcec", "#d16a86"];
  const count = prefersReducedMotion ? 0 : (big ? 140 : 60);
  const pieces = Array.from({ length: count }, () => ({
    x: canvas.width / 2 + rand(-40, 40),
    y: big ? canvas.height + 20 : canvas.height / 2,
    vx: rand(-6, 6),
    vy: big ? rand(-14, -6) : rand(-9, -3),
    size: rand(5, 10),
    color: pick(colors),
    shape: Math.random() > 0.5 ? "heart" : "square",
    rot: rand(0, 360),
    rotSpeed: rand(-6, 6),
    life: 0,
  }));

  function drawHeart(x, y, size, color, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.fillStyle = color;
    ctx.font = `${size * 2}px serif`;
    ctx.textAlign = "center";
    ctx.fillText("♡", 0, 0);
    ctx.restore();
  }

  let frame = 0;
  function tick() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach((p) => {
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28; // gravity
      p.rot += p.rotSpeed;
      if (p.y < canvas.height + 40) alive = true;
      if (p.shape === "heart") {
        drawHeart(p.x, p.y, p.size, p.color, p.rot);
      } else {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });
    if (alive && frame < 260) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  if (!prefersReducedMotion) tick();
}

/* =========================================================================
   5. COMPANION CHARACTER
   ========================================================================= */
function initCompanion() {
  const companion = $("#companion");
  const bubble = $("#companion-bubble");
  let bubbleTimeout = null;
  let clickCount = 0;

  companion.addEventListener("click", () => {
    clickCount++;
    const line = pick(CONFIG.companionLines);
    showBubble(line);

    // Easter egg: click the companion 7 times
    if (clickCount === 7) {
      showEggToast("okay wow, you really like clicking me. here's a secret: he thinks about you more than he'll admit. ♡");
    }
  });

  function showBubble(text) {
    clearTimeout(bubbleTimeout);
    bubble.textContent = text;
    bubble.hidden = false;
    bubbleTimeout = setTimeout(() => { bubble.hidden = true; }, 2600);
  }
}

/* =========================================================================
   6. EASTER EGGS (at least 3 hidden interactions)
   ========================================================================= */
function initEasterEggs() {
  // Egg 1: tiny hidden heart in the corner, clicked 3 times
  const secretHeart = $("#secret-heart");
  let heartClicks = 0;
  secretHeart.addEventListener("click", () => {
    heartClicks++;
    if (heartClicks === 3) {
      showEggToast("You found the tiny hidden heart. That's very on-brand for you. ♡");
    }
  });

  // Egg 2: Konami-style secret — press the arrow keys Up Up Down Down
  const sequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown"];
  let progress = 0;
  window.addEventListener("keydown", (e) => {
    if (e.key === sequence[progress]) {
      progress++;
      if (progress === sequence.length) {
        showEggToast("Secret code unlocked: he's been smiling at his phone way too much lately.");
        progress = 0;
      }
    } else {
      progress = e.key === sequence[0] ? 1 : 0;
    }
  });

  // Egg 3: click any 5 memory stars total (across the constellation) to unlock a bonus line
  let starClicks = 0;
  document.addEventListener("click", (e) => {
    if (e.target.classList && e.target.classList.contains("mem-star")) {
      starClicks++;
      if (starClicks === 5) {
        showEggToast("You clicked through every star. He'd probably say that's the whole point — you, paying attention.");
      }
    }
  });

  // Egg 4 (bonus): triple-click the flyer heart before opening, for the curious
  const flyerHeart = $("#flyer-heart");
  if (flyerHeart) {
    let heartTaps = 0;
    flyerHeart.addEventListener("click", (e) => {
      e.stopPropagation();
      heartTaps++;
      if (heartTaps === 3) showEggToast("Curious one, aren't you? Good. Keep going. ♡");
    });
  }
}

function showEggToast(message) {
  const toast = $("#egg-toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showEggToast._t);
  showEggToast._t = setTimeout(() => { toast.hidden = true; }, 4200);
}