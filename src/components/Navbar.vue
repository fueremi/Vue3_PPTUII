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
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
          <a class="nav-link" href="#">Layanan</a>
          <a class="nav-link" href="#">Kontak</a>
          <a href="#" class="nav-link">Login</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style lang="scss" scoped>
.navbar {
  .navbar-brand {
    font-size: 12px;
    font-weight: bold;
    line-height: 1.2;
  }

  .nav-link {
    font-size: 14px;
  }
}
</style>
