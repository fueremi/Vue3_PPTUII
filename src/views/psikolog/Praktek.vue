<template>
  <Loading v-if="loading" />
  <div class="praktek-psikolog">
    <div class="container mt-3">
      <h1 class="text-h1 mb-5">
        Selamat datang, Psikolog
        <span class="text-primary text-capitalize text-decoration-underline">{{
          this.$store.state.session.nama
        }}</span>
      </h1>

      <h2 class="text-h2 mb-3">
        <span class="text-primary">Jadwal Praktek</span> Anda
      </h2>
      <div class="d-flex justify-content-between align-items-center">
        <button
          class="btn btn-primary mb-3 text-h3"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Tambah Jadwal Praktek
        </button>
        <button class="btn btn-primary mb-3 text-h3" @click="onToggle">
          Edit
        </button>
      </div>
      <div class="jadwal-psikolog row">
        <div
          class="col-md-3 mb-4"
          v-for="jadwalPsikolog in jadwalPsikolog"
          :key="jadwalPsikolog.id"
        >
          <JadwalCard :jadwal="jadwalPsikolog" :toggle="toggle" />
        </div>
      </div>
    </div>
  </div>

  <!-- ? Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form @submit.prevent="onSubmit()">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="text-h2 modal-title" id="staticBackdropLabel">
              Tambah Jadwal Praktek
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label text-h3"
                >Hari</label
              >
              <select
                class="form-select text-h3 text-capitalize"
                aria-label="Default select example"
                v-model="hariSelected"
              >
                <option :value="null" selected>Pilih Hari</option>
                <option v-for="hari in hari" :key="hari">{{ hari }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="jam_mulai" class="form-label text-h3"
                >Jam Mulai</label
              >
              <Datepicker
                id="jam_mulai"
                class="text-h3"
                v-model="jam_mulai"
                timePicker
                minutesIncrement="5"
                placeholder="Pilih Jam Mulai Praktek"
              />
            </div>
            <div class="mb-3">
              <label for="jam_selesai" class="form-label text-h3"
                >Jam Selesai</label
              >
              <Datepicker
                id="jam_selesai"
                class="text-h3"
                v-model="jam_selesai"
                timePicker
                minutesIncrement="5"
                placeholder="Pilih Jam Selesai Praktek"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary text-h3"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <input type="submit" class="text-h3 btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  getJadwalPsikologById,
  addNewJadwalPraktek,
} from "@/services/apis/psikolog";

import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import Swal from "sweetalert2";

import JadwalCard from "@/components/JadwalCard";
import Loading from "@/components/Loading";

export default {
  name: "HomePsikolog",
  components: {
    JadwalCard,
    Loading,
    Datepicker,
  },
  data() {
    return {
      jadwalPsikolog: [],
      loading: false,
      toggle: false,
      hari: ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"],
      jam_mulai: {
        hours: 6,
        minutes: 0,
      },
      jam_selesai: {
        hours: 9,
        minutes: 0,
      },
      hariSelected: null,
    };
  },
  methods: {
    onToggle() {
      this.toggle = !this.toggle;
    },
    async onSubmit() {
      // ? Validasi jam mulai dan jam selesai
      if (this.hariSelected === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hari harus dipilih!",
        });
        return;
      }

      if (
        this.jam_mulai.hours * 60 + this.jam_mulai.minutes >
        this.jam_selesai.hours * 60 + this.jam_selesai.minutes
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Jam Mulai harus lebih kecil dari Jam Selesai",
        });
        this.jam_mulai = {
          hours: 6,
          minutes: 0,
        };
        this.jam_selesai = {
          hours: 9,
          minutes: 0,
        };
        return;
      }

      const newJadwalPraktek = {
        id_psikolog: this.$store.state.session.id,
        hari: this.hariSelected,
        jam_mulai: this.formattedTime(this.jam_mulai),
        jam_selesai: this.formattedTime(this.jam_selesai),
      };
      this.loading = true;
      const success = await addNewJadwalPraktek(newJadwalPraktek);

      if (success.affected_rows > 0) {
        Swal.fire({
          icon: "success",
          title: "Yeay...",
          html: `<span class="text-primary">Jadwal Praktek</span> berhasil ditambahkan`,
        });
        this.jadwalPsikolog = await getJadwalPsikologById(
          this.$store.state.session.id
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `<span class="text-primary">Jadwal Praktek</span> gagal di tambahkan. <small>Silahkan coba beberapa saat lagi!</small>`,
        });
      }

      this.loading = false;
    },
    formattedTime(payload) {
      if (payload.hours < 10) {
        if (payload.minutes < 10) {
          return `0${payload.hours}:${payload.minutes}0`;
        } else {
          return `0${payload.hours}:${payload.minutes}`;
        }
      } else {
        if (payload.minutes < 10) {
          return `${payload.hours}:${payload.minutes}0`;
        } else {
          return `${payload.hours}:${payload.minutes}`;
        }
      }
    },
  },
  async created() {
    this.loading = true;
    this.jadwalPsikolog = await getJadwalPsikologById(
      this.$store.state.session.id
    );
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.praktek-psikolog {
  min-height: 669.6px;
  width: 100%;
  background: url("https://pptuii.id/wp-content/uploads/2020/10/psychiatrist_13.png")
    no-repeat center center/cover;
  padding: 16px;

  .btn {
    box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.7);
  }
}
.dp__input_icon_pad {
  padding: 5px !important;
}
</style>
