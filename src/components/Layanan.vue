<template>
  <div class="layanan-wrapper">
    <h2>{{ layanan.nama }}</h2>
    <p class="flex-grow-1" v-if="!(layanan.deskripsi === '-')">
      {{ layanan.deskripsi }}
    </p>

    <router-link
      :to="{ name: 'TambahPemeriksaanKlien', params: { id: layanan.id } }"
      class="mb-auto btn btn-light text-primary"
      >Daftar</router-link
    >
  </div>
</template>

<script>
export default {
  name: "LayananComponent",
  props: ["layanan"],
};
</script>

<style lang="scss" scoped>
.layanan-wrapper {
  h2 {
    font-size: 16px;
  }

  p {
    text-align: justify;
    font-size: 14px;
  }

  a {
    font-size: 14px;

    &:hover {
      font-weight: bold;
    }
  }
}
</style>
