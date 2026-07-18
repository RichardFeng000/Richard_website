<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import resumeFileUrl from "../materials/Resume_Ruiding_Feng.pdf?url";

type Work = {
  id: string;
  title: string;
  subtitle: string;
  category: "FX" | "Unreal Engine" | "Houdini procedure" | "Lighting work";
  video?: string;
  image?: string;
  poster?: string;
};

const works: Work[] = [
  {
    id: "vfx-01",
    title: "TopGun",
    subtitle: "FX shot study",
    category: "FX",
    video: "/vfx/source/vfx-01-TopGun.mp4",
    poster: "/vfx/F24_RuidingFeng_DemoReel_01.jpg",
  },
  {
    id: "vfx-02",
    title: "Mechanic",
    subtitle: "Houdini procedural study",
    category: "Houdini procedure",
    video: "/vfx/source/vfx-02-Mechanic.mp4",
    poster: "/vfx/F24_RuidingFeng_DemoReel_02.jpg",
  },
  {
    id: "vfx-03",
    title: "ParticleDissolve",
    subtitle: "Particle dissolve FX study",
    category: "FX",
    video: "/vfx/source/vfx-03-ParticleDissolve.mp4",
    poster: "/vfx/F24_RuidingFeng_DemoReel_03.jpg",
  },
  {
    id: "vfx-04",
    title: "Lighting Work 04",
    subtitle: "Lighting work still frame",
    category: "Lighting work",
    image: "/vfx/source/vfx-04-demo-reel.png",
  },
  {
    id: "vfx-05",
    title: "Lighting Work 05",
    subtitle: "Lighting work still frame",
    category: "Lighting work",
    image: "/vfx/source/vfx-05-demo-reel.png",
  },
  {
    id: "vfx-06",
    title: "Lighting Work 06",
    subtitle: "Lighting work still frame",
    category: "Lighting work",
    image: "/vfx/source/vfx-06-demo-reel.png",
  },
  {
    id: "vfx-07",
    title: "GameThorne",
    subtitle: "Houdini procedural environment study",
    category: "Houdini procedure",
    video: "/vfx/source/vfx-07-GameThorne.mp4",
    poster: "/vfx/F24_RuidingFeng_DemoReel_07.jpg",
  },
  {
    id: "vfx-08",
    title: "Vessel",
    subtitle: "Houdini procedural vessel study",
    category: "Houdini procedure",
    video: "/vfx/source/vfx-08-vessel.mov",
    poster: "/vfx/vessel.jpg",
  },
  {
    id: "vfx-09",
    title: "Flower",
    subtitle: "FX flower study",
    category: "FX",
    video: "/vfx/source/vfx-09-flower.mp4",
    poster: "/vfx/flower-2.jpg",
  },
  {
    id: "vfx-10",
    title: "UE",
    subtitle: "Unreal Engine cinematic study",
    category: "Unreal Engine",
    video: "/vfx/source/vfx-10-UE.mp4",
    poster: "",
  },
];

const demoCategories = [
  "FX",
  "Unreal Engine",
  "Houdini procedure",
  "Lighting work",
] as const;

const demoGroups = computed(() =>
  demoCategories.map((category) => ({
    category,
    works: works.filter((work) => work.category === category),
  })),
);

const fxHeroWorks = [works[0], works[2], works[8]];
const currentHeroIndex = ref(0);
const heroWork = computed(() => fxHeroWorks[currentHeroIndex.value]);
const proceduralWorks = [works[1], works[6], works[7]];
const currentProceduralIndex = ref(0);
const proceduralWork = computed(() => proceduralWorks[currentProceduralIndex.value]);
const tripleWorks = [works[3], works[4], works[5]];
const edWork = works[9];
const selectedWork = ref<(typeof works)[number] | null>(null);
const activeView = ref<"home" | "demo" | "resume">("home");
const selectedWorkIndex = computed(() =>
  selectedWork.value ? works.findIndex((work) => work.id === selectedWork.value?.id) : -1,
);

const playNextHero = () => {
  currentHeroIndex.value = (currentHeroIndex.value + 1) % fxHeroWorks.length;
};

const playNextProcedural = () => {
  currentProceduralIndex.value = (currentProceduralIndex.value + 1) % proceduralWorks.length;
};

const openPlayer = (work: (typeof works)[number]) => {
  selectedWork.value = work;
};

const closePlayer = () => {
  selectedWork.value = null;
};

const showAdjacentWork = (direction: -1 | 1) => {
  if (selectedWorkIndex.value < 0) return;

  const nextIndex = (selectedWorkIndex.value + direction + works.length) % works.length;
  selectedWork.value = works[nextIndex];
};

const showView = (view: "home" | "demo" | "resume") => {
  activeView.value = view;
  closePlayer();
  window.scrollTo({ top: 0, behavior: "auto" });
  nextTick(() => {
    if (view !== "home") {
      panelRefs.value = [];
    }
    updatePanelClips();
  });
};

const panelRefs = ref<HTMLElement[]>([]);
let clipFrame = 0;

const setPanelRef = (el: Element | null, index: number) => {
  if (el instanceof HTMLElement) {
    panelRefs.value[index] = el;
  }
};

const updatePanelClips = () => {
  const viewportHeight = window.innerHeight;

  panelRefs.value.forEach((panel, index) => {
    const media = panel.querySelector<HTMLElement>(".fixed-media");
    if (!media) return;

    const rect = panel.getBoundingClientRect();
    const shouldScrollOut = index === panelRefs.value.length - 1 && rect.bottom < viewportHeight;

    if (shouldScrollOut) {
      media.style.position = "absolute";
      media.style.opacity = "1";
      media.style.clipPath = "none";
      return;
    }

    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(viewportHeight, rect.bottom);
    const isVisible = visibleBottom > visibleTop;

    media.style.position = "fixed";
    media.style.opacity = isVisible ? "1" : "0";
    media.style.clipPath = `inset(${visibleTop}px 0 ${Math.max(0, viewportHeight - visibleBottom)}px 0)`;
  });
};

const requestClipUpdate = () => {
  cancelAnimationFrame(clipFrame);
  clipFrame = requestAnimationFrame(updatePanelClips);
};

onMounted(() => {
  nextTick(updatePanelClips);
  window.addEventListener("scroll", requestClipUpdate, { passive: true });
  window.addEventListener("resize", requestClipUpdate);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(clipFrame);
  window.removeEventListener("scroll", requestClipUpdate);
  window.removeEventListener("resize", requestClipUpdate);
});
</script>

<template>
  <main class="vfx-page">
    <header class="site-header">
      <div class="identity">
        <span class="name">RUIDING FENG</span>
        <span class="role">VFX Artist</span>
      </div>

      <div class="rule"></div>

      <nav class="nav-links" aria-label="VFX navigation">
        <button
          :class="{ active: activeView === 'home' }"
          type="button"
          @click="showView('home')"
        >
          Home
        </button>
        <button
          :class="{ active: activeView === 'demo' }"
          type="button"
          @click="showView('demo')"
        >
          Demo
        </button>
        <button
          :class="{ active: activeView === 'resume' }"
          type="button"
          @click="showView('resume')"
        >
          Resume
        </button>
        <a href="/information">About Me</a>
      </nav>
    </header>

    <template v-if="activeView === 'home'">
      <section id="demo" :ref="(el) => setPanelRef(el, 0)" class="hero-showcase fixed-panel">
        <div :id="heroWork.id" class="hero-media fixed-media">
          <video
            :id="`${heroWork.id}-video`"
            :key="heroWork.id"
            :src="heroWork.video"
            :poster="heroWork.poster"
            autoplay
            muted
            playsinline
            preload="metadata"
            @ended="playNextHero"
          ></video>
        </div>
        <div class="screen-caption">
          <h2>FX</h2>
          <p>An enchanting realm of FX particles crafted with Houdini.</p>
        </div>
      </section>

      <section id="ed-a3" :ref="(el) => setPanelRef(el, 1)" class="ed-showcase fixed-panel">
        <div :id="edWork.id" class="ed-media fixed-media">
          <video
            :id="`${edWork.id}-video`"
            :src="edWork.video"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          ></video>
        </div>
        <div class="screen-caption">
          <h2>Unreal Engine</h2>
          <p>Real-time cinematic environment and lighting study.</p>
        </div>
      </section>

      <section id="procedural" :ref="(el) => setPanelRef(el, 2)" class="section-showcase fixed-panel">
        <div :id="proceduralWork.id" class="section-media fixed-media">
          <video
            :id="`${proceduralWork.id}-video`"
            :key="proceduralWork.id"
            :src="proceduralWork.video"
            :poster="proceduralWork.poster"
            autoplay
            muted
            playsinline
            preload="metadata"
            @ended="playNextProcedural"
          ></video>
        </div>
        <div class="screen-caption">
          <h2>Houdini procedure</h2>
          <p>Procedural motion, systems, and simulation-driven visual design.</p>
        </div>
      </section>

      <section id="triple" class="triple-stage" aria-label="Selected VFX triptych">
        <div class="triple-grid">
          <article v-for="work in tripleWorks" :id="work.id" :key="work.id" class="triple-card">
            <img
              v-if="work.image"
              :id="`${work.id}-image`"
              :src="work.image"
              :alt="work.title"
            />
            <video
              v-else
              :id="`${work.id}-video`"
              :src="work.video"
              :poster="work.poster"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            ></video>
          </article>
        </div>
      </section>
    </template>

    <section v-else-if="activeView === 'demo'" id="demo-gallery" class="demo-gallery" aria-label="Demo video index">
      <div class="demo-gallery-inner">
        <h2>Demo</h2>
        <section v-for="group in demoGroups" :key="group.category" class="demo-group">
          <h3>{{ group.category }}</h3>
          <div class="demo-grid">
            <button
              v-for="work in group.works"
              :key="`${work.id}-demo`"
              class="demo-item"
              type="button"
              @click="openPlayer(work)"
            >
              <span class="demo-thumb">
                <img v-if="work.image" :src="work.image" :alt="work.title" />
                <video
                  v-else
                  :src="work.video"
                  :poster="work.poster"
                  muted
                  playsinline
                  preload="metadata"
                ></video>
              </span>
              <span class="demo-meta">
                <span class="demo-id">{{ work.id }}</span>
                <span class="demo-title">{{ work.title }}</span>
                <span class="demo-subtitle">{{ work.subtitle }}</span>
              </span>
            </button>
          </div>
        </section>
      </div>
    </section>

    <section v-else-if="activeView === 'resume'" class="resume-stage" aria-label="Resume preview">
      <div class="resume-stage-label resume-stage-label--left" aria-hidden="true">CURRICULUM VITAE</div>
      <div class="resume-stage-label resume-stage-label--right" aria-hidden="true">RUIDING FENG</div>
      <div class="resume-document">
        <iframe
          :src="resumeFileUrl"
          title="Ruiding Feng Resume"
        ></iframe>
      </div>
    </section>

    <Teleport to="body">
      <div v-if="selectedWork" class="video-modal" role="dialog" aria-modal="true" @click.self="closePlayer">
        <div class="video-modal-panel">
          <div class="video-modal-head">
            <div>
              <span class="video-modal-id">{{ selectedWork.id }}</span>
              <h2>{{ selectedWork.title }}</h2>
            </div>
            <button class="video-modal-close" type="button" aria-label="Close video" @click="closePlayer">
              Close
            </button>
          </div>
          <img
            v-if="selectedWork.image"
            :key="`${selectedWork.id}-image`"
            :src="selectedWork.image"
            :alt="selectedWork.title"
            class="video-modal-image"
          />
          <video
            v-else
            :key="selectedWork.id"
            :src="selectedWork.video"
            :poster="selectedWork.poster"
            controls
            autoplay
            playsinline
          ></video>
        </div>
        <button
          class="video-modal-nav video-modal-nav--prev"
          type="button"
          aria-label="Previous media"
          @click.stop="showAdjacentWork(-1)"
        >
          ‹
        </button>
        <button
          class="video-modal-nav video-modal-nav--next"
          type="button"
          aria-label="Next media"
          @click.stop="showAdjacentWork(1)"
        >
          ›
        </button>
      </div>
    </Teleport>

  </main>
</template>

<style scoped>
.vfx-page {
  min-height: 100vh;
  background: #000;
  color: #f8f8f2;
  font-family: Arial, Helvetica, sans-serif;
  overflow: visible;
}

.site-header {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 80px 24px 30px;
  text-align: center;
  background: #000;
  overflow: hidden;
  isolation: isolate;
  user-select: none;
}

.identity {
  display: block;
  max-width: 988px;
  margin: 0 auto;
  color: #fff;
}

.name {
  display: block;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 44px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
}

.role {
  display: block;
  margin-top: 12px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
}

.rule {
  max-width: 988px;
  height: 1px;
  margin: 14px auto 24px;
  background: rgba(255, 255, 255, 0.82);
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 28px;
  max-width: 988px;
  margin: 0 auto;
  font-size: 14px;
}

.nav-links a,
.nav-links button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #f4f4f4;
  text-decoration: none;
  font: inherit;
  cursor: pointer;
}

.nav-links a:first-child,
.nav-links a:hover,
.nav-links button:hover,
.nav-links button.active {
  color: #5fbfac;
}

.fixed-panel {
  position: relative;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #000;
}

.fixed-media {
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  clip-path: inset(100vh 0 0 0);
}

.hero-media,
.ed-media {
  display: grid;
  place-items: center;
}

.hero-media video,
.ed-media video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.screen-caption {
  position: sticky;
  top: 0;
  z-index: 1;
  display: grid;
  place-items: center;
  align-content: center;
  height: 100vh;
  padding: 24px;
  color: #fff;
  text-align: center;
  pointer-events: none;
}

.screen-caption h2 {
  margin: 0 0 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(36px, 4.2vw, 66px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.46);
}

.screen-caption p {
  max-width: min(1120px, calc(100vw - 48px));
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(18px, 2vw, 34px);
  line-height: 1.16;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
}

.section-showcase h2 {
  margin: 0 0 28px;
  text-align: center;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 34px;
  line-height: 1;
  letter-spacing: 0;
}

.section-media {
  display: grid;
  place-items: center;
}

.section-media video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.triple-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  width: 100%;
  max-width: 100vw;
  gap: 0;
  background: transparent;
  transform: translateY(-8vh);
  margin-bottom: -8vh;
}

.triple-card {
  min-width: 0;
  line-height: 0;
}

.triple-card video,
.triple-card img {
  display: block;
  width: 100%;
  height: auto;
}

.triple-stage {
  position: relative;
  z-index: 1;
  background: #000;
  line-height: 0;
}

.demo-gallery {
  position: relative;
  z-index: 1;
  background: #000;
  padding: 90px 24px 110px;
}

.demo-gallery-inner {
  width: min(1180px, 100%);
  margin: 0 auto;
}

.demo-gallery h2 {
  margin: 0 0 28px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 34px;
  line-height: 1;
  letter-spacing: 0;
}

.demo-group + .demo-group {
  margin-top: 48px;
}

.demo-group h3 {
  margin: 0 0 14px;
  color: #5fbfac;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: rgba(255, 255, 255, 0.16);
}

.demo-item {
  display: grid;
  gap: 0;
  min-width: 0;
  padding: 0;
  border: 0;
  background: #000;
  color: #fff;
  text-align: left;
  cursor: pointer;
}

.demo-thumb {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #060606;
}

.demo-thumb video,
.demo-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 180ms ease, opacity 180ms ease;
}

.demo-item:hover .demo-thumb video,
.demo-item:hover .demo-thumb img {
  transform: scale(1.035);
  opacity: 0.82;
}

.demo-meta {
  display: grid;
  gap: 8px;
  padding: 18px 18px 20px;
}

.demo-id {
  color: #5fbfac;
  font-size: 12px;
  letter-spacing: 0;
  text-transform: uppercase;
}

.demo-title {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  line-height: 1.1;
}

.demo-subtitle {
  color: rgba(255, 255, 255, 0.66);
  font-size: 13px;
  line-height: 1.45;
}

.video-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 28px;
  background: rgba(0, 0, 0, 0.82);
}

.resume-stage {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 243px);
  padding: 34px 24px 52px;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.16), transparent 34%),
    linear-gradient(180deg, #050505 0%, #000 44%, #040706 100%),
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.026) 0,
      rgba(255, 255, 255, 0.026) 1px,
      transparent 1px,
      transparent 4px
    ),
    #000;
  background-blend-mode: screen, normal, normal, normal;
}

.resume-stage::before {
  position: absolute;
  inset: 28px 44px;
  z-index: 0;
  pointer-events: none;
  content: "";
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(95, 191, 172, 0.16);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -1px 0 rgba(95, 191, 172, 0.08);
  background:
    linear-gradient(90deg, rgba(95, 191, 172, 0.42), transparent 30%, transparent 70%, rgba(95, 191, 172, 0.42)) 0 0 / 100% 1px no-repeat,
    linear-gradient(90deg, rgba(255, 255, 255, 0.18), transparent 22%, transparent 78%, rgba(255, 255, 255, 0.18)) 0 100% / 100% 1px no-repeat;
}

.resume-stage::after {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  content: "";
  opacity: 0.9;
  background:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0 6px, transparent 6px 18px) left 42px top 0 / 1px 100% no-repeat,
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0 6px, transparent 6px 18px) right 42px top 0 / 1px 100% no-repeat,
    linear-gradient(90deg, transparent 0 18%, rgba(255, 255, 255, 0.05) 50%, transparent 82%),
    linear-gradient(180deg, transparent 0 65%, rgba(95, 191, 172, 0.08) 100%);
  mix-blend-mode: screen;
}

.resume-stage-label {
  position: absolute;
  z-index: 1;
  top: 50%;
  color: rgba(255, 255, 255, 0.32);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 12px;
  letter-spacing: 0.42em;
  line-height: 1;
  pointer-events: none;
  text-transform: uppercase;
}

.resume-stage-label--left {
  left: 26px;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: center;
}

.resume-stage-label--right {
  right: 26px;
  transform: translateY(-50%) rotate(90deg);
  transform-origin: center;
}

.resume-document {
  position: relative;
  z-index: 1;
  height: calc(100vh - 315px);
  min-height: 1000px;
  width: min(860px, 100%);
  margin: 0 auto;
  background: #fff;
  border: 1px solid rgba(255, 255, 255, 0.38);
  box-shadow:
    0 46px 120px rgba(0, 0, 0, 0.82),
    0 0 0 1px rgba(0, 0, 0, 0.68),
    0 0 70px rgba(95, 191, 172, 0.16),
    0 -1px 0 rgba(255, 255, 255, 0.5);
  overflow: hidden;
}

.resume-document iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #fff;
  color-scheme: light;
}

.video-modal-panel {
  width: min(1180px, 100%);
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
}

.video-modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
}

.video-modal-id {
  display: block;
  margin-bottom: 5px;
  color: #5fbfac;
  font-size: 12px;
}

.video-modal-head h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  line-height: 1.1;
}

.video-modal-close {
  flex: 0 0 auto;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.video-modal-close:hover {
  border-color: #5fbfac;
  color: #5fbfac;
}

.video-modal-nav {
  position: fixed;
  top: 50%;
  z-index: 101;
  display: grid;
  place-items: center;
  width: 46px;
  height: 64px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 48px;
  line-height: 1;
  transform: translateY(-50%);
  cursor: pointer;
}

.video-modal-nav:hover {
  border-color: #5fbfac;
  color: #5fbfac;
}

.video-modal-nav--prev {
  left: max(16px, calc((100vw - 1280px) / 2));
}

.video-modal-nav--next {
  right: max(16px, calc((100vw - 1280px) / 2));
}

.video-modal-panel video,
.video-modal-image {
  display: block;
  width: 100%;
  max-height: min(72vh, 760px);
  background: #000;
}

.video-modal-image {
  height: auto;
  object-fit: contain;
}

@media (max-width: 760px) {
  .site-header {
    padding-top: 54px;
  }

  .name {
    font-size: 34px;
  }

  .role {
    font-size: 17px;
  }

  .nav-links {
    flex-wrap: wrap;
    gap: 14px 24px;
  }

  .triple-grid {
    grid-template-columns: 1fr;
    transform: translateY(-4vh);
    margin-bottom: -4vh;
  }

  .demo-gallery {
    padding: 58px 16px 78px;
  }

  .demo-grid {
    grid-template-columns: 1fr;
  }

  .resume-stage {
    min-height: calc(100vh - 211px);
    padding: 18px 12px 32px;
  }

  .resume-stage::before {
    inset: 14px;
  }

  .resume-stage::after {
    background:
      linear-gradient(90deg, transparent 0 12%, rgba(255, 255, 255, 0.045) 50%, transparent 88%),
      linear-gradient(180deg, transparent 0 65%, rgba(95, 191, 172, 0.08) 100%);
  }

  .resume-stage-label {
    display: none;
  }

  .resume-document {
    height: calc(100vh - 261px);
    min-height: 610px;
  }

  .video-modal {
    padding: 12px;
  }

  .video-modal-head {
    align-items: flex-start;
  }

  .video-modal-nav {
    top: auto;
    bottom: 18px;
    width: 42px;
    height: 48px;
    font-size: 38px;
    transform: none;
  }

  .video-modal-nav--prev {
    left: 18px;
  }

  .video-modal-nav--next {
    right: 18px;
  }
}
</style>
