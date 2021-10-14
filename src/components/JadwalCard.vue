<template>
  <div
    class="jadwal-container d-flex flex-column justify-content-center align-items-center"
  >
    <h2 class="text-h2 text-capitalize m-0">{{ jadwal.hari }}</h2>
    <p class="text-h3 text-primary m-0">
      Jam:
      <span class="fw-bold"
        >{{ jadwal.jam_mulai }} -{{ jadwal.jam_selesai }}</span
      >
    </p>
    <i v-show="toggle" class="fas fa-edit"></i>
    <i v-show="toggle" class="fas fa-trash"></i>
  </div>
</template>

<script>
export default {
  name: "JadwalCard",
  props: ["jadwal", "toggle"],
};
</script>

<style lang="scss" scoped>
.jadwal-container {
  padding: 32px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.45);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  position: relative;

  i {
    color: #8e64f3;
    top: 5px;
    position: absolute;
    height: 5px;
    &.fa-edit {
      right: 25px;
    }
    &.fa-trash {
      right: 5px;
    }
  }
}
</style>
