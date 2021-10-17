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
        Master Data <span class="text-primary">Admin</span>
      </h2>
      <div class="d-flex justify-content-between align-items-center">
        <button
          class="btn btn-primary text-h3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Tambah
        </button>
        <button class="btn btn-primary mb-3 text-h3" @click="onToggle">
          Edit
        </button>
      </div>

      <div class="row mt-3 ">
        <div class="col-md-3 px-4 pb-4" v-for="admin in admin" :key="admin.id">
          <TableUser
            :user="admin"
            :toggle="toggle"
            @on-toggle-status="changeStatusUser"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-h2" id="exampleModalLabel">
            Tambah User <span class="text-primary">Admin</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="modal-body">
            <div class="row text-h3">
              <div class="col-md-6 mb-3">
                <label for="nama" class="form-label">Nama</label>
                <input
                  type="text"
                  class="form-control text-h3"
                  id="nama"
                  placeholder="Masukkan nama anda"
                  v-model="newAdmin.nama"
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="inisial_nama" class="form-label"
                  >Inisial Nama</label
                >
                <input
                  type="text"
                  class="form-control text-h3"
                  id="inisial_nama"
                  placeholder="Masukkan inisial nama anda"
                  v-model="newAdmin.inisial_nama"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="no_karyawan" class="form-label">No. Karyawan</label>
                <input
                  type="text"
                  class="form-control text-h3"
                  id="no_karyawan"
                  placeholder="Masukkan no karyawan anda"
                  v-model="newAdmin.no_karyawan"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="jenis_kelamin" class="form-label"
                  >Jenis Kelamin</label
                >
                <select
                  class="form-select text-h3"
                  id="jenis_kelamin"
                  aria-label="Default select example"
                  v-model="newAdmin.jenis_kelamin"
                >
                  <option :value="null" selected
                    >Pilih jenis kelamin anda</option
                  >
                  <option value="l">Laki-Laki</option>
                  <option value="p">Perempuan</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="no_hp" class="form-label">No Handphone</label>
                <div class="input-group">
                  <span class="input-group-text text-h3"
                    ><img
                      src="@/assets/indonesia-flag.png"
                      height="10"
                      alt="indonesian flags logo"
                      class="me-2"
                    />
                    +62</span
                  >
                  <input
                    type="text"
                    class="form-control text-h3"
                    id="no_hp"
                    placeholder="Masukkan no handphone anda"
                    v-model="newAdmin.no_hp"
                  />
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control text-h3"
                  id="username"
                  placeholder="Masukkan username anda"
                  v-model="newAdmin.username"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="text"
                  class="form-control text-h3"
                  id="email"
                  placeholder="Masukkan email anda"
                  v-model="newAdmin.email"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control text-h3"
                  id="password"
                  placeholder="Masukkan password anda"
                  v-model="newAdmin.password"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="konfirmasi_password" class="form-label"
                  >Konfirmasi Password</label
                >
                <input
                  type="password"
                  class="form-control text-h3"
                  id="konfirmasi_password"
                  placeholder="Masukkan lagi password anda"
                  v-model="newAdmin.konfirmasi_password"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary text-h3"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-primary text-h3" type="submit">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

import Loading from "@/components/Loading";
import TableUser from "@/components/TableUser";

import {
  getUserAdmin,
  updateNewStatus,
  addNewAdmin,
} from "@/services/apis/user";

export default {
  name: "MasterPsikolog",
  components: {
    Loading,
    TableUser,
  },
  data() {
    return {
      loading: false,
      admin: null,
      toggle: false,
      newAdmin: {
        nama: null,
        inisial_nama: null,
        no_karyawan: null,
        jenis_kelamin: null,
        no_hp: null,
        username: null,
        password: null,
        email: null,
        konfirmasi_password: null,
        loading: false,
      },
    };
  },
  methods: {
    onToggle() {
      this.toggle = !this.toggle;
    },
    async onToggleStatus() {
      Swal.fire({
        title: "Apakah kamu yakin?",
        text: "Kamu akan mengubah status user ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#8e64f3",
        cancelButtonColor: "#d33",
        confirmButtonText: "Saya yakin!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const hasil = await updateNewStatus({
            status: !this.user.status,
            id: this.user.id,
          });
          if (hasil > 0) {
            Swal.fire({
              icon: "success",
              title: "Yeay...",
              html: `<span class="text-primary">Status</span> User berhasil diubah!`,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              html: `<span class="text-primary">Status/span> User gagal diubah!`,
            });
          }
          this.toggle = false;
        }
      });
    },
    async onSubmit() {
      // ? Validasi jika field kosong
      this.loading = true;
      const myModal = document.querySelector("[data-bs-dismiss]");
      if (
        !this.newAdmin.nama ||
        !this.newAdmin.inisial_nama ||
        !this.newAdmin.no_karyawan ||
        !this.newAdmin.jenis_kelamin ||
        !this.newAdmin.no_hp ||
        !this.newAdmin.username ||
        !this.newAdmin.email ||
        !this.newAdmin.password ||
        !this.newAdmin.konfirmasi_password
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus mengisi semua field!",
        });
        this.loading = false;
        return;
      }

      // todo validasi no_hp, email dan username (unique)

      // ? validasi konfirmasi password dengan password
      if (this.newAdmin.password !== this.newAdmin.konfirmasi_password) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `Kombinasi <span class="text-primary">Password & Konfirmasi Password</span> yang kamu masukkan tidak cocok! <hr> <small>Silahkan masukkan kembali <span class="text-primary">Password & Konfirmasi Password</span> kamu</small>`,
        });
        this.newAdmin.konfirmasi_password = null;
        this.loading = false;
        return;
      }

      myModal.click();

      const result = await addNewAdmin(this.newAdmin);
      this.newAdmin = {
        nama: null,
        inisial_nama: null,
        no_karyawan: null,
        jenis_kelamin: null,
        no_hp: null,
        username: null,
        password: null,
        email: null,
        konfirmasi_password: null,
        loading: false,
      };
      if (result > 0) {
        Swal.fire({
          icon: "success",
          title: "Yeay...",
          html: `Berhasil menambahkan User <span class="text-primary>Admin</span> baru!`,
        });

        this.admin = await getUserAdmin();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `Gagal menambahkan User <span class="text-primary">Admin</span> baru! <hr> <small>Silahkan coba beberapa saat lagi!</small>`,
        });
      }
      this.loading = false;
    },
    async changeStatusUser(payload) {
      this.loading = true;
      Swal.fire({
        title: "Apakah kamu yakin?",
        text: "Kamu akan mengubah status user ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#8e64f3",
        cancelButtonColor: "#d33",
        confirmButtonText: "Saya yakin!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const hasil = await updateNewStatus({
            status: !payload.status,
            id: payload.id,
          });
          if (hasil > 0) {
            this.admin = await getUserAdmin();
            Swal.fire({
              icon: "success",
              title: "Yeay...",
              html: `<span class="text-primary">Status</span> User berhasil diubah!`,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              html: `<span class="text-primary">Status/span> User gagal diubah!`,
            });
          }
          this.toggle = false;
          this.loading = false;
        } else {
          Swal.fire({
            icon: "info",
            title: "Info...",
            html: `Mengubah <span class="text-primary">Status</span> User dibatalkan!`,
          });
          this.toggle = false;
          this.loading = false;
        }
      });
    },
  },
  async created() {
    this.loading = true;
    this.admin = await getUserAdmin();
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

  .input-group-text {
    padding: 0.3rem 0.5rem;
  }
}
</style>
