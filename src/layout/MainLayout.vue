<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <app-message />
    <router-view />
  </div>
</template>

<script>
  import TheNavbar from "@/components/TheNavbar";
  import AppMessage from "@/components/ui/AppMessage";

  export default {
    name: "MainLayout",
    components: {
      TheNavbar,
      AppMessage
    }
  }
</script>

<style scoped>

</style>