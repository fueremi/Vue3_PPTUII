<template>
  <Loading v-if="loading" />
  <div class="home-admin">
    <div class="container mt-3">
      <h1 class="text-h1">
        Selamat datang, Admin
        <span class="text-primary text-capitalize text-decoration-underline">{{
          this.$store.state.session.nama
        }}</span>
      </h1>
      <div class="mt-4">
        <h2 class="text-primary text-h2">Jadwal Pelayanan Anda</h2>
        <TablePelayanan v-if="allPelayanan" :pelayanan="allPelayanan" />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import TablePelayanan from "@/components/TablePelayanan";

import { getAllPelayanan } from "@/services/apis/pelayanan";

export default {
  name: "HomeAdmin",
  components: {
    Loading,
    TablePelayanan,
  },
  data() {
    return {
      loading: false,
      allPelayanan: null,
    };
  },
  async created() {
    this.loading = true;
    this.allPelayanan = await getAllPelayanan();
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.home-admin {
  min-height: 669.6px;
  width: 100%;
  background: url("https://pptuii.id/wp-content/uploads/2020/10/psychiatrist_13.png")
    no-repeat center center/cover;
  padding: 16px;
}
</style>
