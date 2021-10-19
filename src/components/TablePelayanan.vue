<template>
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
        <th
          scope="col"
          colspan="2"
          v-if="this.$store.state.session.role !== 'psikolog'"
        >
          Psikolog/Associate
        </th>
        <th scope="col" rowspan="2">Aksi</th>
      </tr>
      <tr class="table-primary">
        <td v-if="this.$store.state.session.role !== 'klien'" scope="col">
          Nama
        </td>
        <td v-if="this.$store.state.session.role !== 'klien'" scope="col">
          Kontak
        </td>
        <td scope="col" v-if="this.$store.state.session.role !== 'psikolog'">
          Nama
        </td>
        <td scope="col" v-if="this.$store.state.session.role !== 'psikolog'">
          Kontak
        </td>
      </tr>
    </thead>
    <tbody v-if="pelayanan.length > 0">
      <tr v-for="(data, index) in pelayanan" :key="data.id">
        <th scope="row" class="text-center">{{ index + 1 }}</th>
        <td class="text-center text-primary text-capitalize align-middle">
          <span
            class="badge rounded-pill bg-primary text-wrap"
            v-if="data.status === 'request_kta'"
            >Menunggu
          </span>
          <span
            class="badge rounded-pill bg-danger text-wrap"
            v-if="data.status === 'canceled'"
            >Batal
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
          {{ data.jadwal_praktek.hari }}, {{ data.jadwal_praktek.jam_mulai }} -
          {{ data.jadwal_praktek.jam_selesai }}
        </td>
        <td
          class="text-capitalize"
          v-if="this.$store.state.session.role !== 'psikolog'"
        >
          {{ data.userByIdPsikologi.role }} -
          {{ data.userByIdPsikologi.nama }}
        </td>
        <td v-if="this.$store.state.session.role !== 'psikolog'">
          {{ data.userByIdPsikologi.no_hp }}
        </td>
        <td
          class="text-center align-middle"
          v-if="this.$store.state.session.role === 'klien'"
        >
          <div v-if="data.status !== 'canceled'">
            <router-link
              :to="{
                name: 'TambahPemeriksaanKlien',
                params: {
                  id: data.id_layanan,
                  idpelayanan: data.id,
                },
              }"
              class="badge rounded-pill bg-primary me-1"
              ><i class="fas fa-edit"></i
            ></router-link>
            <span
              class="badge rounded-pill bg-primary"
              @click="$emit('on-click-cancel', data.id)"
              ><i class="fas fa-trash"></i
            ></span>
          </div>
          <div v-else>-</div>
        </td>
        <td
          class="text-center align-middle"
          v-else-if="this.$store.state.session.role === 'admin'"
        >
          <div v-if="data.status !== 'canceled'">
            <span class="badge rounded-pill bg-primary me-1">Atur Jadwal</span>
          </div>
          <div v-else>-</div>
        </td>
        <td
          class="text-center align-middle"
          v-else-if="this.$store.state.session.role === 'psikolog'"
        >
          <div v-if="data.status !== 'canceled'">
            <span class="badge rounded-pill bg-primary me-1">Approve</span>
          </div>
          <div v-else>-</div>
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
</template>

<script>
export default {
  name: "TablePelayanan",
  props: ["pelayanan"],
};
</script>

<style lang="scss" scoped>
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
</style>
