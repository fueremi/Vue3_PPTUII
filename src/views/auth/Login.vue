<template>
  <Loading v-if="loading" />
  <div class="home d-flex justify-content-center align-items-center">
    <div class="login-container">
      <form @submit.prevent="onSubmit">
        <h2 class="text-center mb-3">Login</h2>
        <div class="mb-3">
          <label for="email" class="form-label">Username/Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            placeholder="Masukkan email anda"
            v-model="email"
          />
        </div>
        <div class="mb-2">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Masukkan password anda"
            v-model="password"
          />
        </div>
        <small class="mb-3 d-block"
          >Belum memiliki akun?
          <router-link class="text-primary" :to="{ name: 'Daftar' }"
            >Register disini!</router-link
          >
        </small>
        <input type="submit" class="btn btn-primary" />
      </form>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import Swal from "sweetalert2";
import {
  fetchUserOrEmail,
  authUsertoPassword,
  setSession,
} from "@/services/apis/auth";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Home",
  components: {
    Loading,
  },
  data() {
    return {
      email: null,
      password: null,
      loading: false,
    };
  },
  methods: {
    async onSubmit() {
      // ? Validasi email/username dan password sudah terisi
      if (!this.email) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html:
            "<span class='text-primary'>Username/Email</span> kosong! <hr> <small>Silahkan masukkan <span class='text-primary'>Username/Email</span> anda!</small>",
        });
        return;
      } else if (!this.password) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html:
            "<span class='text-primary'>Password</span> kosong! <hr> <small>Silahkan masukkan <span class='text-primary'>Password</span> anda!</small>",
        });
        return;
      }
      this.loading = true;
      const user = await fetchUserOrEmail(this.email);

      // ? Validasi jika email/username belum terdaftar
      if (user.length !== 1) {
        this.loading = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `<span class="text-primary">Username/Email</span> tidak ditemukan. <hr> <small>Jika anda belum memiliki akun, silahkan Daftar akun!</small>`,
        });
        this.username = "";
        this.password = "";
        return;
      }

      const userInfo = await authUsertoPassword({
        id: user[0].id,
        password: this.password,
      });

      // ? Validasi jika email/username sesuai dengan password
      if (userInfo.length !== 1) {
        this.loading = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `<span class="text-primary">Password</span> salah. <br>Pastikan password yang di-input benar! <hr> <small>Jika anda lupa password anda, silahkan hubungi <span class="text-primary">Admin PPTUII</span></small>`,
          footer: ``,
        });
        this.password = "";
        return;
      }

      const session_info = {
        id: user[0].id,
        session: uuidv4(),
      };

      await setSession({ id: user[0].id, sessionId: session_info.session });

      // ? Assign informasi user dan session ke local storage
      await this.$store.dispatch("setSession", userInfo[0]);
      localStorage.setItem("session", JSON.stringify(session_info));

      this.username = "";
      this.password = "";

      Swal.fire({
        icon: "success",
        title: "Yeay",
        html: `Berhasil login. <hr><small>Mengarahkan anda ke halaman <span class="text-primary">Home</span></small>`,
      });

      this.loading = false;
      if (this.$store.state.session.role === "klien") {
        this.$router.push({ name: "HomeKlien" });
      } else if (this.$store.state.session.role === "psikolog") {
        this.$router.push({ name: "HomePsikolog" });
      } else if (this.$store.state.session.role === "administrator") {
        this.$router.push({ name: "HomeAdmin" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 669.6px;
  width: 100%;
  background: url("https://pptuii.id/wp-content/uploads/2020/11/abstract.jpg")
    no-repeat center center/cover;
  padding: 50px;

  .login-container {
    padding: 32px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    min-width: 360px;
  }
}
</style>
