<template>
  <Navbar />
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
            />
          </div>

          <div class="col-md-6 mb-3">
            <label for="nama" class="form-label">Inisial Nama</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              placeholder="Masukkan nama anda"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="email" class="form-label">Jenis Kelamin</label>
            <select class="form-select" aria-label="Default select example">
              <option value="" selected>Pilih jenis kelamin anda</option>
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
                placeholder="Masukkan no handphone anda"
              />
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="nama" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="nama"
              placeholder="Masukkan username anda"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              placeholder="Masukkan email anda"
            />
          </div>
          <div class="col-md-6 mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Masukkan password anda"
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
            />
          </div>
        </div>
        <small class="mb-3 d-block"
          >Sudah memiliki akun?
          <router-link :to="{ name: 'Home' }">register disini!</router-link>
        </small>
        <button type="button" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "Register",
  components: {
    Navbar,
  },
  data() {
    return {
      no_hp: null,
    };
  },
  methods: {
    onSubmit() {
      console.log("Submitted!");
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
