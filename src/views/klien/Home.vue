<template>
  <div class="home-klien">
    <div class="container mt-3">
      <h1 class="text-h1">
        Selamat datang, Klien
        <span class="text-primary text-capitalize text-decoration-underline">{{
          this.$store.state.session.nama
        }}</span>
      </h1>
      <router-link class="btn btn-primary" :to="{ name: 'LayananKlien' }"
        >Tambah Pemeriksaan</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeKlien",
};
</script>

<style lang="scss" scoped>
.btn {
  font-size: 13px;
}
.home-klien {
  min-height: 669.6px;
  width: 100%;
  background: url("https://pptuii.id/wp-content/uploads/2020/10/psychiatrist_13.png")
    no-repeat center center/cover;
  padding: 16px;
}
</style>
