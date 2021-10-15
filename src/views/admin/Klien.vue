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

      <h2 class="text-h2">Master <span class="text-primary">Klien</span></h2>
      <div class="row gap-3 mt-4">
        <div class="col-md-3" v-for="klien in klien" :key="klien.id">
          <TableUser :user="klien" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import TableUser from "@/components/TableUser";

import { getUserKlien } from "@/services/apis/user";

export default {
  name: "MasterKlien",
  components: {
    Loading,
    TableUser,
  },
  data() {
    return {
      loading: false,
      klien: null,
    };
  },
  async created() {
    this.loading = true;
    this.klien = await getUserKlien();
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
