<template>
  <Loading v-if="loading" />
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
      <div class="mt-4">
        <h2 class="text-primary text-h2">Jadwal Pelayanan Anda</h2>
        <TablePelayanan
          v-if="pelayananKlien"
          :pelayanan="pelayananKlien"
          @on-click-cancel="onClickCancel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

import Loading from "@/components/Loading";
import TablePelayanan from "@/components/TablePelayanan";

import {
  getPelayananByIdKlien,
  cancelPelayanan,
} from "@/services/apis/pelayanan";

export default {
  name: "HomeKlien",
  components: {
    Loading,
    TablePelayanan,
  },
  data() {
    return {
      loading: false,
      pelayananKlien: null,
    };
  },
  methods: {
    onClickCancel(id) {
      Swal.fire({
        title: "Apakah kamu yakin?",
        html: `Kamu akan membatalkan <span class="text-primary">Pelayanan</span> ini! <hr> <small>Setelah membatalkan, <span class="text-primary">Pelayanan</span> tidak dapat diubah lagi!</small>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#8e64f3",
        cancelButtonColor: "#d33",
        confirmButtonText: "Saya yakin!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.loading = true;
          const hasil = await cancelPelayanan(id);
          if (hasil > 0) {
            this.pelayananKlien = await getPelayananByIdKlien(
              this.$store.state.session.id
            );
            Swal.fire({
              icon: "success",
              title: "Yeay...",
              html: `<span class="text-primary">Pelayanan</span> berhasil dibatalkan!`,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              html: `Gagal membatalkan <span class="text-primary">Pelayanan</span> <hr> <small>Silahkan coba beberapa saat lagi!</small>`,
            });
          }
          this.loading = false;
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `Pembatalan <span class="text-primary">Pelayanan</span> dibatalkan!`,
          });
        }
      });
    },
  },
  async created() {
    this.loading = true;
    this.pelayananKlien = await getPelayananByIdKlien(
      this.$store.state.session.id
    );
    this.loading = false;
  },
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

  .jadwal-container {
    padding: 20px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.45);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    width: 100%;
    position: relative;

    i {
      color: #8e64f3;
      top: 5px;
      position: absolute;
      height: 5px;

      &.fa-trash {
        right: 5px;
      }
    }

    .profile {
      display: flex;
      width: 30px;
      height: 30px;
      align-items: center;
      justify-content: center;
      background-color: #8e64f3;
      color: #fff;
      border-radius: 50%;
    }
  }
}
</style>
