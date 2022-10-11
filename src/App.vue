<script setup>
  import { RouterView } from 'vue-router'
  import date from 'date-and-time';

  const now = new Date();
  const year_month = date.format(now, 'YYYY/MM');
</script>

<template>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link :to="{ path: '/events/calendar/' + year_month }" class="nav-link px-2 text-secondary" exact-active-class="text-white">Calendar</router-link></li>
          <li><router-link to="/events" class="nav-link px-2 text-secondary" exact-active-class="text-white">Events</router-link></li>
          <li><router-link to="/types" class="nav-link px-2 text-secondary" exact-active-class="text-white">Types</router-link></li>
        </ul>
      </div>
    </div>
  </header>
  <div class="container">
    <RouterView :key="$route.path"/>
  </div>
</template>

<style scoped>
</style>


