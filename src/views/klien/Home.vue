<template>
  <Loading v-if="loading" />
  <div class="home-klien">
    <div class="container mt-3">
      <h1 class="text-h1">
        Selamat datang, Klien
        <span class="text-primary text-capitalize text-decoration-underline">{{
          this.$store.state.session.nama
        }}</span>
      </h1>
      <router-link class="btn btn-primary" :to="{ name: 'LayananKlien' }"
        >Tambah Pemeriksaan</router-link
      >
      <div class="mt-4">
        <h2 class="text-primary text-h2">Jadwal Pelayanan Anda</h2>
        <table
          class="table table-sm table-responsive table-hover table-bordered text-h3"
        >
          <thead class="text-center fw-bold">
            <tr class="table-primary">
              <th scope="col" rowspan="2">No</th>
              <th scope="col" rowspan="2">Status</th>
              <th
                scope="col"
                colspan="2"
                v-if="this.$store.state.session.role !== 'klien'"
              >
                Klien
              </th>
              <th scope="col" rowspan="2">Layanan</th>
              <th scope="col" rowspan="2">Jadwal Praktek</th>
              <th scope="col" colspan="2">Psikolog/Associate</th>
              <th scope="col" rowspan="2">Aksi</th>
            </tr>
            <tr class="table-primary">
              <td v-if="this.$store.state.session.role !== 'klien'" scope="col">
                Nama
              </td>
              <td v-if="this.$store.state.session.role !== 'klien'" scope="col">
                Kontak
              </td>
              <td scope="col">Nama</td>
              <td scope="col">Kontak</td>
            </tr>
          </thead>
          <tbody v-if="pelayananKlien.length > 0">
            <tr v-for="(data, index) in pelayananKlien" :key="data.id">
              <th scope="row" class="text-center">{{ index + 1 }}</th>
              <td class="text-center text-primary text-capitalize align-middle">
                <span
                  class="badge rounded-pill bg-primary text-wrap"
                  v-if="data.status === 'request_kta'"
                  >Menunggu
                </span>
              </td>
              <td
                class="text-capitalize"
                v-if="this.$store.state.session.role !== 'klien'"
              >
                {{ data.user.nama }}
              </td>
              <td v-if="this.$store.state.session.role !== 'klien'">
                {{ data.user.no_hp }}
              </td>
              <td class="text-capitalize">
                {{ data.layanan.kategori }} - {{ data.layanan.nama }}
              </td>
              <td class="text-capitalize">
                {{ data.jadwal_praktek.hari }},
                {{ data.jadwal_praktek.jam_mulai }} -
                {{ data.jadwal_praktek.jam_selesai }}
              </td>
              <td class="text-capitalize">
                {{ data.userByIdPsikologi.role }} -
                {{ data.userByIdPsikologi.nama }}
              </td>
              <td>{{ data.userByIdPsikologi.no_hp }}</td>
              <td class="text-center align-middle">
                <span class="badge rounded-pill bg-primary me-1"
                  ><i class="fas fa-edit"></i
                ></span>
                <span class="badge rounded-pill bg-primary"
                  ><i class="fas fa-trash"></i
                ></span>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7" class="text-center">
                Kamu belum memiliki
                <span class="text-primary">Jadwal Pelayanan</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";

import { getPelayananByIdKlien } from "@/services/apis/pelayanan";

export default {
  name: "HomeKlien",
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      pelayananKlien: null,
    };
  },
  async created() {
    this.loading = true;
    this.pelayananKlien = await getPelayananByIdKlien(
      this.$store.state.session.id
    );
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.btn {
  font-size: 13px;
}
.home-klien {
  min-height: 669.6px;
  width: 100%;
  background: url("https://pptuii.id/wp-content/uploads/2020/10/psychiatrist_13.png")
    no-repeat center center/cover;
  padding: 16px;

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

      &.fa-trash {
        right: 5px;
      }
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

  .table {
    border-color: #555;

    thead,
    tbody {
      vertical-align: middle !important;
    }

    &-primary {
      border-color: #555;
    }
  }
}
</style>
