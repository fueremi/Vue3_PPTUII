<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">
        <div class="d-flex justify-content-center gap-2">
          <img
            src="@/assets/pptuii.png"
            alt="logo pptuii"
            width="30"
            height="30"
          />
          <div class="d-flex flex-column justify-content-center">
            <span>Pusat Psikologi Terapan</span>
            <span>Universitas Islam Indonesia</span>
          </div>
        </div>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarNavAltMarkup"
        v-if="this.$store.state.session"
      >
        <div
          class="navbar-nav me-auto"
          v-if="this.$store.state.session.role === 'klien'"
        >
          <router-link
            class="nav-link"
            aria-current="page"
            :to="{ name: 'HomeKlien' }"
            >Home</router-link
          >
          <router-link class="nav-link" to="/layanan">Layanan</router-link>
        </div>
        <div
          class="navbar-nav me-auto"
          v-if="this.$store.state.session.role === 'admin'"
        >
          <router-link
            class="nav-link"
            aria-current="page"
            :to="{ name: 'HomeAdmin' }"
            >Home</router-link
          >
          <router-link class="nav-link" :to="{ name: 'MasterAdmin' }"
            >Admin</router-link
          >
          <router-link class="nav-link" :to="{ name: 'MasterPsikologAdmin' }"
            >Psikolog/Associate</router-link
          >
          <router-link class="nav-link" :to="{ name: 'MasterKlien' }"
            >Klien</router-link
          >
        </div>
        <div
          class="navbar-nav me-auto"
          v-else-if="
            this.$store.state.session.role === 'psikolog' ||
              this.$store.state.session.role === 'associate'
          "
        >
          <router-link
            class="nav-link"
            aria-current="page"
            :to="{ name: 'HomePsikolog' }"
            >Home</router-link
          >
          <router-link
            class="nav-link"
            aria-current="page"
            :to="{ name: 'PraktekPsikolog' }"
            >Praktek</router-link
          >
          <!-- <router-link class="nav-link" to="/layanan">Layanan</router-link> -->
        </div>
        <div class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-capitalize d-flex align-items-center"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div
                class="d-flex justify-content-center align-items-center gap-2"
              >
                <span class="profile text-uppercase">
                  {{ this.$store.state.session.initial }}
                </span>
                {{ this.$store.state.session.nama }}
                <span class="text-primary"
                  >({{ this.$store.state.session.role }})</span
                >
              </div>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <button
                  class="text-start btn nav-link dropdown-item"
                  v-if="this.$store.state.session"
                  @click="onClickLogout"
                >
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Navbar",
  methods: {
    onClickLogout() {
      Swal.fire({
        title: "Anda akan logout!",
        icon: "info",
        html: `Apakah anda yakin akan <span class="text-primary">Logout</span> ? <hr> <small>Jika anda <span class="text-primary">Logout</span>, maka anda harus <span class="text-primary">Login</span> kembali!</small>`,
        showCancelButton: true,
        confirmButtonText: `Benar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$store.state.session = null;
          localStorage.removeItem("session");

          Swal.fire({
            icon: "success",
            title: "Yeay! Berhasil Logout",
            html: `Kamu akan dialihkan ke <span class="text-primary">Halaman Home</span>`,
          });
          this.$router.push({ name: "Login" });
          return;
        } else {
          Swal.fire({
            icon: "error",
            title: "Batal",
            html: `<span class='text-primary'>Logout</span> dibatalkan!`,
          });
          return;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  .navbar-brand {
    font-size: 12px;
    font-weight: bold;
    line-height: 1.2;
  }

  .router-link-exact-active {
    color: #8e64f3 !important;
    font-weight: bold;
  }

  .nav-link {
    font-size: 14px;
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
</style>
