<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Ubuntu", sans-serif;
  color: #333;
}

.btn-primary,
.bg-primary {
  background-color: #8e64f3 !important;
  border-color: #8e64f3 !important;
}

.text-primary {
  color: #8e64f3 !important;
}

.table-primary {
  --bs-table-bg: #d3c3f8 !important;
}

.text-h1 {
  font-size: 20px;
}

.text-h2 {
  font-size: 16px;
}

.text-h3 {
  font-size: 12px !important;
}

.back-button {
  font-size: 14px;
}
</style>
