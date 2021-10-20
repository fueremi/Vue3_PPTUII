<template>
  <Loading v-if="loading" />
  <div class="detail-pelayan-klien">
    <div class="container mt-3">
      <h1 class="text-h1">
        Selamat datang, Admin
        <span class="text-primary text-capitalize text-decoration-underline">{{
          this.$store.state.session.nama
        }}</span>
      </h1>
      <div class="mt-4" v-if="pelayanan">
        <h2 class="text-h2">
          Detail Pelayanan Klien
          <span class="text-primary text-capitalize">{{
            pelayanan[0].user.nama
          }}</span>
        </h2>
        <div class="row mt-4">
          <div class="col-md-6">
            <h3 class="text-h3 mt-0 ">Tentang Klien</h3>
            <div class="mt-3">
              <ul class="list-group list-group-horizontal text-h3">
                <li class="list-group-item fw-bold title-group">
                  Jenis Kelamin
                </li>
                <li class="list-group-item content-group">
                  {{
                    pelayanan[0].user.jenis_kelamin === "l"
                      ? "Laki-Laki"
                      : "Perempuan"
                  }}
                </li>
              </ul>
              <ul class="list-group list-group-horizontal text-h3">
                <li class="list-group-item fw-bold title-group">
                  Email
                </li>
                <li class="list-group-item content-group">
                  {{ pelayanan[0].user.email }}
                </li>
              </ul>
              <ul class="list-group list-group-horizontal text-h3">
                <li class="list-group-item fw-bold title-group">
                  No HP
                </li>
                <li class="list-group-item content-group text-capitalize">
                  {{ pelayanan[0].user.no_hp }}
                </li>
              </ul>
            </div>

            <h3 class="text-h3 mt-4 ">Tentang Pelayanan</h3>
            <div class="mt-3">
              <ul
                class="list-group list-group-horizontal text-h3"
                v-if="pelayanan[0].status === 'done'"
              >
                <li class="list-group-item fw-bold title-group">Status</li>
                <li class="list-group-item content-group">
                  Selesai
                </li>
              </ul>
              <ul
                class="list-group list-group-horizontal text-h3"
                v-if="pelayanan[0].status === 'request_cbp'"
              >
                <li class="list-group-item fw-bold title-group">Status</li>
                <li class="list-group-item content-group">
                  Menunggu Pengecekan Bukti Pembayaran oleh Admin
                </li>
              </ul>
              <ul
                class="list-group list-group-horizontal text-h3"
                v-else-if="pelayanan[0].status === 'request_bp'"
              >
                <li class="list-group-item fw-bold title-group">Status</li>
                <li class="list-group-item content-group">
                  Menunggu Upload Bukti Pembayaran
                </li>
              </ul>
              <ul class="list-group list-group-horizontal text-h3">
                <li class="list-group-item fw-bold title-group">Layanan</li>
                <li class="list-group-item content-group">
                  {{ pelayanan[0].layanan.kategori }} -
                  {{ pelayanan[0].layanan.nama }}
                </li>
              </ul>
              <ul class="list-group list-group-horizontal text-h3">
                <li class="list-group-item fw-bold title-group">
                  Psikolog/Associate
                </li>
                <li class="list-group-item content-group">
                  {{ pelayanan[0].userByIdPsikologi.nama }}
                </li>
              </ul>
              <ul class="list-group list-group-horizontal text-h3">
                <li class="list-group-item fw-bold title-group">
                  Jadwal Pelayanan
                </li>
                <li class="list-group-item content-group text-capitalize">
                  {{ formatTanggal(pelayanan[0].tanggal) }}, Jam :
                  {{ pelayanan[0].jam }}
                </li>
              </ul>
              <ul
                class="list-group list-group-horizontal text-h3"
                v-if="pelayanan[0].bukti_pembayaran"
              >
                <li class="list-group-item fw-bold title-group">
                  Bukti Pembayaran
                </li>
                <li class="list-group-item content-group text-capitalize">
                  <button
                    class="btn btn-primary text-h3 btn-sm"
                    @click="downloadBP"
                  >
                    Download
                  </button>
                </li>
              </ul>
              <ul
                class="list-group list-group-horizontal text-h3"
                v-if="
                  pelayanan[0].status === 'done' &&
                    this.$store.state.session.role !== 'admin'
                "
              >
                <li class="list-group-item fw-bold title-group">
                  Hasil Pelayanan
                </li>
                <li class="list-group-item content-group text-capitalize">
                  <button
                    class="btn btn-primary text-h3 btn-sm"
                    @click="downloadHasil"
                  >
                    Download
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6" v-if="!pelayanan[0].bukti_pembayaran">
            <h3 class="text-h3 mt-0 ">Upload Bukti Pembayaran</h3>
            <div v-if="files !== null" class="mt-3">
              <div>
                <ul class="list-group w-50 text-h3">
                  <li class="list-group-item" aria-current="true">
                    {{ files[0].name }}
                  </li>
                  <li class="list-group-item">
                    {{ (files[0].size / 1000).toFixed(2) }} kb
                  </li>
                  <li class="list-group-item">
                    <button
                      @click.prevent="onPreview"
                      class="btn btn-primary text-h3"
                    >
                      Preview
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div
              v-cloak
              @drop.prevent="addFile"
              @dragover.prevent
              v-else
              class="mt-3 p-5 border d-flex flex-column justify-content-center align-items-center bg-white"
            >
              <i class="fas fa-upload fa-3x text-muted"></i>
              <p class="my-3 text-h3">Drag dan Drop Bukti Pembayaran</p>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <form @submit.prevent="onSubmit()" v-if="dokumen">
        <input type="submit" class="btn btn-primary btn-sm text-h3 mt-3" />
      </form>
      <form @submit.prevent="onKonfirmasiPembayaran()" v-else>
        <input
          type="submit"
          class="btn btn-primary btn-sm text-h3 mt-3"
          value="Konfirmasi Pembayaran"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";
import moment from "moment";
import Swal from "sweetalert2";

import Loading from "@/components/Loading";

import {
  getPelayananById,
  uploadBuktiPembayaran,
  setStatusDone,
} from "@/services/apis/pelayanan";

export default {
  name: "UploadHasil",
  components: {
    Loading,
    Calendar,
    DatePicker,
  },
  data() {
    return {
      loading: false,
      pelayanan: null,
      approve: false,
      files: null,
      dokumen: null,
    };
  },
  computed: {
    uploadDisabled() {
      return this.files === null;
    },
  },
  methods: {
    formatTanggal(tanggal) {
      return moment(tanggal)
        .locale("id")
        .format("dddd ,DD MMMM YYYY");
    },
    addFile(e) {
      if (e.dataTransfer.files[0].size >= 1000000) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          html: "Maksimal ukuran dokumen yang diupload adalah <b>1 MB</b>",
        });
        return;
      }
      this.createBase64(e.dataTransfer.files[0]);
      this.files = e.dataTransfer.files;
    },
    createBase64(payload) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.dokumen = e.target.result;
      };
      reader.readAsDataURL(payload);
    },
    onPreview() {
      Swal.fire({
        title: "Preview Bukti Pembayaran",
        heightAuto: true,
        width: "90vw",
        html: `<iframe height="100%" width="100%" src="${this.dokumen}"></iframe>`,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: "Thumbs up, great!",
      });
    },
    onSubmit() {
      Swal.fire({
        title: "Dokumen",
        icon: "info",
        width: "50vw",
        html: `Apakah <span class="text-primary">Bukti Pembayaran</span> benar ?
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.loading = true;
          const result = await uploadBuktiPembayaran({
            id: this.$route.params.id,
            hasil: this.dokumen,
          });
          if (result > 0) {
            Swal.fire({
              icon: "success",
              title: "Yeay...",
              html: `<span class="text-primary">Bukti Pembayaran</span> berhasil diupload`,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              html: `<span class="text-primary">Bukti Pembayaran</span> pelayanan gagal diupload!. <hr> <small>Silahkan coba beberapa saat lagi!</small>`,
            });
          }
          this.dokumen = null;
          this.pelayanan = await getPelayananById(this.$route.params.id);
          this.loading = false;
        } else {
          Swal.fire("Dibatalkan", "", "error");
        }
      });
    },
    downloadHasil() {
      var a = document.createElement("a"); //Create <a>
      a.href = this.pelayanan[0].hasil; //Image Base64 Goes here
      a.download = `hasil_pelayanan-${this.pelayanan[0].user.nama}.pdf`; //File name Here
      a.click(); //Downloaded file
    },
    downloadBP() {
      var a = document.createElement("a"); //Create <a>
      a.href = this.pelayanan[0].bukti_pembayaran; //Image Base64 Goes here
      a.download = "bukti_pembayaran.pdf"; //File name Here
      a.click(); //Downloaded file
    },
    onKonfirmasiPembayaran() {
      Swal.fire({
        title: "Dokumen",
        icon: "info",
        width: "50vw",
        html: `Apakah <span class="text-primary">Bukti Pembayaran</span> terkonfirmasi ? <hr> <small>Setelah dikonfirmasi, Pelayanan tidak dapat diubah!</small>
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.loading = true;
          const result = await setStatusDone(this.$route.params.id);
          if (result > 0) {
            Swal.fire({
              icon: "success",
              title: "Yeay...",
              html: `<span class="text-primary">Pembayaran</span> berhasil dikonfirmasi`,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              html: `<span class="text-primary">Pembayaran</span> gagal dikonfirmasi!. <hr> <small>Silahkan coba beberapa saat lagi!</small>`,
            });
          }
          this.loading = false;
          this.$router.push({ name: "HomeAdmin" });
        } else {
          Swal.fire("Dibatalkan", "", "error");
        }
      });
    },
  },
  async created() {
    this.loading = true;
    this.pelayanan = await getPelayananById(this.$route.params.id);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.detail-pelayan-klien {
  min-height: 669.6px;
  width: 100%;
  background: url("https://pptuii.id/wp-content/uploads/2020/10/psychiatrist_13.png")
    no-repeat center center/cover;
  padding: 16px;

  .title-group {
    min-width: 160px;
  }

  .content-group {
    width: 100%;
  }

  .form-check-input:checked {
    background-color: #8e64f3;
    border-color: #bdaaeb;
  }
}
.vc-highlights {
  background-color: #8e64f3 !important;
}
</style>
