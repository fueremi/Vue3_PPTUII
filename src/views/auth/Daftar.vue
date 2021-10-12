<template>
  <Loading v-if="loading" />
  <div class="register d-flex justify-content-center align-items-center">
    <div class="register-container">
      <form @submit.prevent="onSubmit">
        <h2 class="text-center mb-3">Daftar Akun</h2>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="nama" class="form-label">Nama</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              placeholder="Masukkan nama anda"
              v-model="nama"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label for="inisial_nama" class="form-label">Inisial Nama</label>
            <input
              type="text"
              class="form-control"
              id="inisial_nama"
              placeholder="Masukkan inisial nama anda"
              v-model="inisial_nama"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="jenis_kelamin" class="form-label">Jenis Kelamin</label>
            <select
              class="form-select"
              id="jenis_kelamin"
              aria-label="Default select example"
              v-model="jenis_kelamin"
            >
              <option :value="null" selected>Pilih jenis kelamin anda</option>
              <option value="l">Laki-Laki</option>
              <option value="p">Perempuan</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="no_hp" class="form-label">No Handphone</label>
            <div class="input-group">
              <span class="input-group-text"
                ><img
                  src="@/assets/indonesia-flag.png"
                  height="16"
                  alt="indonesian flags logo"
                  class="me-2"
                />
                +62</span
              >
              <input
                type="text"
                class="form-control"
                id="no_hp"
                placeholder="Masukkan no handphone anda"
                v-model="no_hp"
              />
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="Masukkan username anda"
              v-model="username"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              placeholder="Masukkan email anda"
              v-model="email"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Masukkan password anda"
              v-model="password"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="konfirmasi_password" class="form-label"
              >Konfirmasi Password</label
            >
            <input
              type="password"
              class="form-control"
              id="konfirmasi_password"
              placeholder="Masukkan lagi password anda"
              v-model="konfirmasi_password"
            />
          </div>
        </div>
        <small class="mb-3 d-block"
          >Sudah memiliki akun?
          <router-link class="text-primary" :to="{ name: 'Login' }"
            >Login disini!</router-link
          >
        </small>
        <input type="submit" class="btn btn-primary" />
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { registerUser } from "@/services/apis/auth";
import Loading from "@/components/Loading";

export default {
  name: "Register",
  data() {
    return {
      nama: null,
      inisial_nama: null,
      jenis_kelamin: null,
      no_hp: null,
      username: null,
      password: null,
      email: null,
      konfirmasi_password: null,
      loading: false,
    };
  },
  components: {
    Loading,
  },
  methods: {
    async onSubmit() {
      // ? Validasi jika field kosong
      this.loading = true;
      if (
        !this.nama ||
        !this.inisial_nama ||
        !this.jenis_kelamin ||
        !this.no_hp ||
        !this.username ||
        !this.email ||
        !this.password ||
        !this.konfirmasi_password
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
      if (this.password !== this.konfirmasi_password) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `Kombinasi <span class="text-primary">Password & Konfirmasi Password</span> yang kamu masukkan tidak cocok! <hr> <small>Silahkan masukkan kembali <span class="text-primary">Password & Konfirmasi Password</span> kamu</small>`,
        });
        this.konfirmasi_password = null;
        this.loading = false;
        return;
      }

      const newUser = {
        nama: this.nama,
        initial: this.inisial_nama,
        jenis_kelamin: this.jenis_kelamin,
        no_hp: "+62" + this.no_hp,
        username: this.username,
        email: this.email,
        password: this.password,
      };

      const addNewUser = await registerUser(newUser);
      if (addNewUser.affected_rows > 0) {
        Swal.fire({
          icon: "success",
          title: "Yeay...",
          html: `<span class="text-primary">Akun</span kamu berhasil dibuat! Silahkan untuk <span class="text-primary">Login</span><small>Mengarahkan kamu ke <span class="text-primary">Halaman Login</span></small>`,
        });
        this.loading = false;
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  min-height: 669.6px;
  width: 100%;
  background: url("https://pptuii.id/wp-content/uploads/2020/11/The-Role-of-Psychology-in-SEO-1520x800-1.png")
    no-repeat center center/cover;
  padding: 20px;

  .register-container {
    padding: 16px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);

    @media (min-width: 728px) {
      max-width: 726px;
    }
  }
}
</style>
