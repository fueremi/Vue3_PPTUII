<template>
  <Loading v-if="loading" />
  <div class="upload-hasil-admin">
    <div class="container mt-3">
      <h1 class="text-h1">
        Selamat datang, Admin
        <span class="text-primary text-capitalize text-decoration-underline">{{
          this.$store.state.session.nama
        }}</span>
      </h1>
      <div class="mt-4" v-if="pelayanan">
        <h2 class="text-h2">
          Atur Jadwal Pelayanan Klien
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
            </div>
          </div>
          <div class="col-md-6">
            <h3 class="text-h3 mt-0 ">Upload Hasil Pelayanan</h3>

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
              <p class="my-3 text-h3">Drag dan Drop file hasil pelayanan</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <form @submit.prevent="onSubmit()">
        <input
          :disabled="uploadDisabled"
          type="submit"
          class="btn btn-primary text-h3 mt-3"
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

import { getPelayananById, uploadDokumen } from "@/services/apis/pelayanan";

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
        title: "Preview Dokumen Pemeriksaan",
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
        html: `<p>Apakah <b>Dokumen</b> yang Akan di-Upload sudah benar ?</p>
          `,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.loading = true;
          const result = await uploadDokumen({
            id: this.$route.params.id,
            hasil: this.dokumen,
          });
          if (result > 0) {
            Swal.fire({
              icon: "success",
              title: "Yeay...",
              html: `<span class="text-primary">Hasil</span> pelayanan berhasil diupload`,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              html: `<span class="text-primary">Hasil</span> pelayanan gagal diupload!. <hr> <small>Silahkan coba beberapa saat lagi!</small>`,
            });
          }
          this.loading = false;
          this.$router.push({ name: "HomePsikolog" });
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
.upload-hasil-admin {
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
