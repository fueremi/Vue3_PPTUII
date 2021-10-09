<template>
  <Navbar />
  <div class="home d-flex justify-content-center align-items-center">
    <div class="login-container">
      <form @submit.prevent="onSubmit">
        <h2 class="text-center mb-3">Login</h2>
        <div class="mb-3">
          <label for="email" class="form-label">Username/Email</label>
          <input
            type="email"
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
          <router-link :to="{ name: 'Daftar' }">Register disini!</router-link>
        </small>
        <input type="submit" class="btn btn-primary" />
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "Home",
  components: {
    Navbar,
  },
  data() {
    return {
      email: "",
      password: "",
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
