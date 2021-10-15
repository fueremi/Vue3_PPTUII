<template>
  <div
    class="jadwal-container d-flex flex-column justify-content-center align-items-center"
    v-if="!isPasien"
  >
    <h2 class="text-h2 text-capitalize m-0">{{ jadwal.hari }}</h2>
    <p class="text-h3 text-primary m-0">
      Jam:
      <span class="fw-bold"
        >{{ jadwal.jam_mulai }} -{{ jadwal.jam_selesai }}</span
      >
    </p>
    <i
      v-show="toggle"
      @click="$emit('onClickDelete', jadwal.id)"
      class="fas fa-trash"
    ></i>
  </div>
  <div class="jadwal-container row align-items-center" v-else>
    <div class="col-md-4">
      <span class="profile text-uppercase">
        {{ jadwal.user.initial }}
      </span>
    </div>
    <div class="col-md-8">
      <h2 class="text-h2 text-capitalize m-0">{{ jadwal.hari }}</h2>
      <p class="text-h3 text-primary m-0">
        Jam:
        <span class="fw-bold"
          >{{ jadwal.jam_mulai }} -{{ jadwal.jam_selesai }}</span
        >
      </p>
    </div>
    <button
      class="btn btn-sm btn-primary w-auto mt-3 text-h3 mx-auto"
      @click="$emit('onClick', jadwal.id)"
    >
      Pilih
    </button>
  </div>
</template>

<script>
export default {
  name: "JadwalCard",
  props: ["jadwal", "toggle", "isPasien"],
};
</script>

<style lang="scss" scoped>
.jadwal-container {
  padding: 20px;
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
    right: 5px;
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
