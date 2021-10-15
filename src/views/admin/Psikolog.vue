<template>
  <Loading v-if="loading" />
  <div class="home-admin">
    <div class="container mt-3">
      <h1 class="text-h1 mb-4">
        Selamat datang, Admin
        <span class="text-primary text-capitalize text-decoration-underline">{{
          this.$store.state.session.nama
        }}</span>
      </h1>

      <h2 class="text-h2">
        Master <span class="text-primary">Psikolog/Associate</span>
      </h2>
      <router-link
        class="btn btn-primary text-h3"
        :to="{ name: 'LayananKlien' }"
        >Tambah</router-link
      >
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";

import { getUserPsikologAssociate } from "@/services/apis/user";

export default {
  name: "MasterPsikolog",
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      psikologAssociate: null,
    };
  },
  async created() {
    this.loading = true;
    this.psikologAssociate = await getUserPsikologAssociate();
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
