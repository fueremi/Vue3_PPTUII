<template>
  <Loading v-if="loading" />
  <div class="home-psikolog">
    <div class="container mt-3">
      <h1 class="text-h1">
        Selamat datang, Admin
        <span class="text-primary text-capitalize text-decoration-underline">{{
          this.$store.state.session.nama
        }}</span>
      </h1>
      <div class="mt-4">
        <h2 class="text-primary text-h2">Jadwal Pelayanan Pasien Anda</h2>
        <TablePelayanan
          v-if="pelayananPsikolog"
          :pelayanan="pelayananPsikolog"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import TablePelayanan from "@/components/TablePelayanan";

import { getPelayananByIdPsikolog } from "@/services/apis/pelayanan";

export default {
  name: "HomePsikolog",
  components: {
    Loading,
    TablePelayanan,
  },
  data() {
    return {
      loading: false,
      pelayananPsikolog: null,
    };
  },
  async created() {
    this.loading = true;
    this.pelayananPsikolog = await getPelayananByIdPsikolog(
      this.$store.state.session.id
    );
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.home-psikolog {
  min-height: 669.6px;
  width: 100%;
  background: url("https://pptuii.id/wp-content/uploads/2020/10/psychiatrist_13.png")
    no-repeat center center/cover;
  padding: 16px;

  .btn {
    box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.37);
  }
}
</style>
