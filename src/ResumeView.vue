<script setup lang="ts">
import resumeFileUrl from "../materials/Resume_Ruiding_Feng.pdf?url";
</script>

<template>
  <main class="resume-page">
    <iframe
      :src="resumeFileUrl"
      class="resume-page-frame"
      title="Ruiding Feng Resume"
    ></iframe>
  </main>
</template>

<style scoped>
.resume-page {
  width: 100vw;
  height: 100vh;
  margin: 0;
  background: #111;
}

.resume-page-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #fff;
}
</style>
