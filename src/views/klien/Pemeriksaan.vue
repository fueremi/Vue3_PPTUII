<template>
  <Loading v-if="loading" />
  <div class="daftar-layanan-pasien-wrapper">
    <div class="container" v-if="layanan">
      <router-link
        class="back-button text-primary"
        :to="{ name: 'LayananKlien' }"
        >Kembali
      </router-link>
      <h1 class="my-4">
        Daftar Layanan
        <span class="text-primary text-decoration-underline">{{
          layanan.nama
        }}</span>
      </h1>
      <div class="row">
        <div class="col-md-4">
          <p>{{ layanan.deskripsi }}</p>
        </div>
        <div class="col-md-8"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLayananById } from "@/services/apis/layanan";
import Loading from "@/components/Loading";

export default {
  name: "DaftarLayananKlien",
  components: {
    Loading,
  },
  data() {
    return {
      layanan: null,
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    this.layanan = await getLayananById(this.$route.params.id);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.daftar-layanan-pasien-wrapper {
  min-height: 669.6px;
  width: 100%;
  background: url("https://pptuii.id/wp-content/uploads/2020/10/psychiatrist_13.png")
    no-repeat center center/cover;
  padding: 16px;

  h1 {
    font-size: 20px;
  }
  p {
    text-align: justify;
  }
}
</style>
