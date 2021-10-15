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
      <div class="d-flex justify-content-between align-items-center">
        <router-link
          class="btn btn-primary text-h3"
          :to="{ name: 'LayananKlien' }"
          >Tambah</router-link
        >
        <button class="btn btn-primary mb-3 text-h3" @click="onToggle">
          Edit
        </button>
      </div>

      <div class="row gap-3 mt-3">
        <div
          class="col-md-3"
          v-for="psikologAssociate in psikologAssociate"
          :key="psikologAssociate.id"
        >
          <TableUser :user="psikologAssociate" :toggle="toggle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import TableUser from "@/components/TableUser";

import { getUserPsikologAssociate } from "@/services/apis/user";

export default {
  name: "MasterPsikolog",
  components: {
    Loading,
    TableUser,
  },
  data() {
    return {
      loading: false,
      psikologAssociate: null,
      toggle: false,
    };
  },
  methods: {
    onToggle() {
      this.toggle = !this.toggle;
    },
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
