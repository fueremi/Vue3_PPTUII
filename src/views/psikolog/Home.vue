<template>
  <Loading v-if="loading" />
  <div class="home-psikolog">
    <div class="container mt-3">
      <h1 class="text-h1">
        Selamat datang,
        <span class="text-capitalize">{{
          this.$store.state.session.role
        }}</span>
        &nbsp;
        <span class="text-primary text-capitalize text-decoration-underline">{{
          this.$store.state.session.nama
        }}</span>
      </h1>
      <div class="mt-4">
        <h2 class="text-primary text-h2">
          Jadwal Pelayanan Pasien Anda (Terkonfirmasi)
        </h2>
        <TablePelayanan v-if="pelayananPsikolog" :pelayanan="approve" />
      </div>
      <div class="mt-4">
        <h2 class="text-primary text-h2">
          Jadwal Pelayanan Pasien Anda (Perlu Dikonfirmasi)
        </h2>
        <TablePelayanan
          v-if="pelayananPsikolog"
          :pelayanan="statusATPA"
          @on-click-approve="approvePelayanan"
        />
      </div>
      <div class="mt-4">
        <h2 class="text-primary text-h2">
          Jadwal Pelayanan Pasien Anda (Perlu Dikonfirmasi)
        </h2>
        <TablePelayanan
          v-if="pelayananPsikolog"
          :pelayanan="waiting"
          @on-click-approve="approvePelayanan"
        />
      </div>
      <div class="mt-4">
        <h2 class="text-primary text-h2">
          Jadwal Pelayanan Pasien Anda (Selesai)
        </h2>
        <TablePelayanan
          v-if="pelayananPsikolog"
          :pelayanan="done"
          @on-click-approve="approvePelayanan"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

import Loading from "@/components/Loading";
import TablePelayanan from "@/components/TablePelayanan";

import { getPelayananByIdPsikolog, PAToKlien } from "@/services/apis/pelayanan";

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
  methods: {
    approvePelayanan(id) {
      Swal.fire({
        title: "Apakah kamu yakin?",
        html: `Kamu akan approve <span class="text-primary">Pelayanan</span> ini! <hr> <small>Setelah diapprove, <span class="text-primary">Pelayanan</span> tidak dapat dibatalkan!</small>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#8e64f3",
        cancelButtonColor: "#d33",
        confirmButtonText: "Saya yakin!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.loading = true;
          const hasil = await PAToKlien(id);
          if (hasil > 0) {
            this.pelayananPsikolog = await getPelayananByIdPsikolog(
              this.$store.state.session.id
            );
            Swal.fire({
              icon: "success",
              title: "Yeay...",
              html: `<span class="text-primary">Pelayanan</span> berhasil diapprove <hr> <small>Silahkan menunggu Konfirmasi dari Klien</small>!`,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              html: `Gagal approve <span class="text-primary">Pelayanan</span> <hr> <small>Silahkan coba beberapa saat lagi!</small>`,
            });
          }
          this.loading = false;
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `Approval <span class="text-primary">Pelayanan</span> dibatalkan!`,
          });
        }
      });
    },
  },
  computed: {
    approve() {
      return this.pelayananPsikolog.filter(
        (pelayanan) => pelayanan.status === "approve"
      );
    },
    statusATPA() {
      return this.pelayananPsikolog.filter(
        (pelayanan) => pelayanan.status === "request_atpa"
      );
    },
    done() {
      return this.pelayananPsikolog.filter(
        (pelayanan) =>
          pelayanan.status === "done" || pelayanan.status === "request_cbp"
      );
    },
    waiting() {
      return this.pelayananPsikolog.filter(
        (pelayanan) =>
          pelayanan.status !== "request_atpa" &&
          pelayanan.status !== "approve" &&
          pelayanan.status !== "done" &&
          pelayanan.status !== "request_cbp"
      );
    },
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
