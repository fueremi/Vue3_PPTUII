<template>
  <Loading v-if="loading" />
  <div class="atur-jadwal-admin">
    <div class="container mt-3">
      <h1 class="text-h1">
        Selamat datang, Admin
        <span class="text-primary text-capitalize text-decoration-underline">{{
          this.$store.state.session.nama
        }}</span>
      </h1>
      <div class="mt-4" v-if="pelayanan">
        <h2 class="text-h2">
          Atur Jadwal Pelayanan Klien
          <span class="text-primary text-capitalize">{{
            pelayanan[0].user.nama
          }}</span>
        </h2>
        <div class="row mt-4">
          <div class="col-md-6">
            <h3 class="text-h3 mt-0 ">Tentang Klien</h3>
            <div class="mt-3">
              <ul class="list-group list-group-horizontal text-h3">
                <li class="list-group-item fw-bold title-group">
                  Jenis Kelamin
                </li>
                <li class="list-group-item content-group">
                  {{
                    pelayanan[0].user.jenis_kelamin === "l"
                      ? "Laki-Laki"
                      : "Perempuan"
                  }}
                </li>
              </ul>
              <ul class="list-group list-group-horizontal text-h3">
                <li class="list-group-item fw-bold title-group">
                  Email
                </li>
                <li class="list-group-item content-group">
                  {{ pelayanan[0].user.email }}
                </li>
              </ul>
              <ul class="list-group list-group-horizontal text-h3">
                <li class="list-group-item fw-bold title-group">
                  No HP
                </li>
                <li class="list-group-item content-group text-capitalize">
                  {{ pelayanan[0].user.no_hp }}
                </li>
              </ul>
            </div>

            <h3 class="text-h3 mt-4 ">Tentang Pelayanan</h3>
            <div class="mt-3">
              <ul class="list-group list-group-horizontal text-h3">
                <li class="list-group-item fw-bold title-group">Layanan</li>
                <li class="list-group-item content-group">
                  {{ pelayanan[0].layanan.kategori }} -
                  {{ pelayanan[0].layanan.nama }}
                </li>
              </ul>
              <ul class="list-group list-group-horizontal text-h3">
                <li class="list-group-item fw-bold title-group">
                  Psikolog/Associate
                </li>
                <li class="list-group-item content-group">
                  {{ pelayanan[0].userByIdPsikologi.nama }}
                </li>
              </ul>
              <ul class="list-group list-group-horizontal text-h3">
                <li class="list-group-item fw-bold title-group">
                  Jadwal Praktek
                </li>
                <li class="list-group-item content-group text-capitalize">
                  {{ pelayanan[0].jadwal_praktek.hari }},
                  {{ pelayanan[0].jadwal_praktek.jam_mulai }} -
                  {{ pelayanan[0].jadwal_praktek.jam_selesai }}
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-6 px-5">
            <h3 class="text-h3">
              Silahkan pilih Tanggal untuk Pelayanan :
            </h3>
            <div class="row">
              <div class="col-md-6">
                <DatePicker
                  class="mt-1 text-h3"
                  color="purple"
                  v-model="date"
                  :disabled-dates="{ weekdays: hariPilihan }"
                  :min-date="Date.now()"
                  timezone=""
                />
              </div>
              <div class="col-md-6">
                <select
                  class="form-select text-h3 text-capitalize mt-1"
                  aria-label="Default select example"
                  v-model="timeSelected"
                >
                  <option :value="null" selected>Pilih Jam Pelayanan</option>
                  <option v-for="jam in jamTersedia" :key="jam" :value="jam"
                    >Jam: {{ jam }}</option
                  >
                </select>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="form-check" v-if="date && timeSelected">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            v-model="approve"
          />
          <label class="form-check-label text-h3" for="flexCheckDefault">
            Anda akan memilih tanggal
            <span class="text-primary text-decoration-underline">{{
              formatTanggal(date)
            }}</span
            >, Jam:
            <span class="text-primary text-decoration-underline">{{
              timeSelected
            }}</span>
            untuk pelayanan ini. Apakah anda yakin ?
          </label>
        </div>
        <button
          v-if="approve"
          class="btn btn-primary btn-sm text-h3 mt-3 text-capitalize"
          @click="submitToPA"
        >
          Kirim Ke {{ pelayanan[0].userByIdPsikologi.role }}
          {{ pelayanan[0].userByIdPsikologi.nama }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";
import moment from "moment";
import Swal from "sweetalert2";

import Loading from "@/components/Loading";

import { getPelayananById, adminToPA } from "@/services/apis/pelayanan";

export default {
  name: "AturJadwal",
  components: {
    Loading,
    Calendar,
    DatePicker,
  },
  data() {
    return {
      loading: false,
      pelayanan: null,
      date: null,
      timeSelected: null,
      approve: false,
    };
  },
  methods: {
    formatTanggal(tanggal) {
      return moment(tanggal)
        .locale("id")
        .format("dddd ,DD MMMM YYYY");
    },
    async submitToPA() {
      this.loading = true;
      const result = await adminToPA({
        id: this.$route.params.id,
        tanggal: moment(this.date).toISOString(),
        jam: this.timeSelected,
      });
      if (result > 0) {
        Swal.fire({
          icon: "success",
          title: "Yeay...",
          html: `Request <span class="text-primary">Pelayanan</span> berhasil dikirim ke Psikolog/Associate. <hr> <small>Silahkan menunggu balasan dari <span class="text-primary">Psikolog/Associate</span></small>`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `Request <span class="text-primary">Pelayanan</span> ke Psikolog/Associate gagal!. <hr> <small>Silahkan coba beberapa saat lagi!</small>`,
        });
      }
      this.loading = false;
      this.$router.push({ name: "HomeAdmin" });
    },
  },
  computed: {
    jamTersedia() {
      let temp = [];
      let dataTerkecil = +this.pelayanan[0].jadwal_praktek.jam_mulai.slice(
        0,
        2
      );
      let dataTerbesar = +this.pelayanan[0].jadwal_praktek.jam_selesai.slice(
        0,
        2
      );
      for (let i = dataTerkecil; i <= dataTerbesar; i++) {
        temp.push(i);
      }
      const res = temp.map(
        (tem) =>
          (tem = `${tem}:${this.pelayanan[0].jadwal_praktek.jam_mulai.slice(
            3,
            5
          )}`)
      );
      return res;
    },
    hariPilihan() {
      if (this.pelayanan[0].jadwal_praktek.hari === "senin") {
        return [1, 3, 4, 5, 6, 7];
      } else if (this.pelayanan[0].jadwal_praktek.hari === "selasa") {
        return [1, 2, 4, 5, 6, 7];
      } else if (this.pelayanan[0].jadwal_praktek.hari === "rabu") {
        return [1, 2, 3, 5, 6, 7];
      } else if (this.pelayanan[0].jadwal_praktek.hari === "kamis") {
        return [1, 2, 3, 4, 6, 7];
      } else if (this.pelayanan[0].jadwal_praktek.hari === "jumat") {
        return [1, 2, 3, 4, 5, 7];
      } else if (this.pelayanan[0].jadwal_praktek.hari === "sabtu") {
        return [1, 2, 3, 4, 5, 6];
      } else if (this.pelayanan[0].jadwal_praktek.hari === "minggu") {
        return [2, 3, 4, 5, 6, 7];
      }
    },
  },
  async created() {
    this.loading = true;
    this.pelayanan = await getPelayananById(this.$route.params.id);
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.atur-jadwal-admin {
  min-height: 669.6px;
  width: 100%;
  background: url("https://pptuii.id/wp-content/uploads/2020/10/psychiatrist_13.png")
    no-repeat center center/cover;
  padding: 16px;

  .title-group {
    min-width: 160px;
  }

  .content-group {
    width: 100%;
  }

  .form-check-input:checked {
    background-color: #8e64f3;
    border-color: #bdaaeb;
  }
}
.vc-highlights {
  background-color: #8e64f3 !important;
}
</style>
