<script setup lang="ts">
const navItems = [
  { id: "about", label: "About Me" },
  { id: "contact", label: "Contact" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<template>
  <div class="info-page">
    <div class="masthead">
      <div class="masthead-inner">
        <nav class="site-nav">
          <a href="/" class="site-title">Ruiding Feng</a>
          <ul class="nav-links">
            <li v-for="item in navItems" :key="item.id">
              <a :href="`#${item.id}`" @click.prevent="scrollTo(item.id)">{{ item.label }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="main-wrap">
      <aside class="sidebar">
        <div class="profile-box">
          <div class="avatar">
            <span class="avatar-text">R</span>
          </div>
          <div class="profile-content">
            <h3 class="profile-name">Ruiding Feng</h3>
          </div>
          <ul class="profile-links">
            <li><i class="loc-icon">📍</i> China / Remote</li>
            <li>
              <a href="mailto:rf711@scarletmail.rutgers.edu">
                <i class="link-icon">✉️</i> Email
              </a>
            </li>
            <li>
              <a href="https://github.com/RichardFeng000/" target="_blank" rel="noopener noreferrer">
                <i class="link-icon">⭐</i> GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ruiding-feng-552640268/" target="_blank" rel="noopener noreferrer">
                <i class="link-icon">💼</i> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <main class="page-content">
        <article>
          <section id="about" class="content-section">
            <h1>Ruiding Feng</h1>

            <p>
              I am Ruiding Feng, a graduate student in Computer Science at Rutgers
              University.
            </p>

            <p>
              My research interests include computer vision and robotics.
            </p>

            <p>
              Before Rutgers, I received my B.A. in Computer Science and Mathematics from
              Boston University and spent a year studying Visual Effects at SCAD.
            </p>

            <p>
              Outside academia, I enjoy shooting with film cameras.
            </p>

            <h2>🔬 Research Focus</h2>
            <p>Computer Vision and Robotics.</p>

            <h2>🌍 Vision</h2>
            <p>Building embodied intelligence for the physical world.</p>

            <h2>🚀 Research Highlights</h2>

            <h2>🔥 News</h2>

            <h2>📝 Publications</h2>
            <p>
              <a href="https://arxiv.org/html/2606.04172v1" target="_blank" rel="noopener noreferrer">
                <strong>Affordance2Action: Task-Conditioned Scene-Level Affordance Grounding for Real-Time Manipulation</strong>
              </a>
            </p>
          </section>

          <section id="contact" class="content-section">
            <h1>Contact</h1>
            <ul>
              <li>
                <a href="mailto:rf711@scarletmail.rutgers.edu">rf711@scarletmail.rutgers.edu</a>
              </li>
              <li>
                <a href="https://github.com/RichardFeng000/" target="_blank" rel="noopener noreferrer">github.com/RichardFeng000</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ruiding-feng-552640268/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
            </ul>
          </section>
        </article>
      </main>
    </div>
  </div>
</template>

<style scoped>
.info-page {
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  color: #494e52;
  background: #fff;
  min-height: 100vh;
}

.info-page :deep(a) {
  color: #224b8d;
  text-decoration: none;
}

.info-page :deep(a:hover) {
  text-decoration: underline;
}

.info-page :deep(h1),
.info-page :deep(h2) {
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-weight: bold;
  line-height: 1.2;
  color: #222;
  margin: 1em 0 0.5em;
}

.info-page :deep(h1) {
  font-size: 1.4em;
  margin-top: 1em;
}

.info-page :deep(h2) {
  font-size: 1.2em;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
}

.info-page :deep(ul) {
  padding-left: 1.5em;
}

.info-page :deep(li) {
  margin-bottom: 0.35em;
}

.masthead {
  position: sticky;
  top: 0;
  z-index: 20;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.masthead-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 3.5rem;
}

.site-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #222 !important;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  font-size: 0.9rem;
  color: #494e52;
  padding: 0.5rem 0;
}

.nav-links a:hover {
  color: #224b8d;
}

.main-wrap {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  gap: 2.5rem;
}

.sidebar {
  width: 240px;
  flex-shrink: 0;
}

.profile-box {
  position: sticky;
  top: 5rem;
}

.avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d97a57, #a06040);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.avatar-text {
  font-size: 3.5rem;
  font-weight: bold;
  color: #fff;
  font-family: "Trebuchet MS", Helvetica, sans-serif;
}

.profile-content {
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 1.15rem;
  font-weight: bold;
  margin: 0 0 0.25rem;
  color: #222;
}

.profile-links {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.88rem;
}

.profile-links li {
  margin-bottom: 0.6rem;
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
}

.profile-links a {
  color: #494e52;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.profile-links a:hover {
  color: #224b8d;
}

.loc-icon,
.link-icon {
  display: inline-block;
  width: 1.2em;
  text-align: center;
  flex-shrink: 0;
  font-style: normal;
}

.page-content {
  flex: 1;
  min-width: 0;
}

.content-section {
  margin-bottom: 3rem;
}

@media (max-width: 900px) {
  .main-wrap {
    flex-direction: column;
    gap: 1.5rem;
  }

  .sidebar {
    width: 100%;
    position: static;
  }

  .profile-box {
    position: static;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    column-gap: 1.25rem;
    row-gap: 0.25rem;
    align-items: flex-start;
  }

  .avatar {
    width: 100px;
    height: 100px;
    grid-row: span 2;
    flex-shrink: 0;
  }

  .avatar-text {
    font-size: 2.5rem;
  }
}

@media (max-width: 600px) {
  .nav-links {
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .nav-links a {
    font-size: 0.8rem;
  }

  .site-title {
    font-size: 1rem;
  }

  .profile-box {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }

  .avatar {
    grid-row: auto;
  }

  .profile-links li {
    justify-content: center;
  }
}
</style>
