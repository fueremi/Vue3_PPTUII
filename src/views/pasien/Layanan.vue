<template>
  <Loading v-if="loading" />

  <div class="pasien-wrapper text-white">
    <div class="container">
      <div
        class="layanan-pasien d-flex flex-column align-items-center justify-content-center"
      >
        <div class="layanan-organisasi mb-4">
          <h1 class="mb-3">Layanan Organisasi</h1>
          <div class="row">
            <div
              class="col-md-6 mb-4"
              v-for="layanan in getOnlyLayananOrganisasi"
              :key="layanan.id"
            >
              <LayananComponent :layanan="layanan" />
            </div>
          </div>
        </div>
        <div class="layanan-individu-keluarga mb-4">
          <h1 class="mb-3">Layanan Individu & Keluarga</h1>
          <div class="row">
            <div
              class="col-md-6 mb-4"
              v-for="layanan in getOnlyLayananIndividuKeluarga"
              :key="layanan.id"
            >
              <LayananComponent :layanan="layanan" />
            </div>
          </div>
        </div>
        <div class="online-assessment">
          <h1 class="mb-3">Online Assessment</h1>
          <div class="row">
            <div
              class="col-md-6 mb-4"
              v-for="layanan in getOnlyOnlineAssessment"
              :key="layanan.id"
            >
              <LayananComponent :layanan="layanan" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAllLayanan } from "@/services/apis/layanan";
import LayananComponent from "@/components/Layanan";
import Loading from "@/components/Loading";

export default {
  name: "LayananPasien",
  components: {
    LayananComponent,
    Loading,
  },
  data() {
    return {
      layanan: [],
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    this.layanan = await fetchAllLayanan();
    this.loading = false;
  },
  computed: {
    getOnlyLayananOrganisasi() {
      return this.layanan.filter(
        (layanan) => layanan.kategori === "Layanan Organisasi"
      );
    },
    getOnlyLayananIndividuKeluarga() {
      return this.layanan.filter(
        (layanan) => layanan.kategori === "Layanan Individu & Keluarga "
      );
    },
    getOnlyOnlineAssessment() {
      return this.layanan.filter(
        (layanan) => layanan.kategori === "Online Assessment"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.pasien-wrapper {
  min-height: 669.6px;
  width: 100%;
  background: url("https://pptuii.id/wp-content/uploads/2020/11/abstract.png")
    no-repeat center center/cover;
  padding: 20px;

  .layanan-organisasi,
  .layanan-individu-keluarga,
  .online-assessment {
    max-width: 791px;
    padding: 32px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    min-width: 360px;

    h1 {
      font-size: 20px;
      text-decoration: underline;
    }
  }
}
</style>
