const fs = require('fs');

// --- 1. UPDATE index.html ---
let html = fs.readFileSync('index.html', 'utf-8');

const newSlides = `<div class="hero-slides" id="hero-slides">
      <div class="hero-slide active" data-index="0">
        <img src="images/album%201/1.1.jpg" alt="A distinguished moment with Hon. Shri Devendra Fadnavis" loading="eager" />
      </div>
      <div class="hero-slide" data-index="1">
        <img src="images/album%201/2.1.png" alt="Recognition with Hon. Shri Chandrashekhar Bawankule" loading="lazy" />
      </div>
      <div class="hero-slide" data-index="2">
        <img src="images/album%201/3.jpg" alt="MAREDCO Maharashtra award recognition for Best Residential Project 2022" loading="lazy" />
      </div>
      <div class="hero-slide" data-index="3">
        <img src="images/album%201/4.jpg" alt="CREDAI Maharashtra Women's Wing Installation" loading="lazy" />
      </div>
      <div class="hero-slide" data-index="4">
        <img src="images/album%201/5.jpg" alt="Certificate of Appreciation from NAREDCO Vidarbha" loading="lazy" />
      </div>
      <div class="hero-slide" data-index="5">
        <img src="images/album%201/6.1.png" alt="FemmiCon recognition celebrating women in real estate" loading="lazy" />
      </div>
      <div class="hero-slide" data-index="6">
        <img src="images/album%201/6.2.jpg" alt="FemmiCon recognition celebrating women in real estate" loading="lazy" />
      </div>
      <div class="hero-slide" data-index="7">
        <img src="images/album%201/7.jpg" alt="IIA Maharashtra platform recognition" loading="lazy" />
      </div>
      <div class="hero-slide" data-index="8">
        <img src="images/album%201/8.jpg" alt="CREDAI Women's Wing Zonal Meet leadership moment" loading="lazy" />
      </div>
      <div class="hero-slide" data-index="9">
        <img src="images/album%201/Excellence%20Award%20Ceremony%20on%20Stage.png" alt="Excellence Award Ceremony on Stage" loading="lazy" />
      </div>
      <div class="hero-slide" data-index="10">
        <img src="images/album%201/Indian%20Architects%E2%80%99%20Institute%20Celebration.png" alt="Indian Architects’ Institute Celebration" loading="lazy" />
      </div>
    </div>`;

html = html.replace(/<div class="hero-slides" id="hero-slides">[\s\S]*?<\/div>\s*<div class="hero-overlay">/, newSlides + '\n\n    <div class="hero-overlay">');

const newIndicators = `<div class="hero-indicators" id="hero-indicators">
        <div class="hero-indicator active" data-slide="0"><img src="images/album%201/1.1.jpg" alt="Thumb"></div>
        <div class="hero-indicator" data-slide="1"><img src="images/album%201/2.1.png" alt="Thumb"></div>
        <div class="hero-indicator" data-slide="2"><img src="images/album%201/3.jpg" alt="Thumb"></div>
        <div class="hero-indicator" data-slide="3"><img src="images/album%201/4.jpg" alt="Thumb"></div>
        <div class="hero-indicator" data-slide="4"><img src="images/album%201/5.jpg" alt="Thumb"></div>
        <div class="hero-indicator" data-slide="5"><img src="images/album%201/6.1.png" alt="Thumb"></div>
        <div class="hero-indicator" data-slide="6"><img src="images/album%201/6.2.jpg" alt="Thumb"></div>
        <div class="hero-indicator" data-slide="7"><img src="images/album%201/7.jpg" alt="Thumb"></div>
        <div class="hero-indicator" data-slide="8"><img src="images/album%201/8.jpg" alt="Thumb"></div>
        <div class="hero-indicator" data-slide="9"><img src="images/album%201/Excellence%20Award%20Ceremony%20on%20Stage.png" alt="Thumb"></div>
        <div class="hero-indicator" data-slide="10"><img src="images/album%201/Indian%20Architects%E2%80%99%20Institute%20Celebration.png" alt="Thumb"></div>
      </div>`;

html = html.replace(/<div class="hero-indicators" id="hero-indicators">[\s\S]*?<\/div>/, newIndicators);

fs.writeFileSync('index.html', html);


// --- 2. UPDATE app.js ---
let js = fs.readFileSync('app.js', 'utf-8');

const newLabels = `const albumHeroLabels = [
    "In the presence of leadership",
    "Trust that extends further",
    "Excellence in residential development",
    "Women shaping the industry",
    "Honoured by industry leadership",
    "By women, for women",
    "By women, for women",
    "Celebrating achievement with the industry",
    "Building a stronger industry together",
    "A Milestone of Success",
    "Architectural Recognition"
  ];`;

const newTitles = `const albumHeroTitles = [
    "A Moment of Distinction",
    "Recognition Beyond the Built",
    "Recognised Among the Best",
    "A New Chapter of Leadership",
    "Recognition from the Industry",
    "Celebrating Women in Leadership",
    "Celebrating Women in Leadership",
    "Recognising Excellence",
    "Leading the Conversation",
    "Excellence Award Ceremony",
    "Indian Architects' Institute Celebration"
  ];`;

const newSubtitles = `const albumHeroSubtitles = [
    "A distinguished moment with Hon. Shri Devendra Fadnavis, Chief Minister of Maharashtra.",
    "A moment of recognition with Hon. Shri Chandrashekhar Bawankule, Cabinet Minister for Revenue, Maharashtra.",
    "Honoured at the MAREDCO Maharashtra awards for Best Residential Project — 2022.",
    "A proud moment at the CREDAI Maharashtra Women’s Wing Installation, marking leadership, representation and a stronger voice for women in real estate.",
    "A proud moment for Bambal Infrastructure, receiving a Certificate of Appreciation from NAREDCO Vidarbha, presented by Dr. Niranjan Hiranandani, Chairman, NAREDCO.",
    "A moment of recognition at FemmiCon, celebrating women making a meaningful mark in the real-estate industry.",
    "Another wonderful moment at FemmiCon, celebrating women making a meaningful mark in the real-estate industry.",
    "A proud moment of receiving recognition at the IIA Maharashtra platform, celebrating contribution and excellence in the built environment.",
    "A distinguished moment at the CREDAI Women’s Wing Zonal Meet, celebrating leadership, collaboration and women’s growing influence in real estate.",
    "A proud moment on stage receiving the Excellence Award for our unwavering commitment to quality and architectural brilliance.",
    "Celebrating architectural innovation and excellence at the prestigious Indian Architects' Institute event."
  ];`;

js = js.replace(/const albumHeroLabels = \[[\s\S]*?\];/, newLabels);
js = js.replace(/const albumHeroTitles = \[[\s\S]*?\];/, newTitles);
js = js.replace(/const albumHeroSubtitles = \[[\s\S]*?\];/, newSubtitles);

fs.writeFileSync('app.js', js);


// --- 3. UPDATE styles.css ---
let css = fs.readFileSync('styles.css', 'utf-8');

const newIndicatorCss = `/* Slide indicators (Thumbnails) */
.hero-indicators {
  display: flex;
  gap: var(--space-xs);
  align-items: center;
  margin-top: var(--space-md);
  overflow-x: auto;
  padding-bottom: 8px; /* for scrollbar */
  max-width: 100%;
}

.hero-indicators::-webkit-scrollbar {
  height: 4px;
}
.hero-indicators::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.hero-indicator {
  flex: 0 0 54px;
  height: 54px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--dur-normal) var(--ease-out);
  overflow: hidden;
  position: relative;
  border: 2px solid transparent;
  opacity: 0.5;
}

.hero-indicator img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.hero-indicator.active {
  opacity: 1;
  border-color: var(--clr-accent);
  transform: scale(1.05);
}

.hero-indicator.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--clr-accent);
  transform-origin: left;
  animation: indicatorFill var(--slide-duration, 5s) linear forwards;
}

@keyframes indicatorFill {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}`;

css = css.replace(/\/\* Slide indicators \*\/[\s\S]*?(?=\/\* Scroll down indicator \*\/)/, newIndicatorCss + '\n\n');

fs.writeFileSync('styles.css', css);

console.log('Update script finished successfully.');
