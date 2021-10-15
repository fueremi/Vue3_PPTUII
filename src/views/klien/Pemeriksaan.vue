<template>
  <Loading v-if="loading" />
  <div class="daftar-layanan-pasien-wrapper">
    <div class="container" v-if="layanan">
      <router-link
        class="back-button text-primary"
        :to="{ name: 'LayananKlien' }"
        >Kembali
      </router-link>
      <h1 class="my-4">
        Daftar Layanan
        <span class="text-primary text-decoration-underline">{{
          layanan.nama
        }}</span>
      </h1>
      <div class="row">
        <div class="col-md-4" v-if="psikologAssociate">
          <p class="text-h2">{{ layanan.deskripsi }}</p>
          <h5 class="text-h3 text-primary text-decoration-underline">
            Catatan:
          </h5>
          <div v-if="onlyPsikolog.length > 0">
            <h6 class="text-h3">Psikolog</h6>
            <div
              v-for="(user, index) in onlyPsikolog"
              :key="index"
              class="text-capitalize text-h3"
            >
              <span class="profile text-uppercase mb-2 me-2">
                {{ user.initial }}
              </span>
              {{ user.nama }}
            </div>
          </div>
          <div v-if="onlyAssociate.length > 0">
            <h6 class="text-h3">Associate</h6>
            <div
              v-for="(user, index) in onlyAssociate"
              :key="index"
              class="text-capitalize text-h3"
            >
              <span class="profile text-uppercase mb-2 me-2">
                {{ user.initial }}
              </span>
              {{ user.nama }}
            </div>
          </div>
          <div class="mt-3" v-if="pelayanan">
            <h2 class="text-h2 text-decoration-underline">
              Summary
            </h2>
            <p class="text-h3">
              Kamu akan mengambil layanan
              <span class="text-primary text-h3 text-decoration-underline">{{
                layanan.nama
              }}</span
              >, dengan {{ pelayanan.user.role }}
              <span
                class="text-primary text-capitalize text-decoration-underline"
              >
                {{ pelayanan.user.nama }}</span
              >
              pada Hari
              <span
                class="text-primary text-capitalize text-decoration-underline"
                >{{ pelayanan.hari }}</span
              >
              Jam
              <span
                class="text-primary text-capitalize text-decoration-underline"
                >{{ pelayanan.jam_mulai }}</span
              >
              -
              <span
                class="text-primary text-capitalize text-decoration-underline"
                >{{ pelayanan.jam_selesai }}</span
              >.
            </p>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                v-model="approve"
              />
              <label class="form-check-label text-h3" for="flexCheckDefault">
                Pilihan ini sudah saya cek dan sudah sesuai
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-8 px-4">
          <h2 class="text-h2">
            <span class="text-primary">Jadwal Praktek</span> yang Tersedia
          </h2>
          <div class="row">
            <div
              class="col-md-4 mb-4"
              v-for="jadwal in jadwal_praktek"
              :key="jadwal.id"
            >
              <JadwalCard
                :jadwal="jadwal"
                :isPasien="true"
                @onClick="onPilihJadwal"
              />
            </div>
          </div>
          <nav
            aria-label="Page navigation example"
            class="mt-3"
            v-if="dataLength"
          >
            <ul class="pagination justify-content-end">
              <li
                :class="[index === offset / limit ? 'disabled' : '']"
                class="page-item"
                v-for="(data, index) in Math.ceil(dataLength / limit)"
                :key="index"
                @click.prevent="
                  index !== offset / limit ? nextData(index * limit) : ''
                "
              >
                <a class="page-link" href="#">{{ index + 1 }}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <button
        class="btn btn-primary btn-sm text-h3"
        v-if="approve"
        @click="submitPelayanan"
      >
        Submit Pelayanan
      </button>
    </div>
  </div>
</template>

<script>
import { getLayananById } from "@/services/apis/layanan";
import {
  getAllJadwal,
  getAllPsikologAssociate,
  getLengthJadwalPraktek,
} from "@/services/apis/klien";
import { addNewPelayanan } from "@/services/apis/pelayanan";
import { getJadwalById } from "@/services/apis/psikolog";

import Swal from "sweetalert2";

import Loading from "@/components/Loading";
import JadwalCard from "@/components/JadwalCard";

export default {
  name: "DaftarLayananKlien",
  components: {
    Loading,
    JadwalCard,
  },
  data() {
    return {
      layanan: null,
      jadwal_praktek: null,
      loading: false,
      psikologAssociate: null,
      pelayanan: null,
      approve: false,
      offset: 0,
      limit: 6,
      dataLength: null,
    };
  },
  computed: {
    onlyPsikolog() {
      return this.psikologAssociate.filter(
        (psikolog) => psikolog.role === "psikolog"
      );
    },
    onlyAssociate() {
      return this.psikologAssociate.filter(
        (associate) => associate.role === "associate"
      );
    },
  },
  methods: {
    async onPilihJadwal(id) {
      this.loading = true;
      this.pelayanan = await getJadwalById(id);
      this.loading = false;
    },
    async nextData(number) {
      this.loading = true;
      this.offset = number;
      this.jadwal_praktek = await getAllJadwal({
        limit: this.limit,
        offset: this.offset,
      });
      this.loading = false;
    },
    async submitPelayanan() {
      this.loading = true;
      const result = await addNewPelayanan({
        id_jadwal_praktek: this.pelayanan.id,
        id_klien: this.$store.state.session.id,
        id_psikolog: this.pelayanan.id_psikolog,
        id_layanan: this.layanan.id,
      });
      console.log(result);
      if (result > 0) {
        Swal.fire({
          icon: "success",
          title: "Yeay...",
          html: `Request <span class="text-primary">Pelayanan</span> berhasil dikirim. <hr> <small>Silahkan menunggu balasan dari <span class="text-primary">Kami</span> untuk Info lebih lanjut</small>`,
        });
        this.loading = false;
        this.$router.push({ name: "HomeKlien" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: `Request <span class="text-primary">Pelayanan</span> gagal dikirim. <hr> <small>Silahkan coba beberapa saat lagi!</small>`,
        });
        this.loading = false;
        this.$router.push({ name: "LayananKlien" });
      }
    },
  },
  async created() {
    this.loading = true;
    this.layanan = await getLayananById(this.$route.params.id);
    this.dataLength = await getLengthJadwalPraktek();

    this.jadwal_praktek = await getAllJadwal({
      limit: this.limit,
      offset: this.offset,
    });
    this.psikologAssociate = await getAllPsikologAssociate();
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.daftar-layanan-pasien-wrapper {
  min-height: 669.6px;
  width: 100%;
  background: url("https://pptuii.id/wp-content/uploads/2020/10/psychiatrist_13.png")
    no-repeat center center/cover;
  padding: 16px;

  h1 {
    font-size: 20px;
  }
  p {
    text-align: justify;
  }

  .profile {
    display: inline-flex;
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    background-color: #8e64f3;
    color: #fff;
    border-radius: 50%;
  }

  .form-check-input:checked {
    background-color: #8e64f3;
    border-color: #bdaaeb;
  }

  .disabled .page-link {
    background: #8e64f3;
    color: #fff;
    border-color: #8e64f3;
  }

  .page-link {
    color: #8e64f3;
  }
}
</style>
