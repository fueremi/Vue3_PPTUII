<template>
  <div
    class="card-wrapper row justiy-content-center align-items-center h-100"
    :class="[!user.status ? 'bg-primary-2' : '']"
  >
    <span
      ><i
        v-if="toggle"
        :class="[toggle ? 'pulsate-fwd' : '']"
        class="fas fa-ban text-primary"
        @click="$emit('on-toggle-status', { id: user.id, status: user.status })"
      ></i
    ></span>
    <div class="col-md-4 w-auto">
      <span class="profile text-uppercase">
        {{ user.initial }}
      </span>
    </div>
    <div class="col md-8 align-items-center">
      <p class="text-h2 m-0 text-capitalize lh-sm">{{ user.nama }}</p>
      <p v-if="user.jenis_kelamin" class="text-h3 m-0 lh-sm">
        {{ user.jenis_kelamin === "l" ? "Laki-Laki" : "" }}
        {{ user.jenis_kelamin === "p" ? "Perempuan" : "" }}
        {{ user.jenis_kelamin === "a" ? "Associate" : "" }}
      </p>
      <p class="text-h3 m-0 lh-1">{{ user.email }}</p>
    </div>
    <button
      class="mt-2 btn text-primary btn-sm text-h3"
      @click="onGantiPassword"
      v-if="user.status"
    >
      Ganti Password
    </button>
    <div class="mt-2 btn text-primary btn-sm text-h3" v-else>
      User Tidak Aktif
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

import { updateNewPassword } from "@/services/apis/user";

export default {
  name: "TableUser",
  props: ["user", "toggle"],
  methods: {
    async onGantiPassword() {
      const { value: formValues } = await Swal.fire({
        title: "Ganti Password",
        html: `
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input class="form-control" id="password" type="password">
          </div>
          <div class="mb-3">
            <label for="konfirmasi-password" class="form-label">Konfirmasi Password</label>
            <input class="form-control" id="konfirmasi-password" type="password">
          </div>
          `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("password").value,
            document.getElementById("konfirmasi-password").value,
          ];
        },
      });
      if (formValues) {
        if (formValues[0] !== formValues[1]) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `<span class="text-primary">Konfirmasi Password</span> tidak disesuai!`,
          });
          return;
        }
        const hasil = await updateNewPassword({
          id: this.user.id,
          password: formValues[0],
        });

        if (hasil > 0) {
          Swal.fire({
            icon: "success",
            title: "Yeay...",
            html: `<span class="text-primary">Password</span> Berhasil diganti!`,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  padding: 10px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;

  i {
    position: absolute;
    top: 5px;
    right: 5px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
