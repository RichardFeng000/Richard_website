<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer?.observe(el));
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="page">
    <header class="top-bar">
      <div class="top-inner reveal">
        <div class="top-title">RUIDING FENG</div>
        <div class="top-subtitle">CG Generalist / VFX</div>
        <div class="top-line"></div>
        <nav class="top-nav">
          <a href="#home">Home</a>
          <a href="#demo">Demo</a>
          <a href="#breakdown">Breakdown</a>
          <a href="#about">About Me</a>
        </nav>
      </div>
    </header>

    <main>
      <section id="home" class="hero">
        <div class="hero-image reveal">
          <div class="hero-overlay">
            <h2>FX</h2>
            <p>An enchanting realm of FX particles created with the magic of Houdini.</p>
          </div>
        </div>
      </section>

      <section id="demo" class="section">
        <div class="section-head reveal">
          <h2>Demo</h2>
          <p>Showreel, selected shots, or a full demo video.</p>
        </div>
        <div class="demo-block reveal">
          <div class="demo-media">
            <div class="demo-frame"></div>
          </div>
          <div class="demo-text">
            <h3>2026 Demo Reel</h3>
            <p>
              A curated selection of VFX and CG work, focusing on lighting, simulation,
              and compositing.
            </p>
          </div>
        </div>
      </section>

      <section id="breakdown" class="section">
        <div class="section-head reveal">
          <h2>Breakdown</h2>
          <p>Process notes and before/after comparisons.</p>
        </div>
        <div class="breakdown-grid">
          <article class="breakdown-card reveal">
            <div class="breakdown-frame"></div>
            <h3>Lighting Pass</h3>
            <p>Key, fill, and rim adjustments with mood testing.</p>
          </article>
          <article class="breakdown-card reveal" style="--delay: 120ms">
            <div class="breakdown-frame"></div>
            <h3>Sim & FX</h3>
            <p>Fluid and particle simulations with timing controls.</p>
          </article>
          <article class="breakdown-card reveal" style="--delay: 240ms">
            <div class="breakdown-frame"></div>
            <h3>Compositing</h3>
            <p>Layered passes and color balancing for final output.</p>
          </article>
        </div>
      </section>

      <section id="about" class="section about">
        <div class="section-head reveal">
          <h2>About Me</h2>
          <p>
            I create cinematic visuals and real-time demos that bridge storytelling,
            rendering, and technical artistry.
          </p>
        </div>
        <div class="about-content reveal">
          <p>
            Available for collaboration on short-form cinematic work, interactive
            installations, and research-driven demos.
          </p>
        </div>
      </section>
    </main>

    <footer class="footer reveal">
      <span>© 2026 Ruiding Feng</span>
      <span class="dot">·</span>
      <a href="https://github.com/yourname">GitHub</a>
      <span class="dot">·</span>
      <a href="https://www.linkedin.com/in/yourname">LinkedIn</a>
    </footer>
  </div>
</template>
